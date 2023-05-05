import client from '@/app/libs/prismadb';
import { ListingDto } from '@/app/types/DTO/listing';
import { mapListing, mapListings } from '@/app/utils/mappings/listing';
import { Category, Listing } from '@prisma/client';

export interface GetListingsParams {
  userId?: string;
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
  categoryId?: string;
}

export default async function getListings(
  params?: GetListingsParams
): Promise<ListingDto<false, true>[]> {
  try {
    const listings = await client.listing.findMany({
      where: {
        ...(params?.userId && { userId: params.userId }),
        ...(params?.categoryId && { categoryId: params.categoryId }),
        ...(params?.locationValue && { locationValue: params.locationValue }),
        ...(params?.roomCount && { roomCount: { gte: +params.roomCount } }),
        ...(params?.guestCount && { guestCount: { gte: +params.guestCount } }),
        ...(params?.bathroomCount && {
          bathroomCount: { gte: +params.bathroomCount },
          ...(params?.startDate &&
            params?.endDate && {
              NOT: {
                reservations: {
                  some: {
                    OR: [
                      {
                        endDate: { gte: params.startDate },
                        startDate: { lte: params.startDate },
                      },
                      {
                        startDate: { lte: params.endDate },
                        endDate: { gte: params.endDate },
                      },
                    ],
                  },
                },
              },
            }),
        }),
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        category: true,
      },
    });
    return mapListings<false, true>(
      listings as (Listing & { category: Category; user: undefined })[]
    );
  } catch (e: any) {
    throw new Error(e);
  }
}
