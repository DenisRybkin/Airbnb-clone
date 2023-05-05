'use client';

import { Counter } from '@/app/components/base/counter/Counter';
import { Headings } from '@/app/components/base/headings/Headings';

interface SelectInfoProps {
  guestsCount: number;
  onChangeGuests: (value: number) => void;
  roomsCount: number;
  onChangeRooms: (value: number) => void;
  bathroomsCount: number;
  onChangeBathrooms: (value: number) => void;
}

export const SelectInfo: React.FC<SelectInfoProps> = props => {
  return (
    <div className="flex flex-col gap-8">
      <Headings title="More information" subtitle="Find your perfect place" />
      <Counter
        title="Guests"
        subtitle="How many guests ara coming?"
        value={props.guestsCount}
        onChange={props.onChangeGuests}
      />
      <hr />
      <Counter
        title="Rooms"
        subtitle="How many guests do you need?"
        value={props.roomsCount}
        onChange={props.onChangeRooms}
      />
      <hr />
      <Counter
        title="Bathrooms"
        subtitle="How many bathrooms do you need?"
        value={props.bathroomsCount}
        onChange={props.onChangeBathrooms}
      />
    </div>
  );
};
