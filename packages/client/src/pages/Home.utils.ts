import * as yup from "yup";
import { AgeRangeType, SexType, TimeDayType } from "./UserEntry.model";

export interface UserEntry {
  time_of_day: TimeDayType;
  bpm: number;
  meanrr: number;
  mxdmn: number;
  sdnn: number;
  rmssd: number;
  pnn50: number;
  mode: number;
  amo: number;
  lf: number;
  hf: number;
  vlf: number;
  lfhf: number;
  total_power: number;
  gender: SexType;
  age_range: AgeRangeType;
  height: number;
  weight: number;
}

export const entryFormInitialValues: UserEntry = {
  time_of_day: "" as any,
  bpm: "" as any,
  meanrr: "" as any,
  mxdmn: "" as any,
  sdnn: "" as any,
  rmssd: "" as any,
  pnn50: "" as any,
  mode: "" as any,
  amo: "" as any,
  lf: "" as any,
  hf: "" as any,
  vlf: "" as any,
  lfhf: "" as any,
  total_power: "" as any,
  gender: "" as any,
  age_range: "" as any,
  height: "" as any,
  weight: "" as any,
};
export const ageRangeOptions = [
  { value: "18-24", label: "18-24" },
  { value: "25-34", label: "25-34" },
  { value: "35-44", label: "35-44" },
  { value: "45-54", label: "45-54" },
  { value: "55-64", label: "55-64" },
  { value: "65-74", label: "65-74" },
];

export const genderOptions = [
  { value: "m", label: "Male" },
  { value: "f", label: "Female" },
];

export const timeOfDayOptions = [
  { value: "day", label: "Day" },
  { value: "evening", label: "Evening" },
  { value: "morning", label: "Morning" },
  { value: "night", label: "Night" },
];
export const entryFormValidationSchema = yup.object().shape({
  time_of_day: yup
    .string()
    .oneOf(timeOfDayOptions.map((opt) => opt.value))
    .required("Time of day is required"),
  bpm: yup
    .number()
    .min(0, "BPM should be positive")
    .required("BPM is required"),
  meanrr: yup
    .number()
    .min(0, "Mean RR should be positive")
    .required("Mean RR is required"),
  mxdmn: yup
    .number()
    .min(0, "Mxdmn should be positive")
    .required("Mxdmn is required"),
  sdnn: yup
    .number()
    .min(0, "Sdnn should be positive")
    .required("Sdnn is required"),
  rmssd: yup
    .number()
    .min(0, "Rmssd should be positive")
    .required("Rmssd is required"),
  pnn50: yup
    .number()
    .min(0, "PNN50 should be positive")
    .required("PNN50 is required"),
  mode: yup
    .number()
    .min(0, "Mode should be positive")
    .required("Mode is required"),
  amo: yup
    .number()
    .min(0, "Amo should be positive")
    .required("Amo is required"),
  lf: yup.number().min(0, "Lf should be positive").required("Lf is required"),
  hf: yup.number().min(0, "Hf should be positive").required("Hf is required"),
  vlf: yup
    .number()
    .min(0, "Vlf should be positive")
    .required("Vlf is required"),
  lfhf: yup
    .number()
    .min(0, "Lfhf should be positive")
    .required("Lfhf is required"),
  total_power: yup
    .number()
    .min(0, "Total Power should be positive")
    .required("Total Power is required"),
  gender: yup
    .string()
    .oneOf(genderOptions.map((opt) => opt.value))
    .required("Gender is required"),
  age_range: yup
    .string()
    .oneOf(ageRangeOptions.map((opt) => opt.value))
    .required("Age range is required"),
  height: yup
    .number()
    .min(0, "Height should be positive")
    .max(300)
    .required("Height is required"),
  weight: yup
    .number()
    .min(0, "Weigth should be positive")
    .required("Weigth is required"),
});

export const testEntry: UserEntry = {
  time_of_day: TimeDayType.DAY,
  bpm: 100,
  meanrr: 100,
  mxdmn: 100,
  sdnn: 100,
  rmssd: 100,
  pnn50: 100,
  mode: 100,
  amo: 100,
  lf: 100,
  hf: 100,
  vlf: 100,
  lfhf: 100,
  total_power: 100,
  gender: SexType.MALE,
  age_range: AgeRangeType.from18To24,
  height: 180,
  weight: 80,
};

export const testPositiveData: UserEntry = {
  time_of_day: TimeDayType.DAY,
  bpm: 73,
  meanrr: 814.16,
  mxdmn: 0.08,
  sdnn: 23.071,
  rmssd: 24.118,
  pnn50: 5.05,
  mode: 0.825,
  amo: 76,
  lf: 93,
  hf: 135,
  vlf: 129,
  lfhf: 0.689,
  total_power: 357,
  gender: SexType.MALE,
  age_range: AgeRangeType.from45To54,
  height: 178,
  weight: 92.0,
};

export const testNegativeData: UserEntry = {
  time_of_day: TimeDayType.MORNING,
  bpm: 78,
  meanrr: 768.07,
  mxdmn: 0.1,
  sdnn: 29.65,
  rmssd: 21.196,
  pnn50: 4.04,
  mode: 0.775,
  amo: 56,
  lf: 489,
  hf: 128,
  vlf: 96,
  lfhf: 3.82,
  total_power: 713,
  gender: SexType.MALE,
  age_range: AgeRangeType.from45To54,
  height: 178,
  weight: 92.0,
};
