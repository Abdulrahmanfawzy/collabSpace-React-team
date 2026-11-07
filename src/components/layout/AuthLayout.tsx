import type { ReactNode } from "react";
import { Logo } from "../common/Logo";



type AuthLayoutProps = {
  children: ReactNode;
};

function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="min-h-screen bg-background">
      <header className="flex items-center justify-between p-6">
        <Logo />
      </header>

      <section className="flex justify-center px-4 py-12">
        {children}
      </section>
    </main>
  );
}

export { AuthLayout };
