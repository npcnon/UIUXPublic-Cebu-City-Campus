// Filename: useFormStore.ts

import {create} from 'zustand';

interface FormState {
  isValid: boolean;
  validateForm: () => boolean;
  setValidationStatus: (status: boolean) => void;
}

export const useFormStore = create<FormState>((set) => ({
  isValid: true,
  validateForm: () => {
    // Custom validation logic
    const isValid = true; // Replace with actual validation result
    set({ isValid });
    return isValid;
  },
  setValidationStatus: (status) => set({ isValid: status }),
}));
