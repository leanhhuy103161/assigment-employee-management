import en from "./en";
import vn from "./vn";
import jp from "./jp";

interface localeType {
  [key: string]: any;
}

export const LOCALES = {
  en: "en",
  vn: "vn",
  jp: "jp",
};

export const LOCALES_MAPPING: localeType = {
  [LOCALES.en]: en,
  [LOCALES.vn]: vn,
  [LOCALES.jp]: jp,
};
