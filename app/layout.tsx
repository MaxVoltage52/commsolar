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
      <body className="antialiased">
        <header className="border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div>
                <a href="/" className="text-2xl font-bold text-green-600 hover:text-green-700">
                  Community Solar Finder
                </a>
                <p className="text-sm text-gray-600">Find and compare community solar providers nationwide</p>
              </div>
              <nav className="hidden md:flex gap-6">
                <a href="/" className="text-gray-700 hover:text-green-600">
                  Home
                </a>
                <a href="/calculator" className="text-gray-700 hover:text-green-600">
                  Calculator
                </a>
              </nav>
            </div>
          </div>
        </header>
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
        <footer className="border-t mt-12">
          <div className="container mx-auto px-4 py-6 text-center text-sm text-gray-600">
            <p>Community Solar Finder - Helping you save money with clean energy</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
