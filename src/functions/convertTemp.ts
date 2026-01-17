export function convertTemp(value: number, unit: "C" | "F") {
    return unit === "C"
      ? Math.round(value)
      : Math.round((value * 9) / 5 + 32);
}
  