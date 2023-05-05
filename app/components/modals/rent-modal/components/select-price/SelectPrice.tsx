'use client';

import { Headings } from '@/app/components/base/headings/Headings';
import { Input } from '@/app/components/base/inputs/Input';
import { RentDto } from '@/app/components/modals/rent-modal/RentModal';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

interface SelectPriceProps {
  isLoading: boolean;
  register: UseFormRegister<RentDto>;
  errors: FieldErrors<RentDto>;
}

export const SelectPrice: React.FC<SelectPriceProps> = props => {
  return (
    <div className="flex flex-col gap-8">
      <Headings
        title="Now, set your price"
        subtitle="How much do you charge per night?"
      />
      <Input
        formatPrice
        id="price"
        label="Price"
        register={props.register}
        errors={props.errors}
        type="number"
        disabled={props.isLoading}
        required
      />
    </div>
  );
};
