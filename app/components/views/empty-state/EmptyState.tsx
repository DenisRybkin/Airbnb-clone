'use client';

import { Button } from '@/app/components/base/button/Button';
import { Headings } from '@/app/components/base/headings/Headings';
import { useRouter } from 'next/navigation';

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}
export const EmptyState: React.FC<EmptyStateProps> = props => {
  const router = useRouter();

  const handleResetFilters = () => router.push('/');

  return (
    <div className="h-[60vh] flex flex-col gap-2 justify-center items-center">
      <Headings
        title={props.title ?? 'Совпадений не найденно'}
        isCenter
        subtitle={
          props.subtitle ?? 'Попробуйте изменить или удалить некоторые из ваших фильтров'
        }
      />
      <div className="w-48 mt-4">
        <Button
          outline
          label="Убрать все фильтры"
          onClick={handleResetFilters}
        />
      </div>
    </div>
  );
};
