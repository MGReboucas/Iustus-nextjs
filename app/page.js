'use client';

import { useState } from 'react';

function Mark({ small = false }) {
  return (
    <div className={`mark ${small ? 'mark-small' : ''}`} aria-hidden="true">
      <svg viewBox="0 0 100 100" fill="none">
        <rect x="25" y="82" width="50" height="7" rx="2" fill="#2c477d" />
        <rect x="29" y="75" width="42" height="7" rx="1.5" fill="#1f345e" />
        <rect x="35" y="28" width="8" height="47" rx="1" fill="#2c477d" />
        <rect x="46" y="28" width="8" height="47" rx="1" fill="#3a5a9c" />
        <rect x="57" y="28" width="8" height="47" rx="1" fill="#2c477d" />
        <path d="M25 24L75 24L70 31L30 31Z" fill="#1f345e" />
        <path d="M50 12V32" stroke="#e5b869" strokeWidth="3" strokeLinecap="round" />
        <path d="M30 20H70" stroke="#e5b869" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M30 20L23 29M30 20L37 29M70 20L63 29M70 20L77 29" stroke="#e5b869" strokeWidth="1.5" />
        <path d="M22 29C22 35 38 35 38 29Z" fill="#e5b869" />
        <path d="M62 29C62 35 78 35 78 29Z" fill="#e5b869" />
      </svg>
    </div>
  );
}

const Arrow = () => <span className="arrow" aria-hidden="true">→</span>;

const Check = () => <span className="check" aria-hidden="true">✓</span>;

function Logo() {
  return <a className="logo" href="#inicio" aria-label="Iustus, início"><Mark small /><span><strong>IUSTUS</strong><em>DEFESA JURÍDICA</em></span></a>;
}

