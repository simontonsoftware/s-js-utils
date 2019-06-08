import { Component } from "@angular/core";
import {
  createBuilder,
  Deferred,
  isDefined,
  isEqualAtDepth,
  isSetEqual,
  isSuperset,
  roundToMultipleOf,
  setDifference,
  setIntersection,
  setUnion,
  sleep,
  symmetricSetDifference,
  elapsedToString,
  toCsv,
  wrapFunction,
} from "s-js-utils";
import { Multiplier } from "./multiplier";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "Failure";

  constructor() {
    //
    // just use each function in the library once to prove we can import it
    //

    const set = new Set([]);
    isSetEqual(set, set);
    isSuperset(set, set);
    setDifference(set, set);
    setIntersection(set, set);
    setUnion(set, set);
    symmetricSetDifference(set, set);

    new Multiplier(2)(3); // uses CallableObject
    createBuilder(() => ({ text: "hi" }))();
    new Deferred().resolve(42);
    isDefined(1);
    isEqualAtDepth(1, 1, 1);
    roundToMultipleOf(2, 0);
    sleep(1000);
    elapsedToString(499, ["s"]); // from time-utils
    toCsv([["eats shoots and leaves", "eats, shoots, and leaves"]]);
    wrapFunction((a: number, b: number) => a + b, {});

    this.title = "s-js-utils-platform";
  }
}
