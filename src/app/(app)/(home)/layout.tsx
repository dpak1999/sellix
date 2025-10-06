import { ReactNode, Suspense } from "react";
import { Navbar } from "../../../modules/home/ui/components/navbar";
import { Footer } from "../../../modules/home/ui/components/footer";
import {
  SearchFilterLoading,
  SearchFilters,
} from "../../../modules/home/ui/components/search-filters";
import { HydrateClient, trpc } from "@/trpc/server";

export default async function HomeLaout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  void trpc.categories.getMany.prefetch();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <HydrateClient>
        <Suspense fallback={<SearchFilterLoading />}>
          <SearchFilters />
        </Suspense>
      </HydrateClient>
      <div className="flex-1 bg-[#f4f4f0]">{children}</div>
      <Footer />
    </div>
  );
}
