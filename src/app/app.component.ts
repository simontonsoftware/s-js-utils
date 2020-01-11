import { Component } from "@angular/core";
import { identity } from "micro-dash";
import {
  convertTime,
  createBuilder,
  Deferred,
  elapsedToString,
  isDefined,
  isEqualAtDepth,
  isSetEqual,
  isSuperset,
  mapAsKeys,
  mapToObject,
  roundToMultipleOf,
  setDifference,
  setIntersection,
  setUnion,
  sleep,
  symmetricSetDifference,
  TimeUnit,
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

    // sets
    const set = new Set([]);
    isSetEqual(set, set);
    isSuperset(set, set);
    setDifference(set, set);
    setIntersection(set, set);
    setUnion(set, set);
    symmetricSetDifference(set, set);

    // time
    new Deferred().resolve(42);
    sleep(1000);
    const conversion = convertTime(1, TimeUnit.Seconds, TimeUnit.Microseconds);
    if (conversion !== 1000000) {
      throw new Error(
        `${conversion} !== 1000000 (this was a bug in production builds, where it was NaN)`,
      );
    }
    elapsedToString(499, ["s"]);

    // root
    new Multiplier(2)(3); // uses CallableObject
    createBuilder(() => ({ text: "hi" }))();
    isDefined(1);
    isEqualAtDepth(1, 1, 1);
    mapAsKeys([], identity);
    mapToObject([], () => ["a", 1]);
    roundToMultipleOf(2, 0);
    toCsv([["eats shoots and leaves", "eats, shoots, and leaves"]]);
    wrapFunction((a: number, b: number) => a + b, {});

    this.title = "s-js-utils-platform";
  }
}
