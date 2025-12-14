# Gerenciador Financeiro 

![Badge em Desenvolvimento](https://img.shields.io/badge/Status-Em%20Desenvolvimento-yellow)
![Badge Node.js](https://img.shields.io/badge/Backend-Node.js-green)
![Badge FlutterFlow](https://img.shields.io/badge/Frontend-FlutterFlow-blue)
![Badge MongoDB](https://img.shields.io/badge/Database-MongoDB-forestgreen)

> Uma solução completa para controle de despesas e receitas, com foco em simplicidade e visualização de dados.

---

## Sobre o Projeto

Como alguém que queria gerir melhor o próprio dinheiro, pensei nessa solução quando nos foi apresentado esse projeto final da Lions. Sendo assim, o **Gerenciador Financeiro** é um aplicativo de gestão financeira desenvolvido para ajudar usuários a organizarem sua vida econômica. O objetivo principal deste projeto foi integrar uma interface ágil e moderna (criada com **FlutterFlow**) a uma API robusta e escalável (**Node.js**) com armazenamento flexível de dados (**MongoDB**). 

### Principais Funcionalidades

*  **Autenticação de Usuário:** Login e cadastro seguros.
*  **CRUD de Transações:** Adicionar, editar, listar e remover receitas e despesas.
*  **Categorização:** Organização de gastos por categorias (Alimentação, Transporte, Lazer, etc.).
*  **Dashboard Visual:** Gráficos interativos para análise de gastos mensais.
*  **Saldo em Tempo Real:** Atualização instantânea do saldo total.

---

##  Tecnologias Utilizadas

Este projeto foi construído utilizando a seguinte arquitetura:

### Frontend
* **[FlutterFlow](https://flutterflow.io/):** Utilizado para o desenvolvimento acelerado da interface (UI) e lógica do cliente.

### Backend (API)
* **[Node.js](https://nodejs.org/):** Ambiente de execução JavaScript.
* **[Express](https://expressjs.com/):** Framework para construção da API REST.
* **[Mongoose](https://mongoosejs.com/):** ODM (Object Data Modeling) para modelagem dos dados.

### Banco de Dados
* **[MongoDB](https://www.mongodb.com/):** Banco de dados NoSQL orientado a documentos.

---

## Arquitetura e Integração

A comunicação entre o frontend e o backend segue o padrão **RESTful**.

1.  **FlutterFlow** envia requisições HTTP (GET, POST, PUT, DELETE) para os endpoints da API.
2.  **Node.js** recebe as requisições, processa as regras de negócio e valida os dados.
3.  **MongoDB** armazena e retorna os documentos financeiros solicitados.

```mermaid
graph LR
A[App FlutterFlow] -- JSON / HTTP --> B(API Node.js)
B -- Query / Mongoose --> C[(MongoDB Atlas)]
C -- Dados --> B
B -- Resposta JSON --> A
