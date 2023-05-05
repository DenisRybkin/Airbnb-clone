import client from '@/app/libs/prismadb';
import { ReservationDto } from '@/app/types/DTO/reservation';
import { mapReservations } from '@/app/utils/mappings/reservation';

interface IParams {
  listingId?: string;
  userId?: string;
  authorId?: string;
}

export const getReservations = async (
  params: IParams
): Promise<ReservationDto<true>[]> => {
  const query = {
    ...(params.listingId && { listingId: params.listingId }),
    ...(params.userId && { userId: params.userId }),
    ...(params.authorId && { listing: { userId: params.authorId } }),
  };

  try {
    return mapReservations<true>(
      await client.reservation.findMany({
        where: query,
        include: {
          listing: {
            include: {
              category: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      })
    );
  } catch (e: any) {
    throw new Error(e);
  }
};
