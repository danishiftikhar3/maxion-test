export function replaceAll(str: string, find: string, replace: string) {
  const regex = new RegExp(find.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g");
  return str.replace(regex, replace);
}
