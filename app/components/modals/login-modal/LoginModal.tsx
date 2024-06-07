'use client';
import { Button } from '@/app/components/base/button/Button';
import { Headings } from '@/app/components/base/headings/Headings';
import { useLoginModal } from '@/app/store/hooks/useLoginModal';
import { useRegisterModal } from '@/app/store/hooks/useRegisterModal';
import { signIn, SignInResponse } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { Input } from '../../base/inputs/Input';
import { Modal } from '../../base/modal/Modal';

interface LoginDto {
  email: string;
  password: string;
}

export const LoginModal = () => {
  const router = useRouter();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginDto>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const signInByGithub = () => signIn('github');
  const signInByGoogle = () => signIn('google');

  const handleOpenRegisterModal = () => {
    loginModal.onClose();
    registerModal.onOpen();
  };

  const responseHandler = (res?: SignInResponse) => {
    if (res?.ok) {
      reset();
      loginModal.onClose();
      toast.success('Вы вошли в систему');
      router.refresh();
    }
    if (res?.error) toast.error(res.error);
  };

  const submitHandler: SubmitHandler<LoginDto> = data => {
    setIsLoading(true);
    signIn('credentials', { ...data, redirect: false })
      .then(responseHandler)
      .catch(toast.error)
      .finally(() => setIsLoading(false));
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Headings title="С возвращением" subtitle="Войдите в аккаунт!" />
      <Input<LoginDto>
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input<LoginDto>
        id="password"
        type="password"
        label="Пароль"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footer = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Продолжить с Google"
        onClick={signInByGoogle}
        icon={FcGoogle}
      />
      <Button
        outline
        label="Продолжить с Github"
        onClick={signInByGithub}
        icon={AiFillGithub}
      />
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="flex flex-row justify-center items-center gap-2">
          <div>Впервые пользуетесь Airbnb?</div>
          <div
            onClick={handleOpenRegisterModal}
            className="text-neutral-800 cursor-pointer hover:underline"
          >
            Создайте аккаунт
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      totalDisabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Вход"
      actionLabel="Продолжить"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(submitHandler)}
      body={bodyContent}
      footer={footer}
    ></Modal>
  );
};
