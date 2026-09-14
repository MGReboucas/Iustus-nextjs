import './globals.css';

export const metadata = {
  title: 'IUSTUS | Sua defesa jurídica, sem complicação',
  description: 'Plataforma online de defesas jurídicas por R$ 547 ao ano.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
