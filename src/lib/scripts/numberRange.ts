import { writable } from "svelte/store";
import { browser } from "$app/environment";

// Interface for number range
export interface Range {
  min: number;
  max: number;
}

export const range = writable<Range>(
  (() => {
    let data: Range = { min: 1, max: 999 };
    if (!browser) return data;

    if (localStorage.getItem("range") === "[object Object]")
      localStorage.setItem("range", JSON.stringify(data));
    else data = JSON.parse(localStorage.getItem("range") ?? "{}");

    return data;
  })()
);

range.subscribe((v) => {
  if (browser) return localStorage.setItem("range", String(v));
});
