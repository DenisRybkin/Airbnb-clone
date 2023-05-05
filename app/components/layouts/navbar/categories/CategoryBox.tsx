'use client';

import {
  CategoryNames,
  getCategoryIconByName,
} from '@/app/utils/tools/getCategoryIconByName';
import { Category } from '@prisma/client';
import { useRouter, useSearchParams } from 'next/navigation';
import qs from 'query-string';
import { useCallback } from 'react';

export const CategoryBox: React.FC<
  Category & { selected: boolean }
> = props => {
  const router = useRouter();

  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuery = {};

    if (params) currentQuery = qs.parse(params.toString());

    const updatedQuery: Record<string, string> = {
      ...currentQuery,
      categoryId:
        params?.get('categoryId') != props.id
          ? props.id
          : (null as unknown as string),
    };

    if (params?.get('category') == props.name) delete updatedQuery.category;

    const url = qs.stringifyUrl(
      { url: '/', query: updatedQuery },
      { skipNull: true }
    );

    router.push(url);
  }, [props.name, params, router]);

  const icon = getCategoryIconByName(props.name as CategoryNames);

  return (
    <div
      onClick={handleClick}
      className={`
        flex
        flex-col
        items-center
        justify-center
        gap-2
        p-3
        border-b-2
        hover:text-neutral-800
        transition
        cursor-pointer
        ${
          props.selected
            ? 'border-b-neutral-800 text-neutral-800'
            : 'border-transparent text-neutral-500'
        }
        `}
    >
      {icon?.({ size: 26 })}
      <div className="font-medium text-sm">{props.name}</div>
    </div>
  );
};
