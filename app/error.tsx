'use client';

import { EmptyState } from '@/app/components/views/empty-state/EmptyState';
import { useEffect } from 'react';

interface ErrorStateProps {
  error: Error;
}

const ErrorState: React.FC<ErrorStateProps> = ({ error }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <EmptyState title="О-о-о" subtitle="Что-то пошло не так!" />;
};

export default ErrorState;
