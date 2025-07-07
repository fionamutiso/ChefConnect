import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  isAvailable: boolean;
  chefId: string;
  chefName: string;
}

export interface Chef {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  experience: string;
  location: string;
  priceRange: string;
  image: string;
  isAvailable: boolean;
  menuItems: MenuItem[];
}

interface ChefContextType {
  chefs: Chef[];
  addChef: (chef: Chef) => void;
  updateChefMenu: (chefId: string, menuItems: MenuItem[]) => void;
  getChefById: (chefId: string) => Chef | undefined;
  getAvailableChefs: () => Chef[];
}

const ChefContext = createContext<ChefContextType | undefined>(undefined);

export const useChef = () => {
  const context = useContext(ChefContext);
  if (context === undefined) {
    throw new Error('useChef must be used within a ChefProvider');
  }
  return context;
};

interface ChefProviderProps {
  children: ReactNode;
}

export const ChefProvider: React.FC<ChefProviderProps> = ({ children }) => {
  const [chefs, setChefs] = useState<Chef[]>([]);

  const addChef = (chef: Chef) => {
    setChefs(prev => [...prev, chef]);
  };

  const updateChefMenu = (chefId: string, menuItems: MenuItem[]) => {
    setChefs(prev => prev.map(chef => 
      chef.id === chefId 
        ? { ...chef, menuItems } 
        : chef
    ));
  };

  const getChefById = (chefId: string) => {
    return chefs.find(chef => chef.id === chefId);
  };

  const getAvailableChefs = () => {
    return chefs.filter(chef => chef.isAvailable);
  };

  const value: ChefContextType = {
    chefs,
    addChef,
    updateChefMenu,
    getChefById,
    getAvailableChefs,
  };

  return (
    <ChefContext.Provider value={value}>
      {children}
    </ChefContext.Provider>
  );
}; 