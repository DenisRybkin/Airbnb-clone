'use client';

import { Counter } from '@/app/components/base/counter/Counter';
import { Headings } from '@/app/components/base/headings/Headings';

interface SelectInfoProps {
  guestsValue: number;
  onChangeGuests: (value: number) => void;
  roomsValue: number;
  onChangeRooms: (value: number) => void;
  bathroomsValue: number;
  onChangeBathrooms: (value: number) => void;
}

export const SelectInfo: React.FC<SelectInfoProps> = props => {
  return (
    <div className="flex flex-col gap-8">
      <Headings
        title="Share some basics about your place"
        subtitle="What amenities do you have?"
      />
      <Counter
        title="Guests"
        subtitle="How many guests do you allow"
        value={props.guestsValue}
        onChange={props.onChangeGuests}
      />
      <hr />
      <Counter
        title="Rooms"
        subtitle="How many rooms do tou have"
        value={props.roomsValue}
        onChange={props.onChangeRooms}
      />
      <hr />
      <Counter
        title="Bathrooms"
        subtitle="How many bathrooms do tou have"
        value={props.bathroomsValue}
        onChange={props.onChangeBathrooms}
      />
    </div>
  );
};
