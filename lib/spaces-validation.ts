export type ValidationResult =
  | { ok: true; name: string; price: number }
  | { ok: false; error: string };

const MIN_NAME_LENGTH = 2;
const MAX_NAME_LENGTH = 50;
const MIN_PRICE = 1000;
const MAX_PRICE = 50_000_000;

export function validateSpaceItemInput(
  name: string,
  priceInput: string
): ValidationResult {
  const trimmedName = name.trim();

  if (!trimmedName) {
    return { ok: false, error: 'Item name is required.' };
  }

  if (trimmedName.length < MIN_NAME_LENGTH) {
    return {
      ok: false,
      error: `Name must be at least ${MIN_NAME_LENGTH} characters.`,
    };
  }

  if (trimmedName.length > MAX_NAME_LENGTH) {
    return {
      ok: false,
      error: `Name must be ${MAX_NAME_LENGTH} characters or fewer.`,
    };
  }

  const price = Number(priceInput.replace(/[^\d]/g, ''));

  if (!priceInput.trim() || Number.isNaN(price)) {
    return { ok: false, error: 'Enter a valid monthly price.' };
  }

  if (price < MIN_PRICE) {
    return {
      ok: false,
      error: `Price must be at least Rp ${MIN_PRICE.toLocaleString('id-ID')}.`,
    };
  }

  if (price > MAX_PRICE) {
    return {
      ok: false,
      error: `Price must be under Rp ${MAX_PRICE.toLocaleString('id-ID')}.`,
    };
  }

  return { ok: true, name: trimmedName, price };
}
