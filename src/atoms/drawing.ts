import { STR_SHAPE } from "@/types/STRUCTURES";
import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

const shapeAtom = atom<STR_SHAPE[] | []>({
  key: "shapeAtom",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const shapeAtomSelector = selector({
  key: "profileAtomSelector",
  get: ({ get }) => get(shapeAtom),
  set: ({ set }, newStatus) => set(shapeAtom, newStatus),
});
