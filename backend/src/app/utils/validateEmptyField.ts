export default function validateEmptyField(field: string): boolean {
  if (!field || !field.trim()) {
    return false
  }

  return true
}
