import { ReservationDto } from '@/app/types/DTO/reservation';
import { mapListing } from '@/app/utils/mappings/listing';
import { Category, Listing, Reservation } from '@prisma/client';

export const mapReservation = <LR extends boolean | undefined>(
  reservation: Reservation & {
    listing: LR extends true ? Listing : Listing | undefined;
  }
): ReservationDto<LR> => ({
  ...reservation,
  ...(reservation.listing && {
    listing: mapListing<false, true>(
      reservation.listing as Listing & { user: undefined; category: Category }
    ),
  }),
  createdAt: reservation.createdAt.toISOString(),
  startDate: reservation.startDate.toISOString(),
  endDate: reservation.endDate.toISOString(),
});

export const mapReservations = <LR extends boolean | undefined>(
  reservations: (Reservation & {
    listing: LR extends true ? Listing : Listing | undefined;
  })[]
): ReservationDto<LR>[] =>
  reservations.map(reservation => mapReservation<LR>(reservation));
