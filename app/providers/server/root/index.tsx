import { CategoryProvider } from '@/app/providers/server/category-provider/CategoryProvider';
import React from 'react';

interface ServerRootProvider {
  children: React.ReactNode;
}
export const ServerRootProvider: React.FC<ServerRootProvider> = props => {
  return <CategoryProvider>{props.children}</CategoryProvider>;
};
