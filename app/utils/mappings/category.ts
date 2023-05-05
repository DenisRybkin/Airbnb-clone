import { CategoryDto } from '@/app/types/DTO/category';
import {
  CategoryNames,
  getCategoryIconByName,
} from '@/app/utils/tools/getCategoryIconByName';
import { Category } from '@prisma/client';

export const mapCategory = (category: Category): CategoryDto => ({
  ...category,
  icon: getCategoryIconByName(category.name as keyof typeof CategoryNames),
});

export const mapCategories = (categories: Category[]): CategoryDto[] =>
  categories.map(mapCategory);
