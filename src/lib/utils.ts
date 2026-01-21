/**
 * Generate a UUID - uses crypto.randomUUID if available, otherwise falls back to a custom implementation
 */
export function generateUUID(): string {
  // Use crypto.randomUUID if available (requires secure context)
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    try {
      return crypto.randomUUID();
    } catch (e) {
      // Fall through to fallback if crypto.randomUUID fails
    }
  }

  // Fallback UUID v4 implementation
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
