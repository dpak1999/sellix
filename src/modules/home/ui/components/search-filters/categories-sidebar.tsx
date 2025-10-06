"use client";

import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { trpc } from "@/trpc/client";
import {
  CategoriesGetManyOutput,
  CategoriesGetManyOutputSingle,
} from "@/modules/categories/types";

export const CategoriesSidebar = ({
  onOpenChangeAction,
  open,
}: {
  open: boolean;
  onOpenChangeAction: (open: boolean) => void;
}) => {
  const [data] = trpc.categories.getMany.useSuspenseQuery();

  const [parentCategories, setParentCategories] =
    useState<CategoriesGetManyOutput | null>(null);
  const [selectedCategory, setselectedCategory] =
    useState<CategoriesGetManyOutputSingle | null>(null);

  const router = useRouter();

  const currentCategories = parentCategories ?? data ?? [];

  const handOpenChange = (open: boolean) => {
    setselectedCategory(null);
    setParentCategories(null);
    onOpenChangeAction(open);
  };

  const handleCategoryClick = (category: CategoriesGetManyOutputSingle) => {
    if (category.subcategories && category.subcategories.length > 0) {
      setParentCategories(category.subcategories as CategoriesGetManyOutput);
      setselectedCategory(category);
    } else {
      if (parentCategories && selectedCategory) {
        router.push(`${selectedCategory.slug}/${category.slug}`);
      } else {
        if (category.slug === "all") {
          router.push(`/`);
        } else {
          router.push(`/${category.slug}`);
        }
      }

      handOpenChange(false);
    }
  };

  const handleBackClick = () => {
    if (parentCategories) {
      setParentCategories(null);
      setselectedCategory(null);
    }
  };

  const backgroundColor = selectedCategory?.color || "white";

  return (
    <Sheet open={open} onOpenChange={handOpenChange}>
      <SheetContent
        side="left"
        className="p-0 transition-none"
        style={{ backgroundColor }}
      >
        <SheetHeader className="p-4 border-b">
          <SheetTitle>Categories</SheetTitle>
        </SheetHeader>

        <ScrollArea className="flex flex-col overflow-y-auto h-full pb-2">
          {parentCategories && (
            <button
              onClick={handleBackClick}
              className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium"
            >
              <ChevronLeftIcon className="size-4 mr-2" />
              Back
            </button>
          )}

          {currentCategories.map((category) => (
            <button
              onClick={() => handleCategoryClick(category)}
              key={category.slug}
              className="w-full text-left p-4 hover:bg-black hover:text-white flex justify-between items-center text-base font-medium"
            >
              {category.name}
              {category.subcategories && category.subcategories.length > 0 && (
                <ChevronRightIcon className="size-4" />
              )}
            </button>
          ))}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
