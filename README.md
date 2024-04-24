<h1 align="center">Integrador Back</h1>

<p align="center">
  <img alt="Principal linguagem do projeto" src="https://img.shields.io/github/languages/top/karinadarc/integrador-back?color=56BEB8">

  <img alt="Quantidade de linguagens utilizadas" src="https://img.shields.io/github/languages/count/karinadarc/integrador-back?color=56BEB8">

  <img alt="Tamanho do repositório" src="https://img.shields.io/github/repo-size/karinadarc/integrador-back?color=56BEB8">

  <img alt="Licença" src="https://img.shields.io/github/license/karinadarc/integrador-back?color=56BEB8">

</p>

<p align="center">
  <a href="#dart-sobre">Sobre</a> &#xa0; | &#xa0;
  <a href="#sparkles-funcionalidades">Funcionalidades</a> &#xa0; | &#xa0;
  <a href="#rocket-tecnologias">Tecnologias</a> &#xa0; | &#xa0;
  <a href="#white_check_mark-pré-requisitos">Pré requisitos</a> &#xa0; | &#xa0;
  <a href="#checkered_flag-começando">Começando</a> &#xa0; | &#xa0;
  <a href="#memo-licença">Licença</a> &#xa0; | &#xa0;
  <a href="https://github.com/karinadarc" target="_blank">Autor</a>
</p>

<br>

## :dart: Sobre

O Labook é uma rede social com o objetivo de promover a conexão e interação entre pessoas.

## :sparkles: Funcionalidades

:heavy_check_mark: Cadastro de Usuários;\
:heavy_check_mark: Autenticação;\
:heavy_check_mark: Cadastro, Lista, Edição e Remoção de Posts;\
:heavy_check_mark: Função para curtir e descurtir posts;\
:heavy_check_mark: Deploy no render;\

### Lista de requisitos

- [Documentação Postman de todos os endpoints](https://documenter.getpostman.com/view/28315573/2sA35HXgjA)
- [Render Enpoint Backend](https://integrador-back-uk8c.onrender.com)

- Testes

  - [x] Cobertura de testes (verificar pull requests)

- Endpoints

  - [x] signup
  - [x] login
  - [x] create post
  - [x] get posts
  - [x] edit post
  - [x] delete post
  - [x] add comment
  - [x] like / dislike post
  - [x] like / dislike comment

- Autenticação e autorização

  - [x] identificação UUID
  - [x] senhas hasheadas com Bcrypt
  - [x] tokens JWT

- Código
  - [x] POO
  - [x] Arquitetura em camadas
  - [x] Roteadores no Express

## :rocket: Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

- [Node.js](https://nodejs.org/en/)
- [Expres JS](https://expressjs.com/pt-br/)
- [TypeScript](https://www.typescriptlang.org/)

- [Knex](https://knexjs.org/)
- [Bcrypt.js](https://github.com/kelektiv/node.bcrypt.js#readme)
- [Sqlite](https://www.sqlite.org/index.html)

## :white_check_mark: Pré requisitos

Antes de começar :checkered_flag:, você precisa ter o [Git](https://git-scm.com) e o [Node](https://nodejs.org/en/) instalados em sua maquina.

## :checkered_flag: Começando

```bash
# Clone este repositório
$ git clone https://github.com/karinadarc/projeto-labook-backend

# Entre na pasta
$ cd projeto-labook-backend

# faça uma copia do arquivo .env.example e defina as variáveis
$ cp .env.example .env

# Instale as dependências
$ npm install

# Para iniciar o projeto
$ npm run dev

# O app vai inicializar em <http://localhost:{PORT}>
```

## :memo: Licença

Este projeto está sob licença MIT. Veja o arquivo [LICENSE](LICENSE.md) para mais detalhes.

Feito com :heart: por <a href="https://github.com/karinadarc" target="_blank">Karina D&#39;arc Piere</a>

&#xa0;

<a href="#top">Voltar para o topo</a>
