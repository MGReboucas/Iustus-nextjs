'use client';

import Link from 'next/link';
import { useState } from 'react';
import './checkout.css';
import './pagbank.css';
import PagBankTransparentForm from './PagBankTransparentForm';

function Mark() {
  return <div className="mark mark-small" aria-hidden="true"><svg viewBox="0 0 100 100" fill="none"><rect x="25" y="82" width="50" height="7" rx="2" fill="#2c477d" /><rect x="29" y="75" width="42" height="7" rx="1.5" fill="#1f345e" /><rect x="35" y="28" width="8" height="47" rx="1" fill="#2c477d" /><rect x="46" y="28" width="8" height="47" rx="1" fill="#3a5a9c" /><rect x="57" y="28" width="8" height="47" rx="1" fill="#2c477d" /><path d="M25 24L75 24L70 31L30 31Z" fill="#1f345e" /><path d="M50 12V32" stroke="#e5b869" strokeWidth="3" strokeLinecap="round" /><path d="M30 20H70" stroke="#e5b869" strokeWidth="2.5" strokeLinecap="round" /><path d="M30 20L23 29M30 20L37 29M70 20L63 29M70 20L77 29" stroke="#e5b869" strokeWidth="1.5" /><path d="M22 29C22 35 38 35 38 29Z" fill="#e5b869" /><path d="M62 29C62 35 78 35 78 29Z" fill="#e5b869" /></svg></div>;
}

const Check = () => <span className="check" aria-hidden="true">✓</span>;

export default function Checkout() {
  const [payment, setPayment] = useState(null);
  const [quote, setQuote] = useState(null);

  return (
    <main className="checkout-page">
      <header className="checkout-header"><div className="checkout-container"><Link href="/" className="checkout-logo" aria-label="Voltar para o início da IUSTUS"><Mark /><span><strong>IUSTUS</strong><em>DEFESA JURÍDICA</em></span></Link><Link href="/" className="back-link">← Voltar para o site</Link></div></header>

      <div className="checkout-container checkout-layout">
        <section className="checkout-form-wrap" aria-labelledby="checkout-title">
          <div className="checkout-progress" aria-label="Etapa 1 de 2"><span className="progress-current">1</span><i></i><span>2</span><small>Dados e pagamento</small></div>
          {!payment ? <><div className="checkout-heading"><span className="checkout-kicker">ASSINATURA ANUAL</span><h1 id="checkout-title">Comece sua proteção<br /><em>com a IUSTUS.</em></h1><p>Preencha os dados do cartão para visualizar as parcelas e juros configurados pelo PagBank.</p></div><PagBankTransparentForm onApproved={setPayment} onInstallmentChange={setQuote} /></> : <div className="checkout-success" role="status"><span><Check /></span><h1>Assinatura aprovada.</h1><p>Seu pagamento em {payment.installments}x foi aprovado. Seu acesso à IUSTUS será liberado conforme a confirmação da assinatura.</p><Link href="/" className="back-home">Voltar para a IUSTUS</Link></div>}
        </section>
        <aside className="order-summary" aria-label="Resumo do pedido"><div className="summary-top"><span>SEU PLANO</span><b>Uso ilimitado</b></div><h2>IUSTUS Anual</h2><p className="summary-description">A plataforma de defesas jurídicas disponível sempre que você precisar.</p><div className="machine-fee"><small>Juros da maquininha</small><b>{quote ? (quote.interestFree ? 'Sem juros' : `R$ ${(quote.totalAmount - 547).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`) : 'Informe o cartão'}</b></div><div className="summary-price"><small>{quote ? `Total em ${quote.installments}x` : 'Valor base anual'}</small><strong>R$ {(quote ? quote.totalAmount : 547).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong><p>{quote ? `${quote.installments}x de R$ ${quote.installmentAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : 'Parcelas e juros serão exibidos após informar o cartão.'}</p></div><ul><li><Check /> Envie quantos casos precisar</li><li><Check /> Anexe documentos e procuração</li><li><Check /> Acompanhe tudo pelo dashboard</li><li><Check /> Receba sua defesa na plataforma</li></ul><div className="summary-security"><span>⌁</span><p><b>Dados do cartão protegidos</b>Cartão tokenizado pelo PagBank.</p></div></aside>
      </div>
      <section className="checkout-assurance"><div className="checkout-container"><div><Check /><span><b>Assinatura anual</b>Um plano claro, sem contratação por caso.</span></div><div><Check /><span><b>Uso ilimitado</b>Envie casos durante toda a vigência.</span></div><div><Check /><span><b>Jornada digital</b>Do envio à defesa, no mesmo painel.</span></div></div></section>
    </main>
  );
}
