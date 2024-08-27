// Filename: useTriggerStore.ts
import { create } from 'zustand';
import { debounce } from 'lodash';

interface OnSubTrigger {
  triggerSubmit: boolean;
  setTriggerSubmit: () => void;
}

// Create the store with Zustand
export const useOnSubTriggerStore = create<OnSubTrigger>((set) => ({
  triggerSubmit: false,
  setTriggerSubmit: debounce(() => {
    set((state) => ({
      triggerSubmit: !state.triggerSubmit
    }));
  }, 300), // Adjust the debounce time (in milliseconds) as needed
}));
