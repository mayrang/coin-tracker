import { atom } from "recoil";

type IThemeItem = "dark" | "light";

export const themeState = atom<IThemeItem>({
  key: "themeState",
  default: "dark",
});
