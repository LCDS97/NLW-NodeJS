# NLW-NodeJS
 Semana do Next Level Week da Rocket Seat da trilha do NodeJS

 ## Aula 1 -Liftoff
 Projeto da Criação do Back-end de Chat

 Assuntos abordados na aula:
    - O que é o projeto?
    - O que é NodeJS?
    - O que é uma API?
    - Uso do TypeScript
    - Criação do projeto
        - Conhecer tipos de métodos
        - Criação da primeira rota
        - Rota POST
        - Configuração do visualizador de método Post (Insomnia ou Postman)


 
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

Assuntos abordados na aula:

 - Formas de trabalhar com Banco de Dados
 - TypeORM
 - O que são migrations
 - Criação de migrations
 - Criação de entidades
 - Criação de repositórios
 - Criação de rota de configurações

### Dia 2 - Iniciando com o Banco de Dados

Iremos trabalhar com banco de dados relacional e utilizar o Postgres.js

Framework a ser utilizado para o banco de dados:

Documentação do TypeORM: https://typeorm.io/#/

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

Migrartions:

Para criar uma migration utiliza-se o comando (yarn/npm) typeorm migration:create -n (nome da migration)

A estrutura do migration tem duas funções async (up e down)

Estrutura UP:

    public async down(queryRunner: QueryRunner): Promise<void> {
        /// Tabelas a serem executadas aqui
    }


Up - Vai rodar tudo que tiver dentro do método Up, toda vez que para criar a migration, necessita ser executado no Up
     Comando para executar o método de migration - yarn/npm typeorm migration:run


Estrutura Down:

    public async down(queryRunner: QueryRunner): Promise<void> {
        /// Tabelas a serem excluidas(revertidas) aqui



    }

Down - Deu alguma coisa errada ou precisa reverter algo, colocar toda a estrutura dentro do down
     Comando para executar o revert yarn/npm migration:revert

Para criar uma tabela utiliza dentro do método up

        await queryRunner.createTable({
            name: (nome da tabela),
            columns: [
                {
                    name: "nome da coluna",
                    type: "tipo de dado",
                    isPrimary: true or false "Se é a Primary Key"
                    default: "valor padrão"
                }
            ]
        })


Esses valores são criado dentro do UP, caso necessita remover a tabela, somente colocar dentro do método down:

    await queryRunner.dropTable("nome da tabela")



UUID - Identificador Único

Utilizaremos o beekeeper para facilitar a manipulação do banco de dados

Foi criado uma pasta entities para colocar as entidades do banco

Para conseguir utilizar o ts nas entities é necessário alterar descomentar duas config no tsconfig.json
    "experimentalDecorators": true,              /* Enables experimental support for ES7 decorators. */
    "emitDecoratorMetadata": true, 

Após isso você consegue utilizar os relacionamentos

Importo as relações do typeorm:

import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryColumn} from "typeorm"

@Entity("De qual tabela é entidade")
class NomedaEntidade {
    // Definindo primary Key da Tabela
    @PrimaryColumn()
    id: string;

    @Column()
    nomeDaColuna: tipo da coluna;

    @UpdateDateColumn // @CreateDateColumn
    updated_at or created_at: Date; // Definir sempre eles como Date
}


Para definir os id poderiamos deixar a responsabilidade pro banco de dados, mas não temos certeza de como sera o comportamento dos bancos, definiremos que o projeto ira definir o uuid para poder nós não precisamos preocupar com qual banco iremos utilizar no projeto

Adicionaremos a biblioteca UUID ao projeto

Depedência a ser acrescentada:
- uuid
- @types/uuid - D
Ele também possui tipagems de desenvolvimento também ira ser acrescentada ao projeto

a V4 do uuid utiliza-se números aleatórios para criar id e para importa os mesmos utiliza-se:

import { v4 as uuid } from "uuid"


Foi criada uma classe de construtor para verificar se o Id da Setting está preenchido, pois quando trabalhamos com atualização, ele irá simplesmente verificar e manter o id ao invés de sempre gerar um id diferente toda vez que for atualizado

Uma config importante para definir no ormconfig.json é mapear suas entidades

Quando falamos de repositório em programação é uma estrutura de classe que é responsável por toda manipulação de dados da aplicação

Os repositórios são responsáveis pela comunicação entre a nossa entidade e nossa tabela do banco de dados

No repository utilizaremos uma classe estendida o Repository de dentro do ORM, e essa classe possui ja varios padrões configurado, como Create,Save,Select,etc...


