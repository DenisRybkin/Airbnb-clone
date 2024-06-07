'use client';

import { Headings } from '@/app/components/base/headings/Headings';
import { ListingCard } from '@/app/components/elements/listing-card/ListingCard';
import { Container } from '@/app/components/layouts/container/Container';
import { ReservationDto } from '@/app/types/DTO/reservation';
import { UserDto } from '@/app/types/DTO/user';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { Simulate } from 'react-dom/test-utils';
import { toast } from 'react-hot-toast';
import error = Simulate.error;

interface ReservationsClientProps {
  reservations: ReservationDto<true>[];
  currentUser: UserDto;
}
export const ReservationsClient: React.FC<ReservationsClientProps> = props => {
  const router = useRouter();

  const [deletingId, setDeletingId] = useState<string>('');

  const handleCancelReservation = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete('/api/reservations/' + id)
        .then(res => {
          router.refresh();
          if (res.data.count == 0) throw new Error();
          toast.success('Бронирование отменено');
        })
        .catch(() => toast.error('Что-то пошло не так...'))
        .finally(() => setDeletingId(''));
    },
    [router]
  );

  return (
    <Container>
      <Headings title="Бронирование" subtitle="Бронирование вашей недвижимости" />
      <div
        className="
          mt-10
          grid
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
            actionId={reservation.id}
            onAction={handleCancelReservation}
            disabled={deletingId == reservation.id}
            actionLabel="Отменить бронирование для гостей"
          />
        ))}
      </div>
    </Container>
  );
};
