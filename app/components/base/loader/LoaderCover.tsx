'use client';

import './Loader.scss';

import { classWithModifiers } from '@/app/utils/tools/classNames';
import { Loader, LoaderSizeType } from './Loader';

interface LoaderCoverProps {
  absolute?: boolean;
  white?: boolean;
  dimmed?: boolean;
  size?: LoaderSizeType;
}

export const LoaderCover: React.FC<LoaderCoverProps> = props => {
  return (
    <div
      className={classWithModifiers(
        'loader-cover',
        props.absolute && 'absolute',
        'white',
        props.dimmed && 'dimmed'
      )}
    >
      <Loader
        white={props.white}
        size={props.size}
        className="loader-cover__loader"
      />
    </div>
  );
};
