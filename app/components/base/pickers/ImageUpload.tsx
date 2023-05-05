'use client';

import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import { TbPhotoPlus } from 'react-icons/tb';

declare global {
  var cloudinary: any;
}

interface ImageUploadProps {
  value?: string;
  onChange: (value: string) => void;
}
export const ImageUpload: React.FC<ImageUploadProps> = props => {
  const handleUpload = (result: any) => props.onChange(result.info.secure_url);

  return (
    <CldUploadWidget
      uploadPreset="nszen1yb"
      onUpload={handleUpload}
      options={{ maxFiles: 1 }}
    >
      {({ open, error }) => (
        <div
          className="
            relative
            cursor-pointer
            hover:opacity-70
            transition
            border-dashed
            border-2
            p-20
            border-neutral-300
            flex
            flex-col
            items-center
            justify-center
            gap-4
            text-neutral-600
            "
          onClick={() => open?.()}
        >
          <TbPhotoPlus size={50} />
          <div className="font-semibold text-lg">Click to upload</div>
          {props.value && (
            <div className="absolute inset-0 w-full h-full">
              <Image
                fill
                style={{ objectFit: 'cover' }}
                src={props.value}
                alt="Upload"
              />
            </div>
          )}
        </div>
      )}
    </CldUploadWidget>
  );
};
