'use client';

import { Headings } from '@/app/components/base/headings/Headings';
import { ImageUpload } from '@/app/components/base/pickers/ImageUpload';

interface SelectImageProps {
  value?: string;
  onChange: (value: string) => void;
}
export const SelectImage: React.FC<SelectImageProps> = props => {
  return (
    <div className="flex flex-col gap-8">
      <Headings
        title="Добавьте фотографию вашего"
        subtitle="Покажите гостям, как выглядит ваше заведение"
      />
      <ImageUpload {...props} />
    </div>
  );
};
