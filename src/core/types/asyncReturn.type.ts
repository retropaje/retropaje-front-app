export type AsyncReturnType<T = unknown> = Promise<{ data: T | null; error: unknown | null }>
