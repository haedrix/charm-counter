import { coinStore } from "../coin";
import { flattenAtoms } from "./utils/flatten-atoms";

export type GlobalAtoms = typeof atoms;
export const atoms = flattenAtoms({
	coinStore,
});
