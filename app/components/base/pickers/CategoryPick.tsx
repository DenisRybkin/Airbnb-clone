'use client';

import { CategoriesType } from '@/app/components/layouts/navbar/categories/data';
import { CategoryDto } from '@/app/types/DTO/category';

export const CategoryPick: React.FC<
  CategoryDto & { selected: boolean; onClick: (id: string) => void }
> = props => {
  const handleClick = () => props.onClick(props.id);

  return (
    <div
      onClick={handleClick}
      className={`
        rounded-xl
        border-2
        p-4
        flex
        flex-col
        gap-3
        hover:border-black
        ${props.selected ? 'border-black' : 'border-neutral-200'}
      `}
    >
      {props.icon?.({ size: 30 })}
      <div className="font-semibold">{props.name}</div>
    </div>
  );
};
