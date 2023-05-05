import getCurrentUser from '@/app/actions/getCurrentUser';
import getListings from '@/app/actions/getListings';
import { ClientOnly } from '@/app/components/services/client-only/ClientOnly';
import { EmptyState } from '@/app/components/views/empty-state/EmptyState';
import { PropertiesClient } from '@/app/properties/PropertiesClient';

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser)
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please login" />
      </ClientOnly>
    );

  const listings = await getListings({
    userId: currentUser.id,
  });

  if (!listings.length)
    return (
      <ClientOnly>
        <EmptyState
          title="No properties found"
          subtitle="Looks like you have no properties"
        />
      </ClientOnly>
    );

  return (
    <ClientOnly>
      <PropertiesClient currentUser={currentUser} listings={listings} />
    </ClientOnly>
  );
};

export default PropertiesPage;
