import getCurrentUser from '@/app/actions/getCurrentUser';
import getListingById from '@/app/actions/getListingById';
import { getReservations } from '@/app/actions/getReservations';
import { ClientOnly } from '@/app/components/services/client-only/ClientOnly';
import { EmptyState } from '@/app/components/views/empty-state/EmptyState';
import { ListingClient } from '@/app/listings/[listingId]/ListingClient';

interface IParams {
  listingId: string;
}
const ListingPage = async ({ params }: { params: IParams }) => {
  const [currentUser, listing, reservations] = await Promise.all([
    getCurrentUser(),
    getListingById(params),
    getReservations(params),
  ]);

  if (!listing)
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );

  return (
    <ClientOnly>
      <ListingClient
        reservations={reservations}
        listing={listing}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
};

export default ListingPage;
