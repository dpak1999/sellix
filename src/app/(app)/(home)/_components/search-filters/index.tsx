import { SearchInput } from "./search-input";
import { Categories } from "./categories";
import { CustomCategory } from "../../types";

interface SearchFilterProps {
  data: CustomCategory[];
}

export const SearchFilters = ({ data }: SearchFilterProps) => {
  return (
    <div className="px-4 py-8 lg:px-12 border-b flex flex-col gap-4 w-full">
      <SearchInput />
      <Categories data={data} />
    </div>
  );
};
