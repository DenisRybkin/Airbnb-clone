import { Category } from '@prisma/client';
import { IconType } from 'react-icons';

export interface CategoryDto extends Category {
  icon?: IconType | null | undefined;
}
