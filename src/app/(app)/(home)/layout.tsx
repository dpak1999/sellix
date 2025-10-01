import { ReactNode } from "react";
import { getPayload } from "payload";

import configPromise from "@payload-config";
import { Category } from "@/payload-types";
import { Navbar } from "./_components/navbar";
import { Footer } from "./_components/footer";
import { SearchFilters } from "./_components/search-filters";
import { CustomCategory } from "./types";

export default async function HomeLaout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const payload = await getPayload({
    config: configPromise,
  });

  const data = await payload.find({
    collection: "categories",
    depth: 1,
    pagination: false,
    where: {
      parent: {
        exists: false,
      },
    },
    sort: "name",
  });

  const formattedData: CustomCategory[] = data.docs.map((doc) => ({
    ...doc,
    subcategories: (doc.subcategories?.docs ?? []).map((doc) => ({
      ...(doc as Category),
      subcategories: undefined,
    })),
  }));

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <SearchFilters data={formattedData} />
      <div className="flex-1 bg-[#f4f4f0]">{children}</div>
      <Footer />
    </div>
  );
}
