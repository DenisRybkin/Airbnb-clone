import getCurrentUser from '@/app/actions/getCurrentUser';
import { getReservations } from '@/app/actions/getReservations';
import { ClientOnly } from '@/app/components/services/client-only/ClientOnly';
import { EmptyState } from '@/app/components/views/empty-state/EmptyState';
import { ReservationsClient } from '@/app/reservations/ReservationsClient';

const ReservationsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser)
    return (
      <ClientOnly>
        <EmptyState title="Вы неавторизованны" subtitle="Пожалуйста войдите" />
      </ClientOnly>
    );

  const reservations = await getReservations({
    authorId: currentUser.id,
  });

  if (reservations.length == 0)
    return (
      <ClientOnly>
        <EmptyState
          title="Не найдено никаких бронирований"
          subtitle="Похоже, у вас нет бронирований на вашу недвижимость"
        />
      </ClientOnly>
    );

  return (
    <ClientOnly>
      <ReservationsClient
        reservations={reservations}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
};

export default ReservationsPage;