import { Repository } from "typeorm";

@EntityRepository(Setting)
class SettingsRepository extends Repository<Passar o tipo de entidade aqui>{

}

Criado também um arquivo de router.ts na raiz do src para definir as rotas da aplicação importando o Router do Express

Quando trabalhamos com requisições trabalhamos com 3 paramêtros

Routes Params = Paramêtros de rotas
    ex: http://localhost:3333/settings/1
Trata-se de um paramêtro de rota onde ele é definido seu paramêtro pela rota(GET)

Query Params = Filtros e Buscas
    ex:http://localhost:3333/settings/1?search=qualquer&coisa
Trata-se de paramêtros que vem depois da rota, onde possui "?", onde é baseado em chave e valor, espaço são separados por "&", são utilizados para filtros e buscas

Body Params = Inserir objetos dentro das requisições, sempre por meio de JSON

No express é preciso definir para aceitar requisições através de JSON's


app.use(express.json())



OBS: Na hora de salvar os dados de data, ele vem com 3 horas a mais do horário do Brasil, é necessário ajustar o GMT, por padrão ele utiliza o padrão UTC

Para separar melhor o projeto iremos criar o controller

Controller é uma classe de comunicação entre a rota e o repositório

## Aula 3 - In Orbit

Assuntos abordados na aula:
    - Separar a regra de negócio de settings
    - Criar estrutura de user
    - Criar estrutura de connections
        - Relacionamento One to One
    - Criar estrutura de messages
        - Relacionamento Many to One

### Dia 3 - Continuando a nossa aplicação

Retirando do controller as funções de settings para poder usar-lo como sua real função onde vai ser o comunicador entre eles
Foi criado o SettingsServices para as regras de negócio da aplicação, todas as verificações da regra de negócio

Criado alguns métodos de comparação e restrição como:
- Verificação de Usuário
- Criando usuário e verificando se tem chat disponivel

Nos SettingsController foi criado uma tratativa de erro para verificar se usuário ja existe em um try() e catch()

Foi criado uma migration para cadastrar tabela CreateUsers, é importante utilizar o ID como Primary Key, pois ele vai ser usada como tabela de relacionamento

Preciso fixar conhecimento meu em relação a estrutura do src, e entender de fato o conceito de:
- Controller
- entities
- repositories
- services
- database
routes
server

Principalmente as 5 bases de organização de arquivos

Ja foi criado a estrutura de users com a verificação de usuário

Iremos fazer a tabela de mensagem com uma nova migration, essa tabela vai trabalhar com relacionamentos

Para definir foreignKeys no migrations utiliza se o método de foreignKeys: e definindo dentro de arrays após as colunas serem feitas
```
foreignKeys: [
                {
                    name: "Nome da Foreign Key",
                    referencedTableName: "Tabela que vai ser a referencia",
                    referencedColumnNames: ["A coluna a ser referenciada"],
                    columnNames:["O nome da coluna que esta sendo referencia"]
                    OnDelete:"O que vai fazer quando a referencia for excluida"
                    OnDelete:"O que vai fazer quando a referencia for atualizada"
                }
            ]

```
Ao criar uma coluna com relacionamento para fim de entender melhor o schema do banco podemos colocar dentro da tabela o mesmo para definir
e atribui com as seguintes caracteres

ex:

```
    @JoinColumn({ name: "user_id" })
    @ManyToOne(() => User)
    user: User;

    @Column()
    user_id: string;

```
Quando definir interfaces para os services utilizamos a nomeclatura de "I" para melhor identificação das interfaces

Quase algum parametro seja opcional você pode definir na interface com o "?" antes dos ":".
ex:

interface IMessageCreate {
    admin_id?: string;
    text: string;
    user_id: string;
}

Foi criado uma rota get de ShowByUser para recuperar os id de quem mandou a mensagem tanto em relação ao adm ou ao user

Caso queira queira puxar as mensagens com outras propriedades do usuário na hora de declarar a lista pode ser utilizado o relations para puxar demais informações, basta colocar o mesmo nome que foi dado na "entities"
ex:

```
    async listByUser(user_id: string){
        const messagesRepository = getCustomRepository(MessagesRepository)
        
        const list = await messagesRepository.find({
            where: {user_id},
            relations: ["user"],
        });

        return list;
    }

```

Para evitar a redundancia de código, iremos utilizar para os métodos chamar um atributo do getCustomRepository

Dentro da classe, definimos como private significa que o atributo que vai criar só vai estar disponivel pela classe que esta criando ele

