import { create } from "zustand";
import { CrochetPattern, TagsColor } from "@share/interfaces/crochet";
import { crochetPatternsData } from "src/data/crochet";
import {
  candyCuteWarmColors,
  candyCuteWarmColorsDark,
} from "src/components/color";

interface CrochetPatternState {
  crochetPatterns: CrochetPattern[];
  tags: TagsColor[];
  setCrochetPatterns: (crochetPatterns: CrochetPattern[]) => void;
  addCrochetPattern: (crochetPattern: CrochetPattern) => void;
  editCrochetPattern: (id: number, crochetPattern: CrochetPattern) => void;
  setTags: (crochetPatterns: CrochetPattern[]) => void;

  fetchCrochet: () => void;
}

const useCrochetPatternStore = create<CrochetPatternState>((set) => ({
  crochetPatterns: [],
  tags: [],
  setCrochetPatterns: (crochetPatterns) => set({ crochetPatterns }),
  addCrochetPattern: (crochetPattern) => {
    set((state) => {
      const maxId =
        state.crochetPatterns.length > 0
          ? Math.max(...state.crochetPatterns.map((u) => u.id))
          : 0;

      const newPattern = {
        ...crochetPattern,
        id: maxId + 1,
      };
      state.setTags([newPattern]);
      return {
        crochetPatterns: [newPattern, ...state.crochetPatterns],
      };
    });
  },
  editCrochetPattern: (id, newCrochetPattern) =>
    set((state) => {
      state.setTags([newCrochetPattern]);
      return {
        crochetPatterns: state.crochetPatterns.map((crochetPattern) =>
          crochetPattern.id === id ? newCrochetPattern : crochetPattern
        ),
      };
    }),

  setTags: (crochetPatterns) =>
    set((state) => {
      const tags: TagsColor[] = [...state.tags];
      crochetPatterns.forEach((data) => {
        const colorPick = Math.floor(Math.random() * 7);
        data.tags.forEach((tag) =>
          tags.find((t) => t.value === tag)
            ? null
            : tags.push({
                label: tag,
                value: tag,
                color: candyCuteWarmColors[colorPick],
                textColor: candyCuteWarmColorsDark[colorPick],
              })
        );
      });

      return { tags };
    }),

  fetchCrochet: () =>
    set((state) => {
      const data = crochetPatternsData;

      state.setTags(data);
      return {
        crochetPatterns: data,
      };
    }),
}));

export default useCrochetPatternStore;
