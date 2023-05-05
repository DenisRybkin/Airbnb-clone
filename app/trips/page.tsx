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
        <EmptyState title="Unauthorized" subtitle="Please login" />
      </ClientOnly>
    );

  const reservations = await getReservations({
    userId: currentUser.id,
  });

  if (!reservations.length)
    return (
      <ClientOnly>
        <EmptyState
          title="No trips found"
          subtitle="Looks like you have not reserved any trips"
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