## Aula 4 - Landing

- Assuntos abordado na aula:
    - O que é Websocket
    - Instalando depedendicas da aplicação
    - Configurando websocket
    - Criar estrutura de connections
    - Configurando atendente HTML
    - Recap
    
### Dia 4 - Continuando a nossa aplicação

Rever video dps para entender o conceito do webSocket

Iremos utilizar o Socket.io para o WebSocket, com suas tipagens e para o client e o ejs para conversão do html

yarn add socket.io
yarn add socket.io-client
yarn add @types/socket.io -D
yarn add ejs


Estamos criando no server.ts os protocolos http e protocolo ws, necessário importar o createServer do próprio node e Server e Socket do socket.io

Depois duas constantes do http e do io para criar no servidor

No projeto vai ter dois arquivos de webSocket, um somente para o cliente e um para o admin/atendente

Vamos separar em dois arquivos para melhor estrutura do código mas vai ser na mesmo WebSocket de servidor (io que é o http no server.ts)

Importamos a pasta public para trabalhar a aplicação encima do front-end, utilizamos o view engine do próprio nodejs para identificar páginas e visualizar

Para construir o caminho de um arquivo utilizamos um módulo do próprio node:

import path from "path";

Configuração do html para o node fica da seguinte forma:



```

app.use(express.static(path.join(__dirname,"..","public"))); // Informando que é a pasta public aonde se encontra
app.set("views", path.join(__dirname,"..", "public")); // Informando que a views se encontra também na public
app.engine("html", require("ejs").renderFile); // Convertendo do ejs para html pois o padrão de leitura do node é ejs
app.set("view engine", "html"); // renderezando view engine para configurar o html


```

Depois é criada uma rota GET para renderizar a página com o response.render

Foi separado os arquivos de do server.ts para um novo arquivo http.ts, para os dois websocket conseguir utilizar o protócolo do io

Vão ser criados eventos de client e admin é necessário definir nomes diferentes os evento para poder diferenciar no futuro
Toda vez que for criar para cliente vai ser adicionado um prefixo de cliente e outro para adm

Foi criado o socket on connect pegando os parametros que o cliente ira enviar

Criado no js função para trocar os chats após enviar mensagem e definido nos params do email e text, agora iremos armazenar essa informações, o fluxo ira sera da seguinte forma

Agora iremos criar a tabela de conexão para salvar no socket io para gerenciar as conexões, armazenando o id do usuário e o id do socket, quando o cliente estiver em atendimento vai disponibilizar uma tela para visualizar todos os clientes que estão com admin e para ele enviar uma mensagem ao cliente ele vai necessitar do socket id do mesmo

Criando o migration: yarn typeorm migration:create -n CreateConnection

Iremos utilizar outro método para criar a chave estrangeira
ex:

```
        await queryRunner.createForeignKey(
            "connections",
            new TableForeignKey({
                name: "FKConnectionsUser",
                referencedTableName: "users",
                referencedColumnNames: ["id"],
                columnNames:["user_id"],
                onDelete: "SET NULL",
                onUpdate: "SET NULL",
            })
        )

```
Foi criado a estrutura do connections no controllers, entities, repositories e services e integrado ao client.ts para ter acesso as funções de create

Criando métodos de mensagem, para poder um usuário se conecta e sobrescever sua conexão e não precisar criar outras varias
foi definido um método para sobrescever seu socket_id existente, quando é o primeiro acesso também foi definido de cadastrar seu e-mail, caso o mesmo e-mail ja foi acessado/cadastrado é sobrespo o socket_id do mesmo

Agora estamos salvando a mensagem utilizando os métodos do MessagesService, definindo primeiro o user.id como nulo e depois verificando se o user.id esta preenchido para salvar a mensagem, através 

OBS: Não verifiquei de colocar a interface do Iparams no client.ts pois quando configuro aparece o seguinte erro:
ERROR EntityMetadataNotFound: No metada for "Connection" was found, as vezes não aparece somente quando fica por um tempo com o servidor

Colocando um método para listar as configurações do usuário no settings pesquisando pelo seu username(email), e devolvendo suas configurações de conta, foi habilitado no html para ele receber através de paramêtro e criado no settingsController a função para requisitar dos parametros e devolver suas configurações em JSON
Foi criado uma rota em routes.ts recebendo o parametro do username e chamando a função findByUsername

Foi criada a rota de update de Chat por uma rota adicionado e atualizado pelo seu parametro
