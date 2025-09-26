import Link from "next/link";
import { ReactNode } from "react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";

interface NavbarItem {
  href: string;
  children: ReactNode;
}

interface NavbarSidebarProps {
  items: NavbarItem[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NavbarSidebar = ({
  items,
  onOpenChange,
  open,
}: NavbarSidebarProps) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="p-0 transition-none">
        <SheetHeader className="p-4 border-b">
          <div className="flex items-center">
            <SheetTitle>Menu</SheetTitle>
          </div>
        </SheetHeader>

        <ScrollArea className="flex flex-col overflow-y-auto h-full pb-2">
          {items.map((item) => (
            <Link
              onClick={() => onOpenChange(false)}
              key={item.href}
              href={item.href}
              className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center  text-base font-medium"
            >
              {item.children}
            </Link>
          ))}

          <div className="border-t">
            <Link
              onClick={() => onOpenChange(false)}
              href={"/sign-in"}
              className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center  text-base font-medium"
            >
              Log in
            </Link>
            <Link
              onClick={() => onOpenChange(false)}
              href={"/sign-up"}
              className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center  text-base font-medium"
            >
              Start selling
            </Link>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
