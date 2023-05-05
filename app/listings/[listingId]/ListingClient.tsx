'use client';

import { ListingHead } from '@/app/components/elements/listing-head/ListingHead';
import { ListingInfo } from '@/app/components/elements/listing-info/ListingInfo';
import { ListingReservation } from '@/app/components/elements/listing-reservation/ListingReservation';
import { Container } from '@/app/components/layouts/container/Container';
import { useLoginModal } from '@/app/store/hooks/useLoginModal';
import { ListingDto } from '@/app/types/DTO/listing';
import { ReservationDto } from '@/app/types/DTO/reservation';
import { UserDto } from '@/app/types/DTO/user';
import { Reservation } from '@prisma/client';
import axios from 'axios';
import { differenceInCalendarDays, eachDayOfInterval } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Range, RangeKeyDict } from 'react-date-range';
import { toast } from 'react-hot-toast';

export type DateRangeType = {
  startDate: Date;
  endDate: Date;
  key: RangeKeyDict;
};

const initialDateRange: Range = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection',
};

interface ListingClientProps {
  listing: ListingDto<true, true>;
  currentUser: UserDto | null;
  reservations: ReservationDto<true>[];
}

export const ListingClient: React.FC<ListingClientProps> = props => {
  const loginModal = useLoginModal();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [totalPrice, setTotalPrice] = useState<number>(props.listing.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    props.reservations.forEach(reservation => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      dates = [...dates, ...range];
    });
    return dates;
  }, [props.reservations]);

  const handleCreateReservation = useCallback(() => {
    if (!props.currentUser) return loginModal.onOpen;
    setIsLoading(true);
    axios
      .post('/api/reservations', {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: props.listing?.id,
      })
      .then(() => {
        toast.success('Listing reserved!');
        setDateRange(initialDateRange);
        router.push('/trips');
        router.refresh();
      })
      .catch(() => toast.error('Something went wrong'))
      .finally(() => setIsLoading(false));
  }, [
    totalPrice,
    dateRange,
    props.listing.id,
    router,
    props.currentUser,
    loginModal,
  ]);

  const handleCheckPrice = () => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      );
      if (dayCount && props.listing.price)
        setTotalPrice(dayCount * props.listing.price);
      else setTotalPrice(props.listing.price);
    }
  };

  useEffect(handleCheckPrice, [dateRange, props.listing.price]);

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHead
            title={props.listing.title}
            imageSrc={props.listing.imageSrc}
            locationValue={props.listing.locationValue}
            id={props.listing.id}
            currentUser={props.currentUser}
          />
          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
            <ListingInfo
              user={props.listing.user}
              category={props.listing.category}
              description={props.listing.description}
              roomCount={props.listing.roomCount}
              guestCount={props.listing.guestCount}
              bathroomCount={props.listing.bathroomCount}
              locationValue={props.listing.locationValue}
            />
            <div className="order-first mb-10 md:order-last md:col-span-3">
              <ListingReservation
                disabledDates={disabledDates}
                price={props.listing.price}
                totalPrice={totalPrice}
                disabled={isLoading}
                dateRange={dateRange}
                onChangeDate={setDateRange}
                onSubmit={handleCreateReservation}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};
