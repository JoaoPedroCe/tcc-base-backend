export default {
  auth: {
    login: {
      verifiedEmail: 'Você ainda não confirmou seu e-mail.',
    },
    forgot: {
      invalidCode: 'Código inválido',
      emailNotfound: 'Não foi possível encontrar um usuário ativo com esse endereço de email',
      cpfNotFound: 'Não foi possível encontrar um	usuário ativo com esse cpf',
      expiredTime: 'Aguarde alguns minutos para receber sua mensagem antes de tentar novamente.',
      success: (email: string) =>
        `Você receberá uma mensagem no endereço ${email} para recuperação de senha.`,
    },
    reset: {
      expiredTime: 'Tempo de 2 Horas para recuperação expirada, tente novamente.',
      success: 'Senha alterada com sucesso!',
      expiredCodeTime: 'Tempo de 10 minutos para recuperação expirado, tente novamente.',
    },
    activate: {
      success: 'sucesso!',
    },
  },
  user: {
    role: {
      withoutPermission: 'Cargo insuficiente para realizar essa ação',
      update: {
        success: 'Cargo atualizado!',
      },
    },
    delete: 'Não é possível excluir seu próprio usuário',
  },
  chapter: {
    source: {
      store: {
        exist: 'já existe um configuração para esse livro',
      },
      update: {
        success: 'Fonte atualizada!',
      },
    },
  },
  import: {
    invalid: {
      stringField: 'Esse campo permite somente letras',
      stringAndNumericField: 'Esse campo permite somente letras e números',
      numberField: 'Esse campo permite somente números',
      cpf: 'Cpf inválido',
      email: 'E-mail inválido',
      associateNumber: 'Número de associado inválido (somente números)',
      genreSelect: 'É permitido somente "masculino" ou "feminino"',
      birthDate: 'Informe uma data de nascimento correta (DD/MM/YYYY)',
    },
    empty: {
      field: 'Campo vazio',
      cpfField: 'Campo CPF vazio',
      requiredField: 'Campo obrigatório vazio',
      emailField: 'Campo E-mail vazio',
      associateNumberField: 'Campo Número de Associado vazio',
      passwordField: 'Campo senha vazio',
    },
    shortPassword: 'Senha muito curta',
    sucess: {
      importantion: 'Importação concluida com sucesso',
    },
  },
  email: {
    success: 'Dados enviados com sucesso',
    failed: 'Não foi possível salvar os dados no momento. Tente novamente mais tarde!',
  },
}
