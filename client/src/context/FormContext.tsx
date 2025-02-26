import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Furniture {
  name: string;
  quantity: number;
}

interface Room {
  id: string;
  name: string;
  furniture: Furniture[];
}

interface Apartment {
  id?: string;
  address: string;
  floor: number;
  stairsOrElevator: string;
  size: number;
  rooms: Room[];
}

interface FormContextType {
  apartment: Apartment;
  setApartment: React.Dispatch<React.SetStateAction<Apartment>>;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [apartment, setApartment] = useState<Apartment>({
    address: '',
    floor: 0,
    stairsOrElevator: 'stairs',
    size: 0,
    rooms: [],
  });

  return (
    <FormContext.Provider value={{ apartment, setApartment }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};
