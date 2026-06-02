import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Oryx Properties Digital Platform",
  description: "Building Namibia's Future Through Strategic Property Investment.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-light)' }}>
        {/* Global Blurred Background */}
        <div style={{ position: 'fixed', inset: 0, backgroundImage: 'url(/images/portfolio/Brand-X-Dunes-Mall_0145-min-700x840.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', filter: 'blur(24px) brightness(0.3)', zIndex: -10, transform: 'scale(1.1)' }} />
        <div style={{ position: 'fixed', inset: 0, background: 'linear-gradient(to bottom, rgba(15, 23, 42, 0.7), rgba(15, 23, 42, 0.95))', zIndex: -9 }} />
        
        <div style={{ position: 'relative', zIndex: 1 }}>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
