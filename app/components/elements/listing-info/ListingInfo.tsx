'use client';

import { Avatar } from '@/app/components/base/avatar/Avatar';
import { ListingCategory } from '@/app/components/elements/listing-category/ListingCategory';
import { useCountries } from '@/app/hooks/useCountries';
import { UserDto } from '@/app/types/DTO/user';
import { Category } from '@prisma/client';
import dynamic from 'next/dynamic';
import { useMemo } from 'react';

const Map = dynamic(
  () => import('../../base/pickers/Map').then(module => module.Map),
  {
    ssr: false,
  }
);

interface ListingInfoProps {
  user: UserDto;
  category?: Category;
  description: string;
  roomCount: number;
  guestCount: number;
  bathroomCount: number;
  locationValue: string;
}
export const ListingInfo: React.FC<ListingInfoProps> = props => {
  const { getByValue } = useCountries();

  const coordinates = getByValue(props.locationValue)?.latlng;

  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="text-xl font-semibold flex flex-row items-center gap-2">
          <div>Hosted by {props.user?.name}</div>
          <Avatar src={props.user?.image} />
        </div>
        <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
          <div>{props.guestCount} guests</div>
          <div>{props.roomCount} rooms</div>
          <div>{props.bathroomCount} bathrooms</div>
        </div>
      </div>
      <hr />
      <ListingCategory category={props.category} />
      <hr />
      <div className="text-lg font-light text-neutral-500">
        {props.description}
      </div>
      <hr />
      <Map center={coordinates} />
    </div>
  );
};
