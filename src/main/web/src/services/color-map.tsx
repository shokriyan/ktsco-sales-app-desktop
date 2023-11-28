export function ColorMap(key: string) {
  const colorMap: { [key: string]: string } = {
    primary: "blue",
    warning: "red",
    secondary: "orange",
    add: "blue",
    delete: "red",
    detail: "orange",
  };
  return colorMap[key];
}
