import getCategories from '@/app/actions/getCategories';

import { IBaseServerProvider } from '@/app/providers/server/types/baseServerProvider';

import { CategoryDto } from '@/app/types/DTO/category';

import { mapCategory } from '@/app/utils/mappings/category';

import React from 'react';

interface ICategoryContext extends IBaseServerProvider {
  categories?: CategoryDto[];
}

const CategoryContext = React.createContext<ICategoryContext>({
  isError: false,
  isLoading: true,
});

interface CategoryProviderProps {
  children: React.ReactNode;
}

export const CategoryProvider: React.FC<CategoryProviderProps> = props => {
  const [categories, setCategories] = React.useState<CategoryDto[] | null>(
    null
  );
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const loadCategories = async () => {
    setIsLoading(true);
    const res = await getCategories();
    setIsLoading(false);
    res && setCategories(res);
  };

  React.useEffect(() => {
    loadCategories();
  }, []);

  return (
    <CategoryContext.Provider
      value={{
        categories: categories?.map(mapCategory),
        isError: categories == null && !isLoading,
        isLoading,
      }}
    >
      {props.children}
    </CategoryContext.Provider>
  );
};
