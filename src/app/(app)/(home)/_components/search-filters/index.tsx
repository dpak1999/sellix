"use client";

import { SearchInput } from "./search-input";
import { Categories } from "./categories";
import { trpc } from "@/trpc/client";

export const SearchFilters = () => {
  const [data] = trpc.categories.getMany.useSuspenseQuery();

  return (
    <div className="px-4 py-8 lg:px-12 border-b flex flex-col gap-4 w-full">
      <SearchInput />

      <div className="hidden lg:block">
        <Categories data={data} />
      </div>
    </div>
  );
};
