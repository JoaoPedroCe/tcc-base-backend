import BankPaymentEmail from 'App/Models/BankPaymentEmail'
import DependentEmail from 'App/Models/DependentEmail'
import JoinSindalquimEmail from 'App/Models/JoinSindalquimEmail'
import JudiciaryEmail from 'App/Models/JudiciaryEmail'
import MedicalGuideEmail from 'App/Models/MedicalGuideEmail'

export type JudiciaryEmailType = {
  name: string
  email: string
  cellphone: string
  messageEmail: string
}

export type MedicalGuideEmailType = {
  cellphone: string
  email: string
  name: string
  clinicName: string
  doctorName: string
  specialty: string
  city: string
}

export type BankPaymentEmailType = {
  name: string
  cellphone: string
  email: string
  month: string
  value: string
  companyName: string
}

export type JoinSindalquimEmailType = {
  address: string
  admissionDate: string
  birthDate: string
  cellphone: string
  cep: string
  city: string
  companyName: string
  complement: string
  cpf: string
  district: string
  genre: string
  maritalStatus: string
  name: string
  number: string
  officeOrFunction: string
  phone: string
  rg: string
  uf: string
}

export type DependentEmailType = {
  name: string
  related: string
  birthDate: string
}

export async function saveBankPaymentEmail(bankPaymentEmail: BankPaymentEmailType) {
  await BankPaymentEmail.create(bankPaymentEmail)
}

export async function saveJudiciaryEmail(judiciaryEmail: JudiciaryEmailType) {
  await JudiciaryEmail.create(judiciaryEmail)
}

export async function saveMedicalGuideSolicitationEmail(medicalGuideEmail: MedicalGuideEmailType) {
  await MedicalGuideEmail.create(medicalGuideEmail)
}

export async function saveJoinSindalquimEmail(
  joinSindalquimEmail: JoinSindalquimEmailType,
  dependents: Array<DependentEmailType>
) {
  const { id } = await JoinSindalquimEmail.create(joinSindalquimEmail)

  if (dependents?.length)
    await DependentEmail.createMany(
      dependents.map(({ birthDate, name, related }) => ({
        birthDate: birthDate,
        name: name,
        kinship: related,
        emailId: id,
      }))
    )
}
