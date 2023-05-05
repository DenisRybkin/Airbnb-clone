import client from '@/app/libs/prismadb';
import { ListingDto } from '@/app/types/DTO/listing';
import { mapListing } from '@/app/utils/mappings/listing';

interface IParams {
  listingId: string;
}

export default async function getListingById(
  params: IParams
): Promise<ListingDto<true, true> | null> {
  try {
    const { listingId } = params;

    const listing = await client.listing.findUnique({
      where: {
        id: listingId,
      },
      include: {
        category: true,
        user: true,
      },
    });

    if (listing) return mapListing<true, true>(listing);
    return null;
  } catch (e: any) {
    throw new Error(e);
  }
}
