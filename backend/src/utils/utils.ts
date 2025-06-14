function safeParse<T>(value: string): T {
  try {
    return JSON.parse(value) as T;
  } catch {
    return [] as T;
  }
}
export default safeParse;
