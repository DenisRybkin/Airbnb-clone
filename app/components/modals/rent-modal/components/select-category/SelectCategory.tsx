'use client';

import { Headings } from '@/app/components/base/headings/Headings';
import { CategoryPick } from '@/app/components/base/pickers/CategoryPick';
import { CategoryDto } from '@/app/types/DTO/category';
import { mapCategories } from '@/app/utils/mappings/category';

interface SelectCategoryProps {
  categories: CategoryDto[];
  selectedCategoryId?: string;
  onSelect: (id: string) => void;
}

export const SelectCategory: React.FC<SelectCategoryProps> = props => {
  return (
    <div className="flex flex-col gap-8">
      <Headings
        title="Что из этого лучше всего описывает ваше отель?"
        subtitle="Выберите категорию"
      />
      <div
        className="
        grid
        cols-1
        md:grid-cols-2
        gap-3
        max-h-[60vh]
        md:max-h-[50vh]
        overflow-y-auto
        "
      >
        {props.categories.map(item => (
          <CategoryPick
            key={item.id}
            {...item}
            onClick={props.onSelect}
            selected={item.id == props.selectedCategoryId}
          />
        ))}
      </div>
    </div>
  );
};
