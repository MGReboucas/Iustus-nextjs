'use client';

import Link from 'next/link';
import { useState } from 'react';
import './acessar.css';

function Mark() {
  return <div className="auth-mark"><svg viewBox="0 0 100 100" fill="none"><rect x="25" y="82" width="50" height="7" rx="2" fill="#2c477d" /><rect x="29" y="75" width="42" height="7" rx="1.5" fill="#1f345e" /><rect x="35" y="28" width="8" height="47" rx="1" fill="#2c477d" /><rect x="46" y="28" width="8" height="47" rx="1" fill="#3a5a9c" /><rect x="57" y="28" width="8" height="47" rx="1" fill="#2c477d" /><path d="M25 24L75 24L70 31L30 31Z" fill="#1f345e" /><path d="M50 12V32" stroke="#e5b869" strokeWidth="3" strokeLinecap="round" /><path d="M30 20H70" stroke="#e5b869" strokeWidth="2.5" strokeLinecap="round" /><path d="M30 20L23 29M30 20L37 29M70 20L63 29M70 20L77 29" stroke="#e5b869" strokeWidth="1.5" /><path d="M22 29C22 35 38 35 38 29Z" fill="#e5b869" /><path d="M62 29C62 35 78 35 78 29Z" fill="#e5b869" /></svg></div>;
}

export default function Acessar() {
  const [register, setRegister] = useState(false);
  const [message, setMessage] = useState('');
  function submit(event) { event.preventDefault(); setMessage(register ? 'Cadastro pronto para ser conectado ao sistema da IUSTUS.' : 'Login pronto para ser conectado ao dashboard da IUSTUS.'); }
  return <main className="auth-page"><Link href="/" className="auth-back">← Voltar para o site</Link><section className="auth-card"><Mark /><h1>IUSTUS</h1><p className="auth-subtitle">DEFESA JURÍDICA</p><div className="auth-switch"><button className={!register ? 'active' : ''} onClick={() => { setRegister(false); setMessage(''); }}>Entrar</button><button className={register ? 'active' : ''} onClick={() => { setRegister(true); setMessage(''); }}>Criar conta</button></div><form onSubmit={submit}>{register && <label>Nome completo<input required autoComplete="name" placeholder="Seu nome completo" /></label>}<label>E-mail<input required type="email" autoComplete="email" placeholder="voce@exemplo.com" /></label><label>Senha<input required type="password" minLength="6" autoComplete={register ? 'new-password' : 'current-password'} placeholder="Mínimo de 6 caracteres" /></label>{register && <label className="auth-check"><input type="checkbox" required /> <span>Li e aceito os termos de uso e privacidade.</span></label>}<button className="auth-submit">{register ? 'Criar minha conta' : 'Acessar plataforma'} <span>→</span></button></form>{message && <p className="auth-message" role="status">{message}</p>}<div className="auth-divider"><span>ou</span></div><button className="google-button" type="button"><span>G</span> Continuar com Google</button><p className="auth-footer">Ao continuar, você entra em um ambiente seguro da IUSTUS.</p></section></main>;
}
