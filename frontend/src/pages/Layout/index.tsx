// src/pages/Layout/index.tsx
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
