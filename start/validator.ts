import { validator } from '@ioc:Adonis/Core/Validator'
import { cpf as cpfValidator } from 'cpf-cnpj-validator'

validator.rule(
  'CPFIsValid',
  async (cpf, _, options) => {
    const { pointer, arrayExpressionPointer, errorReporter } = options

    if (!cpfValidator.isValid(cpf)) {
      return errorReporter.report(pointer, 'invalid', 'CPF Inválido.', arrayExpressionPointer)
    }
  },
  () => ({
    allowUndefineds: true,
    async: false,
  })
)
