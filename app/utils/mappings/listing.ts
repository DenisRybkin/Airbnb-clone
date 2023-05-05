import { ListingDto } from '@/app/types/DTO/listing';
import { mapUser } from '@/app/utils/mappings/user';
import { Category, Listing, User } from '@prisma/client';

export const mapListing = <
  UR extends boolean | undefined,
  CR extends boolean | undefined
>(
  listing: Listing & {
    user: UR extends true ? User : User | undefined;
    category: Category;
  }
): ListingDto<UR, CR> => ({
  ...listing,
  ...(listing.user && { user: mapUser(listing.user) }),
  createdAt: listing.createdAt.toISOString(),
});

export const mapListings = <
  UR extends boolean | undefined,
  CR extends boolean | undefined
>(
  listings: (Listing & {
    user: UR extends true ? User : User | undefined;
    category: Category;
  })[]
): ListingDto<UR, CR>[] => listings.map(mapListing);
