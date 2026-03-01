import './globals.css';

export const metadata = {
  title: 'OMNIA | Sovereign OS',
  description: 'The Universal Engine for Sovereign Intelligence.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased bg-[#0A0A0A] text-gray-100 overflow-hidden">
        {children}
      </body>
    </html>
  )
}
