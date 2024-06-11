export const breakPoints = {
  small: "@media (min-width: 576px) and (max-width: 767px)",
  medium: "@media (min-width: 768px) and (max-width: 991px)",
  large: "@media (min-width: 992px) and (max-width: 1199px)",
  extraLarge: "@media (min-width: 1200px)",
};

export const applyStyleToAll = (styles: string) => {
  const style = `${Object.values(breakPoints).map((_) => `${_}{${styles}}`)}`;
  return replaceAllOccurrences(style, ",", " ");
};

function replaceAllOccurrences(
  input: string,
  searchChar: string,
  replacementChar: string
): string {
  // Use a regular expression with the global flag to replace all occurrences
  const regex = new RegExp(searchChar, "g");
  return input.replace(regex, replacementChar);
}
