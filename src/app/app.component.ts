import { Component } from "@angular/core";
import { createBuilder } from "../../projects/s-js-utils/src/lib/create-builder";
import { Deferred } from "../../projects/s-js-utils/src/lib/deferred";
import { isDefined } from "../../projects/s-js-utils/src/lib/is-defined";
import { roundToMultipleOf } from "../../projects/s-js-utils/src/lib/round-to-multiple-of";
import { sleep } from "../../projects/s-js-utils/src/lib/sleep";
import { elapsedToString } from "../../projects/s-js-utils/src/lib/time-utils";
import { toCsv } from "../../projects/s-js-utils/src/lib/to-csv";
import { wrapFunction } from "../../projects/s-js-utils/src/lib/wrap-function";
import { Multiplier } from "./multiplier";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "Failure";

  constructor() {
    // just use each function in the library once to prove we can import it
    new Multiplier(2)(3);
    createBuilder(() => ({ text: "hi" }))();
    new Deferred().resolve(42);
    isDefined(1);
    roundToMultipleOf(2, 0);
    sleep(1000);
    elapsedToString(499, ["s"]);
    toCsv([["eats shoots and leaves", "eats, shoots, and leaves"]]);
    wrapFunction((a: number, b: number) => a + b, {});

    this.title = "s-js-utils-platform";
  }
}
