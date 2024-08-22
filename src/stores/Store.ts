// Filename: Store.ts

import { create } from 'zustand';
import { useAcademicBackgroundStore } from './substores/academicBackgroundStore';
import { usePersonalDataStore } from './substores/personalDataStore';

// Define the main store interface
interface MainStore {
  academicBackground: ReturnType<typeof useAcademicBackgroundStore>;
  personalData: ReturnType<typeof usePersonalDataStore>;
}

// Create the main store
export const useStore = create<MainStore>((set) => ({
  academicBackground: useAcademicBackgroundStore.getState(),
  personalData: usePersonalDataStore.getState(),
}));
