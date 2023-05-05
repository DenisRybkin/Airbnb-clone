'use client';

import { Button } from '@/app/components/base/button/Button';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { useClickAway } from 'react-use';

interface ModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  onSubmit?: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  totalDisabled?: boolean;
  submitDisabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
}

export const Modal: React.FC<ModalProps> = props => {
  const parentRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState<boolean>(!!props.isOpen);

  const handleClose = useCallback(() => {
    //if (props.totalDisabled) return;
    setIsOpen(false);
    setTimeout(() => props.onClose?.(), 300);
  }, [props.totalDisabled]);

  const handleSubmit = useCallback(() => {
    if (props.totalDisabled) return;
    props.onSubmit?.();
  }, [props.totalDisabled, props.onSubmit]);

  const handleSecondaryAction = useCallback(() => {
    if (props.totalDisabled || !props.secondaryAction) return;

    props.secondaryAction();
  }, [props.secondaryAction]);

  useEffect(
    () =>
      props.isOpen == false && isOpen
        ? handleClose()
        : setIsOpen(!!props.isOpen),
    [props.isOpen]
  );
  useClickAway(parentRef, handleClose);
  if (!props.isOpen) return null;

  return (
    <>
      <div
        className="
          justify-center
          items-center
          flex
          overflow-x-hidden
          overflow-y-auto
          fixed
          inset-0
          z-50
          outline-none
          focus:outline-none
          bg-neutral-800/70
        "
      >
        <div
          ref={parentRef}
          className="
          relative
          w-full
          md:w-4/6
          lg:w-3/6
          xl:w-2/5
          my-6
          max-md:my-0
          mx-auto
          h-full
          lg:h-auto
          md:h-auto
          "
        >
          {/*content*/}
          <div
            className={`
            translate
            duration-300
            h-full
            ${
              isOpen
                ? 'translate-y-0 opacity-100'
                : 'translate-y-full opacity-0'
            }
          `}
          >
            <div
              className="
              translate
              h-full
              lg:h-auto
              md:h-auto
              border-0
              rounded-lg
              shadow-lg
              relative
              flex
              flex-col
              w-full
              bg-white
              outline-none
              focus:outline-none
            "
            >
              {/*header*/}
              <div
                className="
                flex
                items-center
                p-6
                rounded-t
                justify-center
                relative
                border-b-[1px]
                "
              >
                <button
                  className="
                    p-1
                    border-0
                    hover:opacity-70
                    transition
                    absolute
                    right-9
                  "
                  onClick={handleClose}
                >
                  <IoMdClose size={18} />
                </button>
                <div className="text-lg font-semibold">{props.title}</div>
              </div>
              {/*body*/}
              <div className="relative p-6 flex-auto">{props.body}</div>
              {/*footer*/}
              <div className="flex flex-col gap-2 p-6">
                <div
                  className="
                    flex
                    flex-row
                    items-center
                    gap-4
                    w-full
                  "
                >
                  {props.secondaryAction && props.secondaryActionLabel && (
                    <Button
                      disabled={props.totalDisabled}
                      label={props.secondaryActionLabel}
                      onClick={handleSecondaryAction}
                      outline
                    />
                  )}
                  <Button
                    disabled={props.totalDisabled || props.submitDisabled}
                    label={props.actionLabel}
                    onClick={handleSubmit}
                  />
                </div>
                {props.footer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