export default function Home() {
  const [open, setOpen] = useState(false);
  const [notice, setNotice] = useState(false);
  const closeMenu = () => setOpen(false);
  const start = () => { setNotice(true); setTimeout(() => setNotice(false), 3600); };

  return (
    <main id="inicio">
      <header className="nav-wrap">
        <nav className="nav container" aria-label="Navegação principal">
          <Logo />
          <button className="menu-button" onClick={() => setOpen(!open)} aria-label="Abrir menu" aria-expanded={open}>
            <span></span><span></span><span></span>
          </button>
          <div className={`nav-links ${open ? 'is-open' : ''}`}>
            <a href="#como-funciona" onClick={closeMenu}>Como funciona</a>
            <a href="#beneficios" onClick={closeMenu}>Benefícios</a>
            <a href="#plano" onClick={closeMenu}>Plano</a>
            <a className="login" href="#acessar" onClick={closeMenu}>Já sou cliente</a>
            <button className="nav-cta" onClick={start}>Assinar agora <Arrow /></button>
          </div>
        </nav>
      </header>

      <section className="hero container">
        <div className="hero-copy">
          <div className="eyebrow"><span className="pulse"></span> Defesa jurídica online, do seu lado</div>
          <h1>Quando a vida exige uma defesa, <span>você não precisa enfrentar sozinho.</span></h1>
          <p className="hero-text">A IUSTUS conecta você a uma jornada jurídica simples, segura e humana — da análise do seu caso até a elaboração da defesa.</p>
          <div className="hero-actions">
            <button className="button primary" onClick={start}>Proteja-se por R$ 547/ano <Arrow /></button>
            <a className="button ghost" href="#como-funciona">Entenda como funciona <span className="play">▶</span></a>
          </div>
          <div className="hero-proof">
            <div className="avatars"><i>AM</i><i>RC</i><i>LF</i><i>+</i></div>
            <p><strong>Atendimento digital e seguro</strong><br />para você resolver sem sair de casa.</p>
          </div>
        </div>
        <div className="hero-visual" aria-label="Prévia da plataforma Iustus">
          <div className="orbit orbit-one"></div><div className="orbit orbit-two"></div>
          <div className="case-window">
            <div className="window-top"><div className="window-brand"><Mark small /> <b>IUSTUS</b></div><span>•••</span></div>
            <div className="workspace">
              <aside><span className="active-icon">⌂</span><span>▤</span><span>◌</span><span>◴</span></aside>
              <div className="case-content">
                <div className="case-heading"><div><small>MEUS CASOS</small><h3>Sua defesa em um só lugar</h3></div><button>+ Nova defesa</button></div>
                <div className="case-card"><div className="case-icon">⚖</div><div><b>Defesa administrativa</b><p>Documentos recebidos e em análise</p></div><span className="status">Em andamento</span></div>
                <div className="timeline"><p><i></i><span><b>Documentos analisados</b><small>Agora mesmo</small></span></p><p><i></i><span><b>Defesa sendo preparada</b><small>Acompanhamento em tempo real</small></span></p><p><i></i><span><b>Pronta para sua revisão</b><small>Você aprova antes do envio</small></span></p></div>
              </div>
            </div>
          </div>
          <div className="floating security"><span>⌁</span><div><b>Seus dados protegidos</b><small>Ambiente criptografado</small></div></div>
          <div className="floating lawyer"><div className="lawyer-avatar">⚖</div><div><b>Especialista designado</b><small>Jornada acompanhada</small></div><Check /></div>
        </div>
      </section>

      <section className="trust-bar"><div className="container trust-inner"><span>CONFIANÇA PARA QUEM PRECISA AGIR</span><div><b>100%</b><small>digital</small></div><i></i><div><b>1 só plano</b><small>sem surpresa</small></div><i></i><div><b>24h</b><small>para enviar seu caso</small></div></div></section>

      <section id="como-funciona" className="section container how">
        <div className="section-intro"><div className="eyebrow">SIMPLICIDADE EM CADA ETAPA</div><h2>Da preocupação à defesa,<br /><span>em três passos.</span></h2></div>
        <div className="steps">
          <article><span className="step-number">01</span><div className="step-icon">↥</div><h3>Envie seu caso</h3><p>Conte o que aconteceu e anexe os documentos que tiver. A plataforma orienta cada detalhe.</p></article>
          <article><span className="step-number">02</span><div className="step-icon">⌘</div><h3>Acompanhe a análise</h3><p>Seu caso segue para triagem e você acompanha cada atualização em um painel claro e seguro.</p></article>
          <article><span className="step-number">03</span><div className="step-icon">✓</div><h3>Receba sua defesa</h3><p>Tenha sua defesa elaborada com clareza e acompanhe os próximos passos da sua jornada.</p></article>
        </div>
      </section>

      <section id="beneficios" className="benefits"><div className="container benefits-grid"><div className="benefit-copy"><div className="eyebrow">NÃO É APENAS UMA PLATAFORMA</div><h2>É a tranquilidade de saber <span>por onde começar.</span></h2><p>Questões jurídicas não precisam ser sinônimo de medo ou burocracia. A IUSTUS organiza sua defesa com tecnologia, linguagem acessível e atenção ao que importa.</p><a href="#plano" className="text-link">Conheça a proteção IUSTUS <Arrow /></a></div><div className="benefit-list"><article><span>01</span><div><h3>Tudo organizado em um lugar</h3><p>Documentos, atualizações e sua defesa sempre acessíveis.</p></div></article><article><span>02</span><div><h3>Acompanhamento sem juridiquês</h3><p>Você entende o andamento do caso e o que acontece a seguir.</p></div></article><article><span>03</span><div><h3>Segurança do primeiro ao último clique</h3><p>Suas informações recebem a proteção que merecem.</p></div></article></div></div></section>

      <section id="plano" className="section pricing container">
        <div className="pricing-intro"><div className="eyebrow">ASSINATURA ANUAL</div><h2>Proteção jurídica que<br />cabe no seu plano.</h2><p>Um único plano, transparente e pensado para você ter apoio quando precisar.</p></div>
        <article className="price-card"><div className="price-top"><div><span className="plan-label">PLANO IUSTUS ANUAL</span><h3>Defesa jurídica, sem complicação.</h3></div><span className="best">MELHOR ESCOLHA</span></div><div className="price"><sup>R$</sup><strong>547</strong><span>/ano</span></div><p className="price-equivalent">Equivale a menos de R$ 1,50 por dia.</p><ul><li><Check /> Envio de casos e documentos pela plataforma</li><li><Check /> Acompanhamento da sua jornada em tempo real</li><li><Check /> Organização de informações e prazos</li><li><Check /> Ambiente digital seguro para seus dados</li></ul><button className="button primary price-button" onClick={start}>Quero minha proteção <Arrow /></button><small className="secure-line">⌁ Pagamento seguro · Sem mensalidades</small></article>
      </section>

      <section className="faq container"><div><div className="eyebrow">DÚVIDAS FREQUENTES</div><h2>Clareza antes<br />de começar.</h2></div><div className="faq-list"><details open><summary>Para quem é a IUSTUS?<span>+</span></summary><p>Para quem busca uma forma organizada, digital e acessível de iniciar e acompanhar uma defesa jurídica.</p></details><details><summary>O valor é realmente anual?<span>+</span></summary><p>Sim. A assinatura custa R$ 547 por ano, de forma simples e transparente.</p></details><details><summary>Como envio os documentos do meu caso?<span>+</span></summary><p>Depois da assinatura, você acessa a plataforma e envia os arquivos diretamente pelo seu painel.</p></details></div></section>

      <section className="final-cta"><div className="cta-light"></div><div className="container cta-content"><Mark /><div><div className="eyebrow">SEU PRÓXIMO PASSO COMEÇA AQUI</div><h2>Tenha apoio para<br /><span>defender seus direitos.</span></h2></div><button className="button primary" onClick={start}>Assinar por R$ 547/ano <Arrow /></button></div></section>

      <footer><div className="container footer-inner"><Logo /><p>© 2026 IUSTUS. Defesa jurídica online, com clareza e segurança.</p><div><a href="#privacidade">Privacidade</a><a href="#termos">Termos de uso</a></div></div></footer>
      {notice && <div className="toast" role="status"><Check /> Perfeito! Em breve você será direcionado para iniciar sua assinatura.</div>}
    </main>
  );
}
