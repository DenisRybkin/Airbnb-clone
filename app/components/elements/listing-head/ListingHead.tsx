'use client';

import { Headings } from '@/app/components/base/headings/Headings';
import { HeartButton } from '@/app/components/elements/heart-button/HeartButton';
import { useCountries } from '@/app/hooks/useCountries';
import { UserDto } from '@/app/types/DTO/user';
import Image from 'next/image';
import React from 'react';

interface ListingHeadProps {
  title: string;
  imageSrc: string;
  locationValue: string;
  id: string;
  currentUser: UserDto | null;
}

export const ListingHead: React.FC<ListingHeadProps> = props => {
  const { getByValue } = useCountries();

  const location = getByValue(props.locationValue);

  return (
    <>
      <Headings
        title={props.title}
        subtitle={`${location?.region}, ${location?.rusLabel}`}
      />
      <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
        <Image
          src={props.imageSrc}
          alt="Image"
          fill
          className="object-cover w-full"
        />
        <div className="absolute top-5 right-5">
          <HeartButton listingId={props.id} currentUser={props.currentUser} />
        </div>
      </div>
    </>
  );
};
