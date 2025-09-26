import { ReactNode } from "react";

import { Navbar } from "./_components/navbar";

export default function HomeLaout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}
