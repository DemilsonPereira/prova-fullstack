<h1><strong>Sistema de gestão de funcionários</strong></h1>

# **💻Sobre o projeto**

* Esta aplicação tem como objetivo criar um CRUD de funcionário.

## **🛠 Tecnologias**


* As seguintes ferramentas estão sendo utilizadas na construção do projeto:


- **[Typescript](https://www.typescriptlang.org/)**
- **[NodeJS](https://nodejs.org/en/)**
- **[Express](https://expressjs.com/pt-br/)**
- **[Docker](https://docs.docker.com/)**
- **[Docker-compose](https://docs.docker.com/compose/)**
- **[Postgres](https://www.postgresql.org/)**
- **[Typeorm](https://typeorm.io/#/)**

## **🚀 Como executar o aplicativo**

1. Primeiro você precisa ter o docker e docker-compose instalados para executar a aplicação

- **[Como instalar o Docker](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-20-04-pt)**
- **[Como instalar o Docker-compose](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-20-04-pt)**

* Para executar o projeto use o gerenciador de pacote: YARN
    <br />
    <br />
  

* Este comando instala as bibliotecas necessárias para executar a aplicação.
    
    * yarn install  
    <br />
    
   

* O segundo comando cria uma imagem do banco de dados PostgreSQL e inicia a aplicação

    * docker-compose up -d
    * Apó rodar o camando acima a aplicação irá rodar em modo background
    
    <br />

* O terceiro comando cria as migration e os seeds

    * Criar as Migrations
    * yarn typeorm-run
    
    ********************************

    * Seed para criar o usuário admin para login do front-end
    * yarn seed:admin

    ********************************
    
    * Seed para criar os cargos
    * yarn seed:position

    ********************************
    
    * Seed para criar os setores
    * yarn seed:sector
  
    <br />
    <br />


* Com a aplicação em execução você pode consumir as seguintes rotas:  
    <br />

    * Rotas de Autenticação

    <strong><font color="green">**router.post('api/sessions')**</font></strong>  <br />       - 
    Rota Login

    <br />

    * Rotas de Funcionários

    <strong><font color="green">**router.post('api/users')**</font></strong>  <br />       - 
    Rota para criar um funcionário

    <strong><font color="green">**router.get('api/users')**</font></strong> <br />         - 
    Rota para listar todos funcionários

    <strong><font color="green">**router.put('api/user/:id')**</font></strong>  <br />   - 
    Rota para atualizar os dados de um funcionário

    <strong><font color="green">**router.delete('api/user/:id')**</font></strong> <br /> - 
    Rota para remove um funcionário
    <br />

    <strong><font color="green">**router.delete('api/users/position/:id')**</font></strong> <br /> - 
    Rota para listar todos os funcionários por cargo - passar o ID do cargo
    <br />

    <strong><font color="green">**router.delete('api/users/sector/:id')**</font></strong> <br /> - 
    Rota para listar todos os funcionários por setor - passar o ID do setor
    <br />
    <br />

    * Rotas de Cargos

    <strong><font color="green">**router.get('api/positions')**</font></strong> <br /> - 
    Rota para listar todos os cargos
    <br />

    <strong><font color="green">**router.post('api/positions')**</font></strong> <br /> - 
    Rota para criar um cargo
    <br />
    <br />

    * Rotas de Setores

    <strong><font color="green">**router.get('api/sectors')**</font></strong> <br /> - 
    Rota para listar todos os setores
    <br />

    <strong><font color="green">**router.post('api/sectors')**</font></strong> <br /> - 
    Rota para criar um setor
    <br />


## **🚀 Testar a aplicação pelo Insomnia**

* Para testar as rotas, você pode baixar Insomina que faz os testes de API Clients

    - **[Insomina](https://insomnia.rest/download)**
