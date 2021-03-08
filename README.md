# API NODEJS PARA ALUGUEL DE IMÓVEIS

Projeto de api utilizando o sequelize, idealizado inicialmente para ser consumida por um aplicativo mobile.

## Antes de Executar

Antes de rodar o projeto se atente as seguintes configurações:

Algumas blibliotecas podem estar com versões depreciadas dependendo da epoca que este projeto esta sendo executado.

Configure inicialmente a variaveis do banco de dados, lembrando que o sequelize aceita uma infinidade de banco de dados,porém foram testados neste projeto o MySQL e o Postgres, ao utilizar outros banco de dados além destes pode ser necessário algumas adaptações no codigo, consulte a [Documentação do sequelize](https://sequelize.org/) para mais informações.

As variaveis do banco de dados estão localizadas no arquivo **src/config/database.js**:

dialect: '', //mysql or postgres
host: '', 
username: '',
password: '',
database: '',

Além disso adicione também ao arquivo **src/config/auth.json** a palavra secreta que servira coo base para a autenticação JWT.

## Instalação e Execução

Instale todas as dependências necessárias através do yar ou npm.

```sh
npm i
```

```sh
yarn
```

Em seguide execute o projeto, ação que pode ser feita utilizando duas fomas:

Em ambiente de desenvolvimento:

```sh
yarn dev
```
Ou em ambiente de produção:
```sh
yarn start
```