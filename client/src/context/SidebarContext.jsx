import PropTypes from 'prop-types';
import { createContext, useState } from 'react';

export const SidebarContext = createContext(false);

export function SidebarProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  function toggle() {
    setIsOpen(!isOpen);
  }

  return (
    <SidebarContext.Provider value={{ isOpen, toggle }}>
      {children}
    </SidebarContext.Provider>
  );
}

SidebarProvider.propTypes = {
  children: PropTypes.any,
};
