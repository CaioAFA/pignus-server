# Pignus Server
> Servidor do sistema Pignus que realiza o GET e POST das imagens a serem analisadas.

## Instalação

### Instalação do Banco de Dados

Criar um Banco MySQL "pignus", copiar e executar o script "database\createDatabase.sql"

### Editar arquivos da pasta config

*dbConfig.js.sample*:
Copiar e colar com o nome "dbConfig.js" e inserir as credenciais do seu Banco de Dados.

*aiServerUrl.js.sample*:
Copiar e colar com o nome "aiServerUrl.js" e inserir a URL do Microsserviço da IA.

OS X & Linux:

```sh
npm install
npm start
```

Distribuído sob a licença MIT. Veja `LICENSE` para mais informações.
