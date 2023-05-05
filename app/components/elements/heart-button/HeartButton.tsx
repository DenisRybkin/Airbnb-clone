'use client';

import { LoaderCover } from '@/app/components/base/loader/LoaderCover';

import { useFavorites } from '@/app/hooks/useFavorites';

import { UserDto } from '@/app/types/DTO/user';

import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

interface HeartButtonProps {
  listingId: string;
  currentUser: UserDto | null;
}

export const HeartButton: React.FC<HeartButtonProps> = props => {
  const { toggleFavorite, isFavorite, isLoading } = useFavorites(props);

  return (
    <div
      onClick={toggleFavorite}
      className="relative hover:opacity-80 transition cursor-pointer"
    >
      {!isLoading && (
        <AiOutlineHeart
          size={28}
          className="fill-white absolute -top-[2px] -right-[2px]"
        />
      )}
      {isFavorite && !isLoading && (
        <AiFillHeart className="fill-rose-500" size={24} />
      )}
      {isLoading && <LoaderCover white />}
    </div>
  );
};
