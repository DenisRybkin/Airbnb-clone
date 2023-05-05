/**
 *
 * @returns `class1 class2`
 */
export function classMerge(
  ...classNames: (string | null | undefined)[]
): string {
  const space = ' ';
  return classNames.filter(Boolean).join(space);
}

/**
 * Join modifiers with origin class.
 * @returns `"origin-class origin-class--modifier"`
 */
export function classWithModifiers(
  originClass: string,
  ...modifiers: (string | number | false | null | undefined)[]
): string {
  modifiers = modifiers.filter(Boolean);
  if (!modifiers.length) return originClass;

  const space = ' ';
  const separator = '--';

  modifiers = modifiers.map(modifier => originClass + separator + modifier);
  return originClass + space + modifiers.join(space);
}

type Mods = Record<string, boolean | string | undefined>;

export function classNames(
  cls: string,
  mods: Mods = {},
  additional: Array<string | undefined> = []
): string {
  return [
    cls,
    ...additional.filter(Boolean),
    ...Object.entries(mods)
      .filter(([_, value]) => Boolean(value))
      .map(([className]) => className),
  ].join(' ');
}
