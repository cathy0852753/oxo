import { create } from "zustand";
import { CrochetPattern } from "@share/interfaces/crochetPattern";

interface CrochetPatternState {
  crochetPatterns: CrochetPattern[];
  setCrochetPatterns: (crochetPatterns: CrochetPattern[]) => void;
  addCrochetPattern: (crochetPattern: CrochetPattern) => void;
  editCrochetPattern: (id: number, crochetPattern: CrochetPattern) => void;
}

const useCrochetPatternStore = create<CrochetPatternState>((set) => ({
  crochetPatterns: [],
  setCrochetPatterns: (crochetPatterns) => set({ crochetPatterns }),
  addCrochetPattern: (crochetPattern) =>
    set((state) => ({
      crochetPatterns: [crochetPattern, ...state.crochetPatterns],
    })),
  editCrochetPattern: (id, newCrochetPattern) =>
    set((state) => ({
      crochetPatterns: state.crochetPatterns.map((crochetPattern) =>
        newCrochetPattern.id === id ? newCrochetPattern : crochetPattern
      ),
    })),
}));

export default useCrochetPatternStore;
