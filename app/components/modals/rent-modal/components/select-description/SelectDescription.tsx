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
        title="Как бы вы описали свое заведение?"
        subtitle="Коротко и сладно получается лучше всего!"
      />
      <Input
        id="title"
        label="Заголовок"
        register={props.register}
        required
        errors={props.errors}
        disabled={props.isLoading}
      />
      <hr />
      <Input
        id="description"
        label="Описание"
        register={props.register}
        required
        errors={props.errors}
        disabled={props.isLoading}
      />
    </div>
  );
};
