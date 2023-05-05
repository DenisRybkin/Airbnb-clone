'use client';

import { Toaster } from 'react-hot-toast';

const TOAST_DURATION = 3000;
export const ToastProvider = () => {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{ duration: TOAST_DURATION }}
    />
  );
};
