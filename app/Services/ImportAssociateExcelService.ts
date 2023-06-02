import Excel from 'exceljs'
import {
  Errors,
  getOptionalNumberCellValue,
  getOptionalStringCellValue,
  getOptionalStringAndNumberField,
  getRequiredCpfCellValue,
  getRequiredEmailCellValue,
  getRequiredPasswordValue,
  getRequiredStringCellValue,
  getRequiredNumberCellValue,
  getRequiredBooleanCellValue,
  getOptionalAssociateNumber,
  getOptionalDateCellValue,
} from './SetAssociateExcelValuesService'

const ImportAssociateExcelService = async (pathName: string) => {
  Errors.length = 0
  const workbook = new Excel.Workbook()
  const content = await workbook.xlsx.readFile(pathName)
  const worksheet = content.worksheets[0]
  const rowStartIndex = 2
  const numberOfRows = worksheet.rowCount - 1
  const rows = worksheet.getRows(rowStartIndex, numberOfRows) ?? []
  const associates = rows.map((row) => {
    return {
      name: getRequiredStringCellValue(row, 1, 'Nome'),
      company: getOptionalStringCellValue(row, 2),
      cpf: getRequiredCpfCellValue(row, 3, 'Cpf'),
      associateNumber: getOptionalAssociateNumber(row, 4),
      birthDate: getOptionalDateCellValue(row, 5),
      genre: getOptionalStringCellValue(row, 6),
      email: getRequiredEmailCellValue(row, 7, 'E-mail'),
      password: getRequiredPasswordValue(row, 8, 'Senha'),
      zipCode: getOptionalNumberCellValue(row, 9),
      address: getOptionalStringAndNumberField(row, 10),
      addressNumber: getOptionalNumberCellValue(row, 11),
      complement: getOptionalStringAndNumberField(row, 12),
      city: getOptionalStringCellValue(row, 13),
      stateId: getOptionalStringCellValue(row, 14),
      phone: getOptionalNumberCellValue(row, 15),
      cellphone: getRequiredNumberCellValue(row, 16, 'Celular'),
      isVolunteerPartner: getRequiredBooleanCellValue(row, 17, 'É associado'),
      isFromTheCategory: getRequiredBooleanCellValue(row, 18, 'É da categoria'),
    }
  })

  const associatesMapped = associates.map((associate) => {
    return Object.keys(associate).reduce((newAssociate, key) => {
      if (associate[key] !== undefined) {
        newAssociate[key] = associate[key]
      }
      return newAssociate
    }, {})
  })

  if (Errors.length > 0) return Errors
  return associatesMapped
}

export default ImportAssociateExcelService
