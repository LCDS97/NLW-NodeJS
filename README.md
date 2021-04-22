# NLW-NodeJS
 Semana do Next Level Week da Rocket Seat da trilha do NodeJS

 ## Aula 1 -Liftoff
 
 ### Dia 1 - Fundamentos do NodeJS

Vamos desenvolver uma aplicação back-end de um chatbot utilizando WebSocket 

 Neste primeira etapa foi apresentado conceitos sobre API, NodeJS, WebSocket e HTTP

 Instalação de Bibliotecas, utilizando o Yarn foram instaladas as seguintes depedências no projeto

 Depedências utilizadas:
 - Express
 Depedências de desenvolvimento:
 - @types/express
 - ts-node-dev
 - typescript

Métodos que vai ser utilizada no projeto para criar as rotas:

- GET    =  Buscas
- POST   =  Criações
- PUT    =  Alterações
- DELETE =  Deletar
- PATCH  =  Alterar uma informação específica

No projeto iremos utilizar bastante o conceito de retorno os métodos em JSON

## Aula 2 - Maximum Speed

### Dia 2 - Iniciando com o Banco de Dados

Iremos trabalhar com banco de dados relacional e utilizar o Postgres.js

Framework a ser utilizado para o banco de dados:

- TypeORM
    Um framework ORM é um modelo/classe da nossa aplicação e do banco
    ex: Se você possui um objeto chamado ("Usuário") na sua aplicação e uma tabela chamada ("Usuário") no seu banco,
        o framework conecta a tabela com o objeto dentro da aplicação ou seja ele faz um mapeamento da aplicação com a estrutura do banco de dados

Depedências acrescentadas no projeto:

- TypeORM
- reflect-metadata (Vai auxiliar na parte dos anotations para utilizar no banco)
- sqlite3

Foi configurado uma pasta de Conexão na chamada Database e configuração do ORM com o arquivo "ormconfig.json"

O que é migrations?
    - É um gerenciamento ou histórico a tudo que foi criado/atualizad/removida em relação ao banco de dados
    - O banco consegue verificar através de um histórico e consegue manter os banco de dados atualizados
    - São históricos em relação ao banco de dados

Esquema do Banco de Dados
![image info](./project-databaseSchema.PNG)



