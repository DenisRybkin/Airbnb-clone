'use client';

import { Modal } from '@/app/components/base/modal/Modal';
import { SelectCategory } from '@/app/components/modals/rent-modal/components/select-category/SelectCategory';
import { SelectDescription } from '@/app/components/modals/rent-modal/components/select-description/SelectDescription';
import { SelectImage } from '@/app/components/modals/rent-modal/components/select-image/SelectImage';
import { SelectInfo } from '@/app/components/modals/rent-modal/components/select-info/SelectInfo';
import { SelectLocation } from '@/app/components/modals/rent-modal/components/select-location/SelectLocation';
import { SelectPrice } from '@/app/components/modals/rent-modal/components/select-price/SelectPrice';
import { Country } from '@/app/hooks/useCountries';
import { useRentModal } from '@/app/store/hooks/useRentModal';
import { mapCategories } from '@/app/utils/mappings/category';
import { Category } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
enum STEPS {
  CATEGORY,
  LOCATION,
  INFO,
  IMAGES,
  DESCRIPTION,
  PRICE,
}

export interface RentDto {
  categoryId: string;
  location: Country;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  imageSrc: string;
  price: number;
  title: string;
  description: string;
}

interface RentModalProps {
  categories: Category[];
}

export const RentModal = (props: RentModalProps) => {
  const router = useRouter();
  const rentModal = useRentModal();

  const [step, setStep] = useState<STEPS>(STEPS.CATEGORY);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleBack = () => setStep(prev => prev - 1);
  const handleNext = () => setStep(prev => prev + 1);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    setError,
    clearErrors,
    formState: { errors },
    reset,
  } = useForm<RentDto>({
    defaultValues: {
      categoryId: '',
      guestCount: 1,
      bathroomCount: 1,
      roomCount: 1,
      imageSrc: '',
      price: 1,
      title: '',
      description: '',
    },
  });

  const selectedCategoryId = watch('categoryId');
  const location = watch('location');
  const guestsCount = watch('guestCount');
  const roomsCount = watch('roomCount');
  const bathroomsCount = watch('bathroomCount');
  const imageSrc = watch('imageSrc');
  /* const title = watch('title');
  const description = watch('description');*/

  const setCustomValue =
    (id: keyof RentDto) => (value: string | number | Country) => {
      setValue(id, value, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });
    };

  const actionLabel: string = step == STEPS.PRICE ? 'Создать' : 'Дальше';
  const secondaryLabel: string | undefined =
    step == STEPS.CATEGORY ? undefined : 'Назад';

  const validateByCondition =
    (withNextStep?: boolean) => (condition: boolean, key: keyof RentDto) => {
      if (condition) {
        clearErrors(key);
        withNextStep && handleNext();
      } else
        setError(key, {
          type: 'required',
        });
    };
  const customValidate = (withNextStep?: boolean) => {
    switch (step) {
      case STEPS.CATEGORY:
        return validateByCondition(withNextStep)(
          !!selectedCategoryId,
          'categoryId'
        );
      case STEPS.LOCATION:
        return validateByCondition(withNextStep)(!!location, 'location');
      case STEPS.IMAGES:
        return validateByCondition(withNextStep)(!!imageSrc, 'imageSrc');
      default:
        return handleNext();
    }
  };
  const handleCreate: SubmitHandler<RentDto> = data => {
    if (step != STEPS.PRICE) return customValidate(true);

    setIsLoading(true);

    axios
      .post('/api/listings', data)
      .then(() => {
        toast.success('Объявление создано!');
        router.refresh();
        reset();
        setStep(STEPS.CATEGORY);
        rentModal.onClose();
      })
      .catch(err => toast.error('Что-то пошло не так...'))
      .finally(() => setIsLoading(false));
  };

  useEffect(
    () => customValidate(false),
    [selectedCategoryId, location, imageSrc]
  );

  const getBodyContent = () => {
    switch (step) {
      case STEPS.CATEGORY:
        return (
          <SelectCategory
            selectedCategoryId={selectedCategoryId}
            onSelect={setCustomValue('categoryId')}
            categories={mapCategories(props.categories ?? [])}
          />
        );
      case STEPS.LOCATION:
        return (
          <SelectLocation
            onChange={setCustomValue('location')}
            value={location}
          />
        );
      case STEPS.INFO:
        return (
          <SelectInfo
            guestsValue={guestsCount}
            onChangeGuests={setCustomValue('guestCount')}
            roomsValue={roomsCount}
            onChangeRooms={setCustomValue('roomCount')}
            bathroomsValue={bathroomsCount}
            onChangeBathrooms={setCustomValue('bathroomCount')}
          />
        );
      case STEPS.IMAGES:
        return (
          <SelectImage value={imageSrc} onChange={setCustomValue('imageSrc')} />
        );
      case STEPS.DESCRIPTION:
        return (
          <SelectDescription
            isLoading={isLoading}
            register={register}
            errors={errors}
          />
        );
      case STEPS.PRICE:
        return (
          <SelectPrice
            isLoading={isLoading}
            register={register}
            errors={errors}
          />
        );
    }
  };

  return (
    <Modal
      isOpen={rentModal.isOpen}
      title="Airbnb - ваш дом!"
      onSubmit={handleSubmit(handleCreate)}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryLabel}
      totalDisabled={isLoading || Object.keys(errors).length > 0}
      submitDisabled={Object.keys(errors).length > 0}
      secondaryAction={step == STEPS.CATEGORY ? undefined : handleBack}
      onClose={rentModal.onClose}
      body={getBodyContent()}
    />
  );
};
