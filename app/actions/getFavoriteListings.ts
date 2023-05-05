import getCurrentUser from '@/app/actions/getCurrentUser';
import client from '@/app/libs/prismadb';
import { mapListings } from '@/app/utils/mappings/listing';
import { Category, Listing } from '@prisma/client';

export const getFavoriteListings = async () => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) throw new Error('Unauthorized');

    return mapListings<false, true>(
      (await client.listing.findMany({
        where: {
          id: {
            in: [...(currentUser.favoriteIds || [])],
          },
        },
        include: {
          category: true,
        },
      })) as (Listing & { category: Category; user: undefined })[]
    );
  } catch (error: any) {
    throw new Error(error);
  }
};
