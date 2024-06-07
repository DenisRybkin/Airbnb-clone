'use client';

import { useCountries } from '@/app/hooks/useCountries';

import { UserDto } from '@/app/types/DTO/user';

import { format } from 'date-fns';

import { Button } from '@/app/components/base/button/Button';
import { HeartButton } from '@/app/components/elements/heart-button/HeartButton';
import { ListingDto } from '@/app/types/DTO/listing';
import { ReservationDto } from '@/app/types/DTO/reservation';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface ListingCardProps {
  data: ListingDto<false, true>;
  currentUser: UserDto | null;
  reservation?: ReservationDto<true>;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
}
export const ListingCard: React.FC<ListingCardProps> = props => {
  const router = useRouter();

  const { getByValue } = useCountries();

  const handleAction = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (props.disabled || !props.actionId) return null;
    props.onAction?.(props.actionId);
  };
  const handleOpenListing = () => router.push('/listings/' + props.data.id);

  const price = props.reservation?.totalPrice ?? props.data.price;

  const location = getByValue(props.data.locationValue);

  const reservationDate = props.reservation
    ? `${format(new Date(props.reservation.startDate), 'PP')} - ${format(
        new Date(props.reservation.endDate),
        'PP'
      )}`
    : null;

  return (
    <div
      onClick={handleOpenListing}
      className="col-span-1 cursor-pointer group"
    >
      <div className="flex flex-col gap-2 w-full">
        <div className="aspect-square w-full relative overflow-hidden rounded-xl">
          <Image
            fill
            src={props.data.imageSrc}
            alt="Listing"
            className="object-cover h-full w-full group-hover:scale-110 transition"
          />
          <div className="absolute top-3 right-3">
            <HeartButton
              listingId={props.data.id}
              currentUser={props.currentUser}
            />
          </div>
        </div>
        <div className="font-semibold text-lg">
          {location?.region}, {location?.rusLabel}
        </div>
        <div className="font-light text-neutral-500">
          {reservationDate || props.data.category?.name}
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold"> $ {price}</div>
          {reservationDate && <div className="font-light">{reservationDate}</div>}
        </div>
        {props.onAction && props.actionLabel && (
          <Button
            label={props.actionLabel}
            onClick={handleAction}
            disabled={props.disabled}
            small
          />
        )}
      </div>
    </div>
  );
};
