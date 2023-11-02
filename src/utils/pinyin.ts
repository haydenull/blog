import { pinyin } from "pinyin-pro";

export const convertToPinyin = (str: string) => {
  return pinyin(str, { toneType: "none", nonZh: "consecutive" });
};
