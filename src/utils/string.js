import { isEmpty } from "./validation"

export const include = (str1, str2) => {
  if (isEmpty(str1)) return false;
  if (isEmpty(str2)) return true;
  str1 = removeVnAccents(str1).toLowerCase();
  str2 = removeVnAccents(str2).toLowerCase();
  return str1.indexOf(str2) > -1;
}

export const removeVnAccents = (str) => {
  if (isEmpty(str)) return '';
  // remove accents
  const from = "àáãảạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệđùúủũụưừứửữựòóỏõọôồốổỗộơờớởỡợìíỉĩịäëïîöüûñçýỳỹỵỷ";
  const to = "aaaaaaaaaaaaaaaaaeeeeeeeeeeeduuuuuuuuuuuoooooooooooooooooiiiiiaeiiouuncyyyyy";

  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(RegExp(from[i], "gi"), to[i]);
  }

  str = str.toLowerCase().trim()
  return str;
}