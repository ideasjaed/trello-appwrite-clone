import './globals.css'

export const metadata = {
  title: 'Trello App Clone',
  description: 'Generated by Jazmin Lino',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-[#F5F6F8]">{children}</body>
    </html>
  )
}
