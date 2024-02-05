import { STR_SHAPE } from "@/types/STRUCTURES";
import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const shapeAtom = atom<STR_SHAPE[] | []>({
  key: "shapeAtom",
  default: [],
  /* localstorage연동을 위해 persist를 활용한다 */
  effects_UNSTABLE: [persistAtom],
});
