'use client';

import {
  CategoryNames,
  getCategoryIconByName,
} from '@/app/utils/tools/getCategoryIconByName';
import { Category } from '@prisma/client';

interface ListingCategoryProps {
  category?: Category;
}

export const ListingCategory: React.FC<ListingCategoryProps> = props => {
  if (!props.category) return null;

  const CategoryIcon = getCategoryIconByName(
    props.category.name as CategoryNames
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row items-center gap-4">
        {CategoryIcon && (
          <CategoryIcon size={40} className="text-neutral-600" />
        )}
        <div className="flex flex-col">
          <div className="text-lg font-semibold">{props.category.name}</div>
          <div className="text-neutral-500 font-light">
            {props.category.description}
          </div>
        </div>
      </div>
    </div>
  );
};
