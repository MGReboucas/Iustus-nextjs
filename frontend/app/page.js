'use client';

import { useState } from 'react';
import Link from 'next/link';
import Brand from '@/components/Brand';
import './testimonials.css';
import './home-nav.css';
import './pricing.css';

function Mark({ small = false }) {
  return <Brand size={small ? 48 : 96} decorative />;
}

const Arrow = () => <span className="arrow" aria-hidden="true">→</span>;

const Check = () => <span className="check" aria-hidden="true">✓</span>;

function Logo() {
  return <a className="logo" href="#inicio" aria-label="Íustus, início"><Brand decorative /><span className="brand-descriptor">DEFESA<br />JURÍDICA</span></a>;
}

export default function Home() {
  const [open, setOpen] = useState(false);
  const closeMenu = () => setOpen(false);

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
            <Link className="account-cta" href="/acessar" onClick={closeMenu}>Entrar ou cadastrar</Link>
            <Link className="nav-cta" href="/checkout" onClick={closeMenu}>Assinar agora <Arrow /></Link>
          </div>
        </nav>
      </header>

      <section className="hero container">
        <div className="hero-copy">
          <div className="eyebrow"><span className="pulse"></span> Defesa jurídica online, do seu lado</div>
          <h1>Quando a vida exige uma defesa, <span>você não precisa enfrentar sozinho.</span></h1>
          <p className="hero-text">Com uma única assinatura anual, você envia seus casos quando precisar, anexa a procuração e acompanha tudo até receber sua defesa preparada.</p>
          <div className="hero-actions">
            <Link className="button primary" href="/checkout">Assine em 10x de R$ 54,70 <Arrow /></Link>
            <a className="button ghost" href="#como-funciona">Entenda como funciona <span className="play">▶</span></a>
          </div>
          <ul className="hero-assurances" aria-label="Destaques da assinatura"><li>Uso ilimitado</li><li>Pagamento em 10x</li><li>Dashboard seguro</li></ul>
          <div className="hero-proof">
            <div className="avatars"><i>AM</i><i>RC</i><i>LF</i><i>+</i></div>
            <p><strong>Atendimento digital e seguro</strong><br />para você resolver sem sair de casa.</p>
          </div>
        </div>
        <div className="hero-visual" aria-label="Prévia da plataforma Íustus">
          <div className="orbit orbit-one"></div><div className="orbit orbit-two"></div>
          <div className="case-window">
            <div className="window-top"><div className="window-brand"><Mark small /> <b>MEU PAINEL</b></div><span>•••</span></div>
            <div className="workspace">
              <aside><span className="active-icon">⌂</span><span>▤</span><span>◌</span><span>◴</span></aside>
              <div className="case-content">
                <div className="case-heading"><div><small>MEUS CASOS</small><h3>Sua defesa em um só lugar</h3></div><button>+ Nova defesa</button></div>
                <div className="case-card"><div className="case-icon">⚖</div><div><b>Defesa administrativa</b><p>Documentos e procuração recebidos</p></div><span className="status">Em andamento</span></div>
                <div className="timeline"><p><i></i><span><b>Procuração validada</b><small>Agora mesmo</small></span></p><p><i></i><span><b>Defesa sendo preparada</b><small>Acompanhamento em tempo real</small></span></p><p><i></i><span><b>Defesa disponível no painel</b><small>Pronta para você acessar</small></span></p></div>
              </div>
            </div>
          </div>
          <div className="floating security"><span>⌁</span><div><b>Seus dados protegidos</b><small>Ambiente criptografado</small></div></div>
          <div className="floating lawyer"><div className="lawyer-avatar">⚖</div><div><b>Especialista designado</b><small>Jornada acompanhada</small></div><Check /></div>
        </div>
      </section>

      <section className="trust-bar"><div className="container trust-inner"><span>DEFESA JURÍDICA QUANDO VOCÊ PRECISAR</span><div><b>100%</b><small>digital</small></div><i></i><div><b>1 assinatura</b><small>por ano</small></div><i></i><div><b>Uso ilimitado</b><small>durante a vigência</small></div></div></section>

      <section id="como-funciona" className="section container how">
        <div className="section-intro"><div className="eyebrow">SIMPLICIDADE EM CADA ETAPA</div><h2>Da preocupação à defesa,<br /><span>em três passos.</span></h2></div>
        <div className="steps">
          <article><span className="step-number">01</span><div className="step-icon">◈</div><h3>Assine a ÍUSTUS</h3><p>Escolha a assinatura anual em 10x de R$ 54,70 e tenha a plataforma disponível durante toda a vigência.</p></article>
          <article><span className="step-number">02</span><div className="step-icon">↥</div><h3>Envie o caso e a procuração</h3><p>Conte o que aconteceu, anexe os documentos necessários e envie sua procuração pelo painel seguro.</p></article>
          <article><span className="step-number">03</span><div className="step-icon">✓</div><h3>Receba sua defesa preparada</h3><p>Acompanhe a solicitação pela plataforma e receba a preparação da sua defesa em um só lugar.</p></article>
        </div>
      </section>

      <section id="beneficios" className="benefits"><div className="container benefits-grid"><div className="benefit-copy"><div className="eyebrow">NÃO É APENAS UMA PLATAFORMA</div><h2>É a tranquilidade de ter <span>uma defesa ao seu alcance.</span></h2><p>Você não contrata caso a caso. A assinatura anual mantém a ÍUSTUS disponível para organizar suas solicitações, documentos e defesas sempre que precisar.</p><a href="#plano" className="text-link">Conheça a assinatura ÍUSTUS <Arrow /></a></div><div className="benefit-list"><article><span>01</span><div><h3>Uso ilimitado durante o ano</h3><p>Envie quantos casos precisar enquanto sua assinatura estiver vigente.</p></div></article><article><span>02</span><div><h3>Caso, documentos e procuração no mesmo painel</h3><p>Centralize o que é necessário para iniciar sua solicitação com segurança.</p></div></article><article><span>03</span><div><h3>Sua defesa preparada e acessível</h3><p>Acompanhe o andamento e receba sua defesa pela própria plataforma.</p></div></article></div></div></section>

      <section id="plano" className="section pricing container">
        <div className="pricing-intro"><div className="eyebrow">ASSINATURA ANUAL</div><h2>Defesas quando precisar,<br />em um único plano.</h2><p>Assine uma vez ao ano e use a plataforma quantas vezes precisar durante a vigência da sua assinatura.</p></div>
        <article className="price-card"><div className="price-top"><div><span className="plan-label">PLANO ÍUSTUS ANUAL</span><h3>Defesa jurídica disponível o ano todo.</h3></div><span className="best">USO ILIMITADO</span></div><div className="price price-installments"><span className="installment-count">10x de</span><sup>R$</sup><strong>54,70</strong></div><p className="price-equivalent">Assinatura anual · Total de R$ 547,00.</p><ul><li><Check /> Uso ilimitado da plataforma durante a assinatura</li><li><Check /> Envio de casos, documentos e procuração online</li><li><Check /> Acompanhamento de cada solicitação pelo painel</li><li><Check /> Recebimento da defesa preparada na plataforma</li></ul><Link className="button primary price-button" href="/checkout">Quero assinar a ÍUSTUS <Arrow /></Link><small className="secure-line">⌁ Pagamento seguro · Em 10x de R$ 54,70</small></article>
      </section>

      <section className="testimonials container" aria-labelledby="testimonials-title">
        <div className="section-intro"><div><div className="eyebrow">PROVA SOCIAL</div><h2 id="testimonials-title">Histórias que inspiram<br /><span>mais tranquilidade.</span></h2></div><p className="testimonial-note">Modelos de depoimento para substituir por relatos reais e autorizados antes da publicação.</p></div>
        <div className="testimonial-grid">
          <article><div className="rating" aria-label="Cinco estrelas">★★★★★</div><blockquote>“Use este espaço para contar como a plataforma trouxe clareza e segurança para uma situação jurídica.”</blockquote><footer><span className="review-avatar">C</span><div><b>Cliente ÍUSTUS</b><small>Depoimento autorizado</small></div></footer></article>
          <article><div className="rating" aria-label="Cinco estrelas">★★★★★</div><blockquote>“Inclua aqui um relato real sobre a praticidade de enviar o caso e a procuração sem sair de casa.”</blockquote><footer><span className="review-avatar">M</span><div><b>Cliente ÍUSTUS</b><small>Depoimento autorizado</small></div></footer></article>
          <article><div className="rating" aria-label="Cinco estrelas">★★★★★</div><blockquote>“Este card pode destacar a experiência de acompanhar a solicitação e acessar a defesa pelo dashboard.”</blockquote><footer><span className="review-avatar">R</span><div><b>Cliente ÍUSTUS</b><small>Depoimento autorizado</small></div></footer></article>
        </div>
      </section>

      <section className="faq container"><div><div className="eyebrow">DÚVIDAS FREQUENTES</div><h2>Clareza antes<br />de começar.</h2></div><div className="faq-list"><details open><summary>Posso usar a plataforma mais de uma vez?<span>+</span></summary><p>Sim. Sua assinatura dá acesso ilimitado à plataforma durante o período anual de vigência.</p></details><details><summary>Como funciona o pagamento?<span>+</span></summary><p>A assinatura anual pode ser paga em 10x de R$ 54,70, totalizando R$ 547,00.</p></details><details><summary>O que preciso enviar para iniciar um caso?<span>+</span></summary><p>Pelo seu painel, você envia o relato do caso, os documentos disponíveis e a procuração.</p></details><details><summary>Como recebo a defesa?<span>+</span></summary><p>Você acompanha a solicitação pelo dashboard e recebe sua defesa preparada diretamente na plataforma.</p></details></div></section>

      <section className="final-cta"><div className="cta-light"></div><div className="container cta-content"><Mark /><div><div className="eyebrow">SEU PRÓXIMO PASSO COMEÇA AQUI</div><h2>Assine uma vez e use<br /><span>sempre que precisar.</span></h2></div><Link className="button primary" href="/checkout">Assinar em 10x de R$ 54,70 <Arrow /></Link></div></section>

      <footer><div className="container footer-inner"><Logo /><p>© 2026 ÍUSTUS. Defesa jurídica online, com clareza e segurança.</p><div><a href="#privacidade">Privacidade</a><a href="#termos">Termos de uso</a></div></div></footer>
      <div className="mobile-purchase"><div><small>Plano anual</small><b>10x de R$ 54,70</b></div><Link href="/checkout">Assinar agora <Arrow /></Link></div>
    </main>
  );
}
