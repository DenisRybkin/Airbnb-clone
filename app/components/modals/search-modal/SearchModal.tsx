'use client';

import { Modal } from '@/app/components/base/modal/Modal';
import { SelectDate } from '@/app/components/modals/search-modal/components/select-date/SelectDate';
import { SelectInfo } from '@/app/components/modals/search-modal/components/select-info/SelectInfo';
import { SelectLocation } from '@/app/components/modals/search-modal/components/select-location/SelectLocation';
import { Country } from '@/app/hooks/useCountries';
import { useSearchModal } from '@/app/store/hooks/useSearchModal';
import { formatISO } from 'date-fns';
import dynamic from 'next/dynamic';
import { useRouter, useSearchParams } from 'next/navigation';
import qs from 'query-string';
import { useMemo, useState } from 'react';
import { Range, RangeKeyDict } from 'react-date-range';

enum STEPS {
  LOCATION,
  DATE = 1,
  INFO = 2,
}

export const SearchModal = () => {
  const router = useRouter();
  const params = useSearchParams();
  const searchModal = useSearchModal();

  const [location, setLocation] = useState<Country>();
  const [step, setStep] = useState<STEPS>(STEPS.LOCATION);
  const [guestCount, setGuestCount] = useState<number>(1);
  const [roomCount, setRoomCount] = useState<number>(1);
  const [bathroomCount, setBathroomCount] = useState<number>(1);
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });

  const actionLabel = useMemo(
    () => (step == STEPS.INFO ? 'Поиск' : 'Дальше'),
    [step]
  );

  const secondaryActionLabel = useMemo(
    () => (step == STEPS.LOCATION ? undefined : 'Назад'),
    [step]
  );

  const handleBack = () => setStep(value => value - 1);
  const handleNext = () => setStep(value => value + 1);

  const handleSelectDateRange = (value: RangeKeyDict) =>
    setDateRange(value.selection);

  const handleSubmit = async () => {
    if (step != STEPS.INFO) return handleNext();

    let currentQuery = {};
    if (params) currentQuery = qs.parse(params.toString());

    const updatedQuery = {
      ...currentQuery,
      locationValue: location?.value,
      guestCount,
      roomCount,
      bathroomCount,
      ...(dateRange.startDate && { startDate: formatISO(dateRange.startDate) }),
      ...(dateRange.endDate && { startDate: formatISO(dateRange.endDate) }),
    };

    const url = qs.stringifyUrl(
      {
        url: '/',
        query: updatedQuery,
      },
      { skipNull: true }
    );
    setStep(STEPS.LOCATION);
    searchModal.onClose();
    router.push(url);
  };

  const handleGetContent = () => {
    switch (step) {
      case STEPS.LOCATION:
        return <SelectLocation onChange={setLocation} value={location} />;
      case STEPS.DATE:
        return (
          <SelectDate value={dateRange} onChange={handleSelectDateRange} />
        );
      case STEPS.INFO:
        return (
          <SelectInfo
            roomsCount={roomCount}
            guestsCount={guestCount}
            bathroomsCount={bathroomCount}
            onChangeRooms={setRoomCount}
            onChangeBathrooms={setBathroomCount}
            onChangeGuests={setGuestCount}
          />
        );
    }
  };

  return (
    <Modal
      isOpen={searchModal.isOpen}
      onClose={searchModal.onClose}
      onSubmit={handleSubmit}
      title="Фильтры"
      actionLabel={actionLabel}
      secondaryAction={step == STEPS.LOCATION ? undefined : handleBack}
      secondaryActionLabel={secondaryActionLabel}
      body={handleGetContent()}
    />
  );
};
