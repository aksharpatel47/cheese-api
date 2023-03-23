import { SafeParseReturnType, SafeParseSuccess } from 'zod';

export function IsSafeParseSuccess<T, K>(
  result: SafeParseReturnType<T, K>,
): result is SafeParseSuccess<K> {
  return result.success;
}
