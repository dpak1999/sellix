import { ReactNode } from "react";

import { Navbar } from "./_components/navbar";
import { Footer } from "./_components/footer";

export default function HomeLaout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 bg-[#f4f4f0]">{children}</div>
      <Footer />
    </div>
  );
}
