import './globals.css';

export const metadata = {
  title: {
    default: 'IUSTUS | Sua defesa jurídica, sem complicação',
    template: '%s | IUSTUS',
  },
  description: 'Plataforma online de defesas jurídicas por R$ 547 ao ano.',
  keywords: ['defesa jurídica', 'assinatura jurídica', 'dashboard jurídico', 'procuração online'],
  openGraph: {
    title: 'IUSTUS | Defesa jurídica online por assinatura',
    description: 'Envie seus casos, documentos e procuração. Acompanhe tudo em um só dashboard.',
    locale: 'pt_BR',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

export const viewport = { themeColor: '#070c18' };

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
