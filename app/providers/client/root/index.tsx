'use client';
import { ToastProvider } from '@/app/providers/client/toast-provider/ToastProvider';

export const ClientRootProvider = () => {
  return (
    <>
      <ToastProvider />
    </>
  );
};
