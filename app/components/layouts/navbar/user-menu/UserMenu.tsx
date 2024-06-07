'use client';
import { useLoginModal } from '@/app/store/hooks/useLoginModal';
import { useRegisterModal } from '@/app/store/hooks/useRegisterModal';
import { useRentModal } from '@/app/store/hooks/useRentModal';
import { UserDto } from '@/app/types/DTO/user';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { useClickAway } from 'react-use';
import { Avatar } from '../../../base/avatar/Avatar';
import { MenuItem } from './MenuItem';

interface UserMenuProps {
  currentUser?: UserDto | null;
}

export const UserMenu: React.FC<UserMenuProps> = props => {
  const router = useRouter();

  const registerModal = useRegisterModal();
  const rentModal = useRentModal();
  const loginModal = useLoginModal();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const parentRef = useRef<HTMLDivElement>(null);
  const handleClose = () => setIsOpen(false);

  const toggleOpen = () => setIsOpen(prev => !prev);

  const handleClickMenuItem = (callback: () => void) => () => {
    callback();
    handleClose();
  };

  const handleRent = props.currentUser ? rentModal.onOpen : loginModal.onOpen;
  const handleRedirectToTrips = () => router.push('/trips');
  const handleRedirectToReservations = () => router.push('/reservations');
  const handleRedirectToFavorites = () => router.push('/favorites');
  const handleRedirectToProperties = () => router.push('/properties');

  useClickAway(parentRef, handleClose);

  return (
    <div ref={parentRef} className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={handleRent}
          className="
            hidden
            md:block
            text-sm
            font-semibold
            py-3
            px-4
            rounded-full
            hover:bg-neutral-100
            transition
            cursor-pointer
          "
        >
          Airbnb - мой дом
        </div>
        <div
          onClick={toggleOpen}
          className="
            p-4
            md:py-1
            md:px-2
            border-[1px]
            border-neutral-200
            flex
            flex-row
            items-center
            cursor-pointer
            gap-3
            rounded-full
            hover:shadow-md
            transition
          "
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={props.currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          className="
          absolute
          rounded-xl
          shadow-md
          w-[40vw]
          md:w-3/4
          bg-white
          overflow-hidden
          right-0
          top-12
          text-sm
        "
        >
          <div className="flex flex-col cursor-pointer">
            {props.currentUser ? (
              <>
                <MenuItem
                  onClick={handleClickMenuItem(handleRedirectToTrips)}
                  label="Мои поездки"
                />
                <MenuItem
                  onClick={handleClickMenuItem(handleRedirectToFavorites)}
                  label="Мои избранные"
                />
                <MenuItem
                  onClick={handleClickMenuItem(handleRedirectToReservations)}
                  label="Мои брони"
                />
                <MenuItem
                  onClick={handleClickMenuItem(handleRedirectToProperties)}
                  label="Моя собственность"
                />
                <MenuItem
                  onClick={handleClickMenuItem(rentModal.onOpen)}
                  label="Airbnb - мой дом"
                />
                <hr />
                <MenuItem
                  onClick={handleClickMenuItem(signOut)}
                  label="Выйти"
                />
              </>
            ) : (
              <>
                <MenuItem
                  onClick={handleClickMenuItem(loginModal.onOpen)}
                  label="Войти"
                />
                <MenuItem
                  onClick={handleClickMenuItem(registerModal.onOpen)}
                  label="Зарегистрироваться"
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
