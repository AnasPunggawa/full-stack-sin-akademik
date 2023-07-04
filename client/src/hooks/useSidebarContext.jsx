import { useContext } from 'react';
import { SidebarContext } from '../context/SidebarContext';

export function useSidebarContext() {
  return useContext(SidebarContext);
}
