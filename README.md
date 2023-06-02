# Sindalquim API

---

# 🚀 Rodando o Projeto

1. Execute o comando `docker compose -f "docker-compose.yml" up -d --build`. Agora você tem uma instancia do [mariadb] rodando na porta 3306 com o usuário root e senha root mais detalhes no arquivo [~/docker-compose.yml].
2. Utilizando a v14 do Node.js, entre no diretório do projeto e execute o comando,`yarn install`
3. Adicione o arquivo [.env] ao projeto, faça uma copia do arquivo [.env.example] e renomeie para [.env] caso você não tenha feito nenhuma configuração personalizada não precisa alterar o valor de nenhuma variável.
4. SMTP: para enviar email é necessário atualizar as variáveis do SMTP.
5. Execute o comando de instalação `node ace app:install`.
6. Por fim execute o comando `yarn dev`, para iniciar a apliacação.

A aplicação será aberta em [http://localhost:5333](http://localhost:5333).
---

# 💻 Desenvolvimento

Para trabalhar em uma nova versão do projeto, siga os passos (para exemplo, simulo a v1.0.0):

1. Mude para a branch de desenvolvimento: git checkout develop.
2. Pegue as alterações que estão no repositório: git pull origin develop.
3. Crie uma branch com a versão que irá trabalhar, ex: git branch v1.0.0.
4. Faça o merge da branch develop com a sua: git merge develop.
5. Resolva os conflitos, se existirem.
6. Envie a branch criada localmente para o repositório: git push origin v1.0.0.
7. Abra o resposiório no GitLab, crie uma Pull Request da branch v1.0.0 para a branch develop.
8. Agora é só aguardar o Code Review e aprovação da PR.

---

# 🔨 Construído com

- [AdonisJs](https://adonisjs.com/)
