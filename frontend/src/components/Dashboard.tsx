"use client";

import { FormEvent, useEffect, useState } from "react";
import { api, ApiError, Portal, Profile } from "@/lib/api/client";
import "./dashboard.css";

export default function Dashboard({ portal }: { portal: Portal }) {
  const [user, setUser] = useState<Profile>();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    api<{ user: Profile }>(`dashboard/${portal}`).then(result => setUser(result.user)).catch(reason => {
      if (reason instanceof ApiError && reason.code === "AUTH_REQUIRED") window.location.replace("/acessar");
      else setError(reason.message);
    });
  }, [portal]);
  async function leave() {
    setBusy(true); setError("");
    try { await api("auth/logout", {}); window.location.replace("/acessar"); }
    catch (reason) { setError(reason instanceof Error ? reason.message : "Não foi possível sair."); setBusy(false); }
  }
  async function invite(event: FormEvent) {
    event.preventDefault(); setBusy(true); setError(""); setMessage("");
    try { const result = await api<{ message: string }>("admin/invitations", { email }); setMessage(result.message); setEmail(""); }
    catch (reason) { setError(reason instanceof Error ? reason.message : "Não foi possível enviar o convite."); }
    finally { setBusy(false); }
  }
  return <main className="dashboard">
    <header><div><strong>IUSTUS</strong><span>{portal === "team" ? "Portal profissional" : "Área do cliente"}</span></div>{user && <button disabled={busy} onClick={leave}>Sair da conta</button>}</header>
    {error && <p role="alert" className="dashboard-error">{error}</p>}
    {!user && !error && <p role="status">Carregando seu acesso…</p>}
    {user && <>
      <section className="dashboard-welcome"><p>ACESSO CONFIRMADO</p><h1>Olá, {user.name || "bem-vindo"}.</h1><p>{portal === "team" ? "Sua sessão profissional está protegida por segundo fator." : "Seu cadastro e e-mail estão confirmados."}</p></section>
      <div className="dashboard-grid">
        <section className="dashboard-card"><h2>Seu perfil</h2><dl><dt>Nome</dt><dd>{user.name}</dd><dt>E-mail</dt><dd>{user.email}</dd><dt>Perfil</dt><dd>{{ CLIENT: "Cliente", LAWYER: "Advogado", ADMIN: "Administrador" }[user.role]}</dd></dl></section>
        <section className="dashboard-card"><h2>Atendimentos</h2><p>A gestão de casos e documentos será disponibilizada nesta área em uma próxima etapa.</p><p className="dashboard-note">Ambiente de testes. Não envie documentos reais.</p></section>
        {portal === "team" && user.role === "ADMIN" && <section className="dashboard-card"><h2>Convidar advogado</h2><p>O profissional deverá aceitar o convite e configurar o autenticador antes de acessar o painel.</p><form onSubmit={invite}><label>E-mail do profissional<input required type="email" maxLength={254} value={email} onChange={e => setEmail(e.target.value)} /></label><button disabled={busy}>Enviar convite</button></form>{message && <p role="status">{message}</p>}</section>}
      </div>
    </>}
  </main>;
}
