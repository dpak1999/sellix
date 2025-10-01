import { ReactNode, Suspense } from "react";
import { Navbar } from "./_components/navbar";
import { Footer } from "./_components/footer";
import { SearchFilters } from "./_components/search-filters";
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
        <Suspense fallback={<p>Loading...</p>}>
          <SearchFilters />
        </Suspense>
      </HydrateClient>
      <div className="flex-1 bg-[#f4f4f0]">{children}</div>
      <Footer />
    </div>
  );
}
