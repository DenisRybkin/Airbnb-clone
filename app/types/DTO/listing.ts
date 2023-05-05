import { UserDto } from '@/app/types/DTO/user';
import { Category, Listing } from '@prisma/client';

export interface ListingDto<
  UR extends boolean | undefined,
  CR extends boolean | undefined
> extends Omit<Listing, 'createdAt' | 'user'> {
  createdAt: string;
  user: UR extends true ? UserDto : UserDto | undefined;
  category: CR extends true ? Category : Category | undefined;
}
