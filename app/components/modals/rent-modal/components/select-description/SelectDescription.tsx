'use client';

import { Headings } from '@/app/components/base/headings/Headings';
import { Input } from '@/app/components/base/inputs/Input';
import { RentDto } from '@/app/components/modals/rent-modal/RentModal';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

interface SelectDescriptionProps {
  isLoading: boolean;
  register: UseFormRegister<RentDto>;
  errors: FieldErrors<RentDto>;
}
export const SelectDescription: React.FC<SelectDescriptionProps> = props => {
  return (
    <div className="flex flex-col gap-8">
      <Headings
        title="How would you description your place?"
        subtitle="Short and sweet works best!"
      />
      <Input
        id="title"
        label="Title"
        register={props.register}
        required
        errors={props.errors}
        disabled={props.isLoading}
      />
      <hr />
      <Input
        id="description"
        label="Description"
        register={props.register}
        required
        errors={props.errors}
        disabled={props.isLoading}
      />
    </div>
  );
};
