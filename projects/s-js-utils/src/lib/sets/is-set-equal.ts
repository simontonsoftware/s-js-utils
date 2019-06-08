import { isSuperset } from "./is-superset";

export function isSetEqual(setA: Set<any>, setB: Set<any>) {
  return setA.size === setB.size && isSuperset(setA, setB);
}
