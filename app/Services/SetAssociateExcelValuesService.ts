import dayjs from 'dayjs'
import Excel from 'exceljs'
import validator from 'validator'
import { cpf as cpfValidator } from 'cpf-cnpj-validator'
import I18n from 'App/i18n/pt-BR'

type TypeErros = {
  error: string
  row: number
  field: string | number
  value?: string | number
  required?: boolean
}

export const Errors: Array<TypeErros> = []

export const getOptionalStringCellValue = (row: Excel.Row, cellIndex: number) => {
  const cell = row.getCell(cellIndex)
  const cellIsEmpty = !cell.value?.toString().trim()
  if (!cellIsEmpty && validator.isAlpha(cell.value?.toString() || '', 'pt-BR', { ignore: '-s' })) {
    return cell.value
  }
  return undefined
}

export const getOptionalStringAndNumberField = (row: Excel.Row, cellIndex: number) => {
  const cell = row.getCell(cellIndex)
  const cellIsEmpty = !cell.value?.toString().trim()
  if (
    !cellIsEmpty &&
    validator.isAlphanumeric(cell.value?.toString() || '', 'pt-BR', { ignore: '-s' })
  ) {
    return cell.value
  }
  return undefined
}

export const getRequiredNumberCellValue = (row: Excel.Row, cellIndex: number, field: string) => {
  const cell = row.getCell(cellIndex)
  const cellIsEmpty = !cell.value?.toString().trim()
  if (!cellIsEmpty && validator.isNumeric(cell.value?.toString() || '')) {
    return cell.value
  }
  return Errors.push({
    error: cellIsEmpty ? I18n.import.empty.field : I18n.import.invalid.numberField,
    row: row.number,
    field: field,
    value: cellIsEmpty ? I18n.import.empty.field : cell?.value?.toString(),
  })
}

export const getOptionalNumberCellValue = (row: Excel.Row, cellIndex: number) => {
  const cell = row.getCell(cellIndex)
  const cellIsEmpty = !cell.value?.toString().trim()
  if (!cellIsEmpty && validator.isNumeric(cell.value?.toString() || '')) {
    return cell.value
  }
  return undefined
}

export const getOptionalDateCellValue = (row: Excel.Row, cellIndex: number) => {
  const cell = row.getCell(cellIndex)
  const cellIsEmpty = !cell.value?.toString().trim()
  if (!cellIsEmpty && dayjs(cell.value?.toString()).isValid()) {
    return dayjs(cell.value?.toString()).format('YYYY-MM-DD')
  }
  return undefined
}

export const getDateCellValue = (row: Excel.Row, cellIndex: number, field: string) => {
  const cell = row.getCell(cellIndex)
  const cellIsEmpty = !cell.value?.toString().trim()
  if (!cellIsEmpty && dayjs(cell.value?.toString()).isValid()) {
    return dayjs(cell.value?.toString()).format('YYYY-MM-DD')
  }
  return Errors.push({
    error: cellIsEmpty ? I18n.import.empty.field : I18n.import.invalid.birthDate,
    row: row.number,
    field: field,
    value: cellIsEmpty ? I18n.import.empty.field : cell?.value?.toString(),
  })
}

export const getGenreCellValue = (row: Excel.Row, cellIndex: number, field: string) => {
  const cell = row.getCell(cellIndex)
  const cellIsEmpty = !cell.value?.toString().trim()
  if (!cellIsEmpty) {
    if (cell.value?.toString().search(/masculino|feminino/)) return cell.value
  }
  return Errors.push({
    error: cellIsEmpty ? I18n.import.empty.field : I18n.import.invalid.genreSelect,
    row: row.number,
    field: field,
    value: cellIsEmpty ? I18n.import.empty.field : cell?.value?.toString(),
  })
}

export const getRequiredStringCellValue = (row: Excel.Row, cellIndex: number, field: string) => {
  const cell = row.getCell(cellIndex)
  const cellIsEmpty = !cell.value?.toString().trim()
  if (!cellIsEmpty) {
    return cell.value
  }
  return Errors.push({
    error: cellIsEmpty ? I18n.import.empty.field : I18n.import.invalid.cpf,
    row: row.number,
    field: field,
    value: cellIsEmpty ? I18n.import.empty.field : cell?.value?.toString(),
  })
}

export const getRequiredCpfCellValue = (row: Excel.Row, cellIndex: number, field: string) => {
  const cell = row.getCell(cellIndex)
  const cellIsEmpty = !cell.value?.toString().trim()
  if (!cellIsEmpty && cpfValidator.isValid(cell.value?.toString() || '')) {
    return cell.value
  }
  return Errors.push({
    error: cellIsEmpty ? I18n.import.empty.field : I18n.import.invalid.cpf,
    row: row.number,
    field: field,
    value: cellIsEmpty ? I18n.import.empty.field : cell?.value?.toString(),
  })
}

export const getRequiredEmailCellValue = (row: Excel.Row, cellIndex: number, field: string) => {
  const cell = row.getCell(cellIndex)
  const cellIsEmpty = !cell.value?.toString().trim()
  if (!cellIsEmpty && validator.isEmail(cell.value?.toString() || '')) {
    return cell.value
  }
  return Errors.push({
    error: cellIsEmpty ? I18n.import.empty.field : I18n.import.invalid.email,
    row: row.number,
    field: field,
    value: cellIsEmpty ? I18n.import.empty.field : cell?.value?.toString(),
  })
}

export const getOptionalAssociateNumber = (row: Excel.Row, cellIndex: number) => {
  const cell = row.getCell(cellIndex)
  const cellIsEmpty = !cell.value?.toString().trim()
  if (!cellIsEmpty && validator.isNumeric(cell.value?.toString() || '')) {
    return cell.value
  }
  return undefined
}

export const getRequiredAssociateNumber = (row: Excel.Row, cellIndex: number, field: string) => {
  const cell = row.getCell(cellIndex)
  const cellIsEmpty = !cell.value?.toString().trim()
  if (!cellIsEmpty && validator.isNumeric(cell.value?.toString() || '')) {
    return cell.value
  }
  return Errors.push({
    error: cellIsEmpty ? I18n.import.empty.field : I18n.import.invalid.associateNumber,
    row: row.number,
    field: field,
    value: cellIsEmpty ? I18n.import.empty.field : cell?.value?.toString(),
  })
}

export const getRequiredPasswordValue = (row: Excel.Row, cellIndex: number, field: string) => {
  const cell = row.getCell(cellIndex)
  const cellValue = cell.value?.toString().trim() || ''
  const cellIsEmpty = !cell.value?.toString().trim()
  if (!cellIsEmpty && cellValue.length > 8) {
    return cell.value
  }
  return Errors.push({
    error: cellIsEmpty ? I18n.import.empty.field : I18n.import.shortPassword,
    row: row.number,
    field: field,
    value: cellIsEmpty ? I18n.import.empty.field : cell?.value?.toString(),
  })
}

export const getRequiredBooleanCellValue = (row: Excel.Row, cellIndex: number, field: string) => {
  const cell = row.getCell(cellIndex)
  const cellIsEmpty = !cell.value?.toString().trim()

  if (cell && cell.value) {
    return cell.value.toString().toLocaleLowerCase() === 'sim' ? true : false
  }

  return Errors.push({
    error: cellIsEmpty ? I18n.import.empty.field : I18n.import.shortPassword,
    row: row.number,
    field: field,
    value: cellIsEmpty ? I18n.import.empty.field : cell?.value?.toString(),
  })
}

export const getOptionalBooleanCellValue = (row: Excel.Row, cellIndex: number) => {
  const cell = row.getCell(cellIndex)

  if (cell.value?.toString().toLocaleLowerCase() === 'sim') return (cell.value = true)
  return undefined
}
