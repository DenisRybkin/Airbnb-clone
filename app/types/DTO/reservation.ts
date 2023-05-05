import { ListingDto } from '@/app/types/DTO/listing';
import { Reservation } from '@prisma/client';

export interface ReservationDto<LR>
  extends Omit<Reservation, 'createdAt' | 'startDate' | 'endDate'> {
  listing: LR extends true
    ? ListingDto<false, true>
    : ListingDto<false, true> | undefined;
  createdAt: string;
  startDate: string;
  endDate: string;
}
