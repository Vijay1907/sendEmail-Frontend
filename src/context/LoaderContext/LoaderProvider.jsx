import { createContext, useContext, useState } from 'react';
import { LoaderContext } from './LoaderContext';
export const LoaderProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const showLoader = () => setLoading(true);
    const hideLoader = () => setLoading(false);
  
    return (
      <LoaderContext.Provider value={{ loading, showLoader, hideLoader }}>
        {children}
      </LoaderContext.Provider>
    );
  };