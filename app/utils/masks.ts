export const cpfMask = '000.000.000-00'
export const cepMask = '00000-000'
export const phoneMask = '(00) 0000-0000'
export const cellphoneMask = '(00) 00000-0000'

export function maskString(value: string, pattern: string): string {
  if (!value || !pattern) return '---'
  let i = 0
  return pattern.replace(/0/g, () => value[i++]).replace(/undefined/g, '')
}
