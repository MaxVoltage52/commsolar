import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Community Solar Finder - Find Community Solar in Your Area",
  description: "Find community solar providers, compare pricing, and calculate your savings across the United States.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-slate-50">
        <header className="bg-white border-b border-slate-200">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div>
                <a href="/" className="text-2xl font-bold text-slate-900 hover:text-slate-700">
                  Community Solar Finder
                </a>
                <p className="text-sm text-slate-600 mt-1">Compare solar providers and save on your electricity bill</p>
              </div>
              <nav className="hidden md:flex gap-8">
                <a href="/" className="text-slate-700 hover:text-slate-900 font-medium transition-colors">
                  Home
                </a>
                <a href="/calculator" className="text-slate-700 hover:text-slate-900 font-medium transition-colors">
                  Calculator
                </a>
              </nav>
            </div>
          </div>
        </header>
        <main className="container mx-auto px-4 py-12">
          {children}
        </main>
        <footer className="bg-white border-t border-slate-200 mt-16">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center text-sm text-slate-600">
              <p className="font-medium">Community Solar Finder</p>
              <p className="mt-1">Helping you save money with clean, renewable energy</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
