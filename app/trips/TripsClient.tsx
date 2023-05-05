'use client';

import { Headings } from '@/app/components/base/headings/Headings';
import { ListingCard } from '@/app/components/elements/listing-card/ListingCard';
import { Container } from '@/app/components/layouts/container/Container';
import { ReservationDto } from '@/app/types/DTO/reservation';
import { UserDto } from '@/app/types/DTO/user';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { toast } from 'react-hot-toast';

interface TripsClientProps {
  currentUser: UserDto;
  reservations: ReservationDto<true>[];
}
export const TripsClient: React.FC<TripsClientProps> = props => {
  const router = useRouter();

  const [deletingId, setDeletingId] = useState<string>('');

  const handleCancelTrip = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete('/api/reservations/' + id)
        .then(() => {
          toast.success('Reservation canceled');
          router.refresh();
        })
        .catch(error => toast.error(error?.response?.data?.error))
        .finally(() => setDeletingId(''));
    },
    [router]
  );

  return (
    <Container>
      <Headings
        title="Trips"
        subtitle="Where you've been and where you're going"
      />
      <div
        className="
            mt-10 grid
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
            gap-8
        "
      >
        {props.reservations.map(reservation => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            currentUser={props.currentUser}
            reservation={reservation}
            actionId={reservation.id}
            onAction={handleCancelTrip}
            disabled={deletingId == reservation.id}
            actionLabel="Cancel reservation"
          />
        ))}
      </div>
    </Container>
  );
};
