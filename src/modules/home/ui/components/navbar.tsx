"use client";

import { Poppins } from "next/font/google";
import Link from "next/link";
import { useState } from "react";
import { MenuIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { trpc } from "@/trpc/client";
import { NavbarSidebar } from "./navbar-sidebar";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["700"],
});

export const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const session = trpc.auth.session.useQuery();

  return (
    <nav className="h-20 flex border-b justify-between font-medium bg-white">
      <Link href={"/"} className="pl-6 flex items-center">
        <span className={cn("text-5xl font-semibold", poppins.className)}>
          Sellix
        </span>
      </Link>

      <NavbarSidebar open={isSidebarOpen} onOpenChange={setIsSidebarOpen} />

      {session.data?.user ? (
        <div className="hidden lg:flex">
          <Button
            asChild
            variant={"secondary"}
            className="border-l border-t-0 border-b-0 border-r-0 px-12 h-full rounded-none bg-black text-white hover:text-black hover:bg-pink-400 text-lg transition-colors"
          >
            <Link href={"/admin"}>Dashboard</Link>
          </Button>
        </div>
      ) : (
        <div className="hidden lg:flex">
          <Button
            asChild
            variant={"secondary"}
            className="border-l border-t-0 border-b-0 border-r-0 px-12 h-full rounded-none bg-white hover:bg-pink-400 text-lg transition-colors"
          >
            <Link prefetch href={"/sign-in"}>
              Login
            </Link>
          </Button>
          <Button
            asChild
            variant={"secondary"}
            className="border-l border-t-0 border-b-0 border-r-0 px-12 h-full rounded-none bg-black text-white hover:text-black hover:bg-pink-400 text-lg transition-colors"
          >
            <Link prefetch href={"/sign-up"}>
              Start selling
            </Link>
          </Button>
        </div>
      )}

      <div className="flex lg:hidden items-center justify-center">
        <Button
          variant={"ghost"}
          className="size-12 border-transparent bg-white"
          onClick={() => setIsSidebarOpen(true)}
        >
          <MenuIcon />
        </Button>
      </div>
    </nav>
  );
};
