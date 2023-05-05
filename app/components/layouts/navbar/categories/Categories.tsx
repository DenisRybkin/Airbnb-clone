'use client';

import { Container } from '@/app/components/layouts/container/Container';
import { CategoryBox } from '@/app/components/layouts/navbar/categories/CategoryBox';
import { categories } from '@/app/components/layouts/navbar/categories/data';
import { Category } from '@prisma/client';
import { usePathname, useSearchParams } from 'next/navigation';

interface CategoriesProps {
  categories: Category[] | null;
}
export const Categories: React.FC<CategoriesProps> = props => {
  const params = useSearchParams();
  const pathname = usePathname();
  const selectedCategory = params?.get('categoryId');

  const isMainPage = pathname == '/';

  if (!isMainPage) return null;

  return (
    <Container>
      <div
        className="
        pt-4
        flex
        flex-row
        items-center
        justify-between
        overflow-x-auto"
      >
        {props.categories?.map(item => (
          <CategoryBox
            key={item.id}
            selected={selectedCategory == item.id}
            {...item}
          />
        ))}
      </div>
    </Container>
  );
};
