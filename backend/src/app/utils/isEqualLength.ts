export default function isEqualLength(item: number | string, length: number): boolean {
  if (item.toString().trim().length !== length) {
    return false
  }

  return true
}
