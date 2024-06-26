'use client';
import { Button } from '@/app/components/base/button/Button';
import { Headings } from '@/app/components/base/headings/Headings';
import { useLoginModal } from '@/app/store/hooks/useLoginModal';
import { useRegisterModal } from '@/app/store/hooks/useRegisterModal';
import axios from 'axios';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { Input } from '../../base/inputs/Input';
import { Modal } from '../../base/modal/Modal';

interface RegisterDto {
  name: string;
  email: string;
  password: string;
}

export const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterDto>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const signInByGithub = () => signIn('github');
  const signInByGoogle = () => signIn('google');

  const handleOpenLoginModal = () => {
    registerModal.onOpen();
    loginModal.onOpen();
  };

  const handleSuccess = () => {
    toast.success('Вы зарегестрировались');
    registerModal.onClose();
    loginModal.onOpen();
  };

  const submitHandler: SubmitHandler<RegisterDto> = data => {
    setIsLoading(true);
    axios
      .post('/api/register', data)
      .then(handleSuccess)
      .catch(() => toast.error('Что-то пошло не так...'))
      .finally(() => setIsLoading(false));
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Headings title="Добро пожаловать в Airbnb" subtitle="Создайте аккаунт!" />
      <Input<RegisterDto>
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input<RegisterDto>
        id="name"
        label="Имя"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input<RegisterDto>
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
          <div>Уже есть аккаунт?</div>
          <div
            onClick={handleOpenLoginModal}
            className="text-neutral-800 cursor-pointer hover:underline"
          >
            Войти
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      totalDisabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Регистрация"
      actionLabel="Продолжить"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(submitHandler)}
      body={bodyContent}
      footer={footer}
    />
  );
};
