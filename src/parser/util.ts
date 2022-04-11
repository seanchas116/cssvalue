/**
 * Like Object.assign, but ignores null/undefined values and keys not in target object
 * @param target
 * @param partial
 */
export function assignPartial<T>(target: T, partial: Partial<T>): void {
  for (const key of Object.keys(partial)) {
    const value = (partial as never)[key];
    if (value != null && key in target) {
      (target as never)[key] = value;
    }
  }
}

export function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^=!:${}()|[\]/\\]/g, "\\$&");
}
