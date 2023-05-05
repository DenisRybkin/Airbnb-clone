'use client';
import { classMerge, classWithModifiers } from '@/app/utils/tools/classNames';
import './Loader.scss';

export type LoaderSizeType = 'large' | 'big' | 'medium' | 'small';

interface LoaderProps {
  className?: string;
  white?: boolean;
  size?: LoaderSizeType;
}

export const Loader: React.FC<LoaderProps> = props => {
  return (
    <div
      className={classMerge(
        classWithModifiers(
          'loader',
          props.white && 'white',
          props.size && props.size
        ),
        props.className
      )}
    />
  );
};
