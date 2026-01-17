import { createSlice} from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type TempUnit = "C" | "F";

const saved = localStorage.getItem("tempUnit") as TempUnit | null;

const initialState: TempUnit = saved ?? "C";

const unitSlice = createSlice({
  name: "unit",
  initialState,
  reducers: {
    setUnit: (_, action: PayloadAction<TempUnit>) => {
      localStorage.setItem("tempUnit", action.payload);
      return action.payload;
    }
  }
});

export const { setUnit } = unitSlice.actions;
export default unitSlice.reducer;
