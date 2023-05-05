'use client';
import { HTMLInputTypeAttribute } from 'react';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { BiDollar } from 'react-icons/bi';
interface InputProps<T extends FieldValues> {
  id: string;
  label: string;
  type?: string | HTMLInputTypeAttribute;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  register: UseFormRegister<T>;
  errors: FieldErrors;
}
export function Input<T extends FieldValues>(props: InputProps<T>) {
  return (
    <div className="w-full relative">
      {props.formatPrice && (
        <BiDollar
          size={24}
          className="text-neutral-700 absolute top-5 left-2"
        />
      )}
      <input
        id={props.id}
        disabled={props.disabled}
        type={props.type ?? 'text'}
        // @ts-ignore
        {...props.register(props.id, { required: props.required })}
        placeholder=" "
        className={`
          peer
          w-full
          p-3
          pt-6
          max-[768px]:p-4
          max-[768px]:pt-4
          max-[768px]:pb-3
          font-light
          bg-white
          max-[768px]:px-9
          border-2
          rounded-md
          outline-none
          transition
          disabled:opacity-70
          disabled:cursor-not-allowed
          ${props.formatPrice ? 'pl-9' : 'pl-4'}
          ${
            props.errors[props.id]
              ? 'border-rose-500 focus:border-rose-500'
              : 'border-neutral-300 focus:border-black'
          }
          `}
      />
      <label
        className={`
          absolute
          text-md
          duration-150
          transform
          -translate-y-3
          leading-3
          max-[768px]:-translate-y-4
          top-5
          md:top-6
          max-[768px]:top-5
          z-10
          origin-[0]
          ${props.formatPrice ? 'left-9' : 'left-4'}
          scale-90
          peer-placeholder-shown:scale-100
          peer-placeholder-shown:translate-y-0
          peer-focus:scale-75
          peer-focus:-translate-y-4
          ${props.errors[props.id] ? 'text-rose-500' : 'text-zinc-400'}
        `}
        htmlFor={props.id}
      >
        {props.label}
      </label>
    </div>
  );
}
