import getCurrentUser from '@/app/actions/getCurrentUser';
import { getReservations } from '@/app/actions/getReservations';
import { ClientOnly } from '@/app/components/services/client-only/ClientOnly';
import { EmptyState } from '@/app/components/views/empty-state/EmptyState';
import { TripsClient } from '@/app/trips/TripsClient';

const TripsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser)
    return (
      <ClientOnly>
        <EmptyState title="Вы неавторизованны" subtitle="Пожалуйста войдите" />
      </ClientOnly>
    );

  const reservations = await getReservations({
    userId: currentUser.id,
  });

  if (!reservations.length)
    return (
      <ClientOnly>
        <EmptyState
          title="Не найдено ни одной поездки"
          subtitle="Похоже, вы не забронировали ни одной поездки"
        />
      </ClientOnly>
    );

  return (
    <ClientOnly>
      <TripsClient currentUser={currentUser} reservations={reservations} />
    </ClientOnly>
  );
};

export default TripsPage;
