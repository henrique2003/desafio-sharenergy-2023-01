export function emptyField(field: string): string {
  return `${field} em branco`
}

export function invalidField(field: string): string {
  return `${field} inválido`
}

export function clientActionError(action: string): string {
  return `Erro ao ${action} cliente`
}

export function clientActionSuccess(action: string): string {
  return `Cliente ${action} com sucesso`
}

