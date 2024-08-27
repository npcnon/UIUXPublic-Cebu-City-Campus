// Filename: useTriggerStore.ts
import { create } from 'zustand';

interface OnSubTrigger {
  triggerSubmit: boolean;
  setTriggerSubmit: () => void;
}

export const useOnSubTriggerStore = create<OnSubTrigger>((set) => ({
  triggerSubmit: false,
  setTriggerSubmit: () => set(state => ({
    triggerSubmit: !state.triggerSubmit
  })),
}));