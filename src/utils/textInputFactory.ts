import { ITextInput } from "../model/ITextInput";

export const textInputFactory = <T extends Record<string, ITextInput>>(
  keys: readonly (keyof T)[]
) => {
  const result: T = {} as T;
  keys.forEach((key) => {
    result[key] = {
      value: "",
      error: false,
      msg: "",
    } as T[keyof T];
  });
  return result;
};
