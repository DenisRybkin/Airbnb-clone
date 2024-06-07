import getCurrentUser from '@/app/actions/getCurrentUser';
import { getFavoriteListings } from '@/app/actions/getFavoriteListings';
import { ClientOnly } from '@/app/components/services/client-only/ClientOnly';
import { EmptyState } from '@/app/components/views/empty-state/EmptyState';
import { FavoritesClient } from './FavoritesClient';

const FavoritesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser)
    return (
      <ClientOnly>
        <EmptyState title="Вы не авторизированы" subtitle="Пожалуйста, войдите в систему" />
      </ClientOnly>
    );

  const listings = await getFavoriteListings();

  if (listings.length == 0)
    return (
      <ClientOnly>
        <EmptyState
          title="Избранное не найдено"
          subtitle="Похоже, у вас нет избранных списков."
        />
      </ClientOnly>
    );

  return (
    <ClientOnly>
      <FavoritesClient listings={listings} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default FavoritesPage;
