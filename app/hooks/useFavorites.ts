import { useLoginModal } from '@/app/store/hooks/useLoginModal';
import { UserDto } from '@/app/types/DTO/user';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo, useState } from 'react';
import { toast } from 'react-hot-toast';

interface UseFavoritesParams {
  listingId: string;
  currentUser: UserDto | null;
}

interface IUseFavorites {
  isFavorite: boolean;
  isLoading: boolean;
  toggleFavorite: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export const useFavorites = (params: UseFavoritesParams): IUseFavorites => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const isFavorite = useMemo(
    () => (params.currentUser?.favoriteIds ?? []).includes(params.listingId),
    [params.currentUser?.favoriteIds.length, params.listingId]
  );

  const handleAddToFavorite = async () =>
    axios.post('/api/favorites/' + params.listingId);

  const handleRemoveFromFavorite = async () =>
    axios.delete('/api/favorites/' + params.listingId);

  const toggleFavorite = useCallback(
    async (event: React.MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
      if (!params.currentUser) return loginModal.onOpen();

      try {
        setIsLoading(true);
        isFavorite
          ? await handleRemoveFromFavorite()
          : await handleAddToFavorite();
        toast.success('Success');
      } catch (e) {
        toast.error('Something went wrong...');
      }
      setIsLoading(false);
      router.refresh();
    },
    [isFavorite, params.listingId, params.currentUser]
  );

  return {
    isLoading,
    isFavorite,
    toggleFavorite,
  };
};
