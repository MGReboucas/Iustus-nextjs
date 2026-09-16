"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { api, Context, Profile } from "@/lib/api/client";
import "./acessar.css";

type Mode = "login" | "register" | "recovery" | "resend" | "verify" | "reset" | "invite" | "mfa";
type LoginResult = { user?: Profile; mfaRequired?: boolean; enrollmentRequired?: boolean; recoveryCodes?: string[] };

export default function Access() {
  const [context, setContext] = useState<Context>();
  const [mode, setMode] = useState<Mode>("login");
  const [token, setToken] = useState("");
  const [secret, setSecret] = useState("");
  const [codes, setCodes] = useState<string[]>([]);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    function readAction() {
      const fragment = new URLSearchParams(window.location.hash.slice(1));
      for (const action of ["verify", "reset", "invite"] as const) {
        const value = fragment.get(action);
        if (value) { setToken(value); setMode(action); setError(""); setMessage(""); setPassword(""); break; }
      }
      // Token só em memória. Também tratar links abertos na mesma aba já carregada.
      if (window.location.hash) window.history.replaceState(null, "", window.location.pathname);
    }
    readAction();
    window.addEventListener("hashchange", readAction);
    api<Context>("auth/csrf").then(setContext).catch(reason => setError(reason.message));
    return () => window.removeEventListener("hashchange", readAction);
  }, []);

  const team = context?.portal === "team";
  function change(next: Mode) { setMode(next); setError(""); setMessage(""); setPassword(""); setCode(""); }
  function dashboard() { window.location.assign(team ? "/advogado" : "/cliente"); }

  async function submit(event: FormEvent) {
    event.preventDefault();
    setBusy(true); setError(""); setMessage("");
    try {
      if (mode === "register") {
        await api("auth/register", { email, name, password, policyVersion: accepted ? context?.policyVersion : "" });
        setPassword(""); setMessage("Confira seu e-mail para concluir o cadastro. Se já possui conta, utilize a recuperação de senha.");
      } else if (mode === "login") {
        const result = await api<LoginResult>("auth/login", { email, password });
        setPassword("");
        if (result.mfaRequired) {
          setMode("mfa");
          if (result.enrollmentRequired) {
            const enrollment = await api<{ secret: string }>("auth/mfa/enroll", {});
            setSecret(enrollment.secret);
          }
        } else dashboard();
      } else if (mode === "mfa") {
        const result = await api<LoginResult>("auth/mfa/verify", { code });
        setCode(""); setSecret("");
        if (result.recoveryCodes) setCodes(result.recoveryCodes); else dashboard();
      } else if (mode === "verify") {
        await api("auth/verify", { token }); setToken(""); change("login"); setMessage("E-mail confirmado. Você já pode entrar.");
      } else if (mode === "reset") {
        await api("auth/reset", { token, password }); setToken(""); change("login"); setMessage("Senha atualizada. Entre novamente. O segundo fator da equipe continua obrigatório.");
      } else if (mode === "invite") {
        await api("auth/invitations/accept", { token, name, password }); setToken(""); change("login"); setMessage("Convite aceito. Entre com seu e-mail e senha para configurar o segundo fator.");
      } else {
        const result = await api<{ message: string }>(`auth/${mode}`, { email }); setMessage(result.message);
      }
    } catch (reason) { setError(reason instanceof Error ? reason.message : "Não foi possível concluir."); }
    finally { setBusy(false); }
  }

  const labels: Record<Mode, string> = { login: "Acessar plataforma", register: "Criar minha conta", recovery: "Enviar recuperação", resend: "Reenviar confirmação", verify: "Confirmar meu e-mail", reset: "Salvar nova senha", invite: "Aceitar convite", mfa: "Confirmar segundo fator" };
  return <main className="auth-page">
    <Link href="/" className="auth-back">← Voltar para o site</Link>
    <section className="auth-card" aria-labelledby="access-title">
      <h1 id="access-title">IUSTUS</h1>
      <p className="auth-subtitle">{!context ? "ACESSO" : team ? "PORTAL PROFISSIONAL" : "ÁREA DO CLIENTE"}</p>
      <p className="auth-notice">Ambiente de testes. Use apenas dados fictícios.</p>
      {codes.length > 0 ? <div className="recovery-codes">
        <h2>Guarde seus códigos de recuperação</h2>
        <p>Cada código funciona uma única vez se você perder o acesso ao autenticador. Eles não serão exibidos novamente.</p>
        <ul>{codes.map(value => <li key={value}><code>{value}</code></li>)}</ul>
        <button className="auth-submit" onClick={dashboard}>Guardei os códigos. Continuar</button>
      </div> : <>
        {context?.portal === "client" && ["login", "register"].includes(mode) && <div className="auth-switch">
          <button type="button" disabled={busy} className={mode === "login" ? "active" : ""} onClick={() => change("login")}>Entrar</button>
          <button type="button" disabled={busy} className={mode === "register" ? "active" : ""} onClick={() => change("register")}>Criar conta</button>
        </div>}
        <form onSubmit={submit}>
          <fieldset disabled={!context || busy} style={{ border: 0, padding: 0, margin: 0 }}>
          {["register", "invite"].includes(mode) && <label>Nome completo<input required minLength={2} maxLength={150} autoComplete="name" value={name} onChange={e => setName(e.target.value)} /></label>}
          {["login", "register", "recovery", "resend"].includes(mode) && <label>E-mail<input required type="email" autoComplete="email" maxLength={254} value={email} onChange={e => setEmail(e.target.value)} /></label>}
          {["login", "register", "reset", "invite"].includes(mode) && <label>{mode === "reset" ? "Nova senha" : "Senha"}<input required type="password" minLength={mode === "login" ? 1 : 8} maxLength={128} autoComplete={mode === "login" ? "current-password" : "new-password"} value={password} onChange={e => setPassword(e.target.value)} /></label>}
          {mode === "register" && <label className="auth-check"><input required type="checkbox" checked={accepted} onChange={e => setAccepted(e.target.checked)} /><span>Entendo que este ambiente é destinado exclusivamente a testes e não constitui contratação de serviços jurídicos.</span></label>}
          {mode === "verify" && <p>Confirme o e-mail para ativar seu acesso.</p>}
          {mode === "mfa" && <>
            {secret && <div className="mfa-setup"><p>No seu aplicativo autenticador, adicione uma chave de configuração por tempo (TOTP):</p><code data-testid="mfa-secret">{secret}</code><p>Depois, digite o código de seis dígitos gerado pelo aplicativo.</p></div>}
            <label>{secret ? "Código do autenticador" : "Código do autenticador ou de recuperação"}<input required autoComplete="one-time-code" value={code} maxLength={64} onChange={e => setCode(e.target.value)} /></label>
          </>}
          <button className="auth-submit" disabled={busy || !context}>{busy ? "Aguarde…" : labels[mode]}</button>
          </fieldset>
        </form>
        <div className="auth-links">
          {mode === "login" && <button disabled={!context || busy} onClick={() => change("recovery")}>Esqueci minha senha</button>}
          {mode === "login" && context?.portal === "client" && <button disabled={busy} onClick={() => change("resend")}>Reenviar confirmação de e-mail</button>}
          {mode !== "login" && <button disabled={!context || busy} onClick={() => change("login")}>Voltar para entrar</button>}
        </div>
      </>}
      {error && <p className="auth-error" role="alert">{error}</p>}
      {message && <p className="auth-message" role="status">{message}</p>}
      <p className="auth-footer">{team ? "Acesso à equipe por convite e segundo fator." : "Seu acesso aos atendimentos começa pela confirmação do e-mail."}</p>
    </section>
  </main>;
}
