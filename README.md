# API de Gestão de Igreja

Este projeto é uma **API RESTful** desenvolvida para auxiliar na gestão de membros e controle financeiro de uma igreja. Ele oferece um conjunto de endpoints para realizar operações CRUD (Criar, Ler, Atualizar, Deletar) sobre dados de membros e lançamentos financeiros, utilizando um banco de dados **MongoDB**.

## Tecnologias Utilizadas

O projeto foi construído com as seguintes tecnologias:

*   **Node.js**: Ambiente de execução JavaScript server-side.
*   **Express.js**: Framework web para Node.js, utilizado para construir a API.
*   **Mongoose**: Biblioteca de modelagem de objetos para MongoDB, facilitando a interação com o banco de dados.
*   **MongoDB**: Banco de dados NoSQL, utilizado para armazenar os dados da aplicação.
*   **CORS**: Middleware para Express.js, habilitando o Cross-Origin Resource Sharing.
*   **Nodemon**: Ferramenta que ajuda no desenvolvimento de aplicações Node.js reiniciando automaticamente o servidor a cada alteração de arquivo.

## Funcionalidades

A API oferece as seguintes funcionalidades principais:

### Gestão de Membros

*   **`GET /membros`**: Lista todos os membros cadastrados.
*   **`GET /membros/:id`**: Busca um membro específico pelo ID.
*   **`GET /membros/ok`**: Endpoint de verificação de status da API (retorna "Api ok").
*   **`POST /membros`**: Adiciona um novo membro.
*   **`PUT /membros/:id`**: Atualiza os dados de um membro existente.
*   **`DELETE /membros/:id`**: Remove um membro pelo ID.

### Gestão Financeira

*   **`GET /finance`**: Lista todos os lançamentos financeiros.
*   **`POST /finance`**: Adiciona um novo lançamento financeiro.
*   **`PUT /finance/:id`**: Atualiza os dados de um lançamento financeiro existente.
*   **`DELETE /finance/:id`**: Remove um lançamento financeiro pelo ID.

## Pré-requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

*   **Node.js**: Versão 14.x ou superior. Você pode baixá-lo em [nodejs.org](https://nodejs.org/).
*   **npm** (Node Package Manager) ou **Yarn**: Gerenciadores de pacotes que vêm com o Node.js.
*   **MongoDB**: Uma instância do MongoDB (local ou via MongoDB Atlas) para o armazenamento dos dados. A API está configurada para usar o MongoDB Atlas.
*   **Git**: Para clonar o repositório.

## Instalação e Execução

Siga os passos abaixo para configurar e rodar o projeto localmente:

1.  **Clone o repositório**:

    ```bash
    git clone https://github.com/ThiagoClementino/API_GESTAO_IGREJA.git
    cd API_GESTAO_IGREJA
    ```

2.  **Instale as dependências**:

    ```bash
    npm install
    # ou
    yarn install
    ```

3.  **Configuração do Banco de Dados (MongoDB Atlas)**:

    O projeto utiliza uma string de conexão direta no arquivo `src/database/database.js`. Para ambientes de produção, é **altamente recomendável** utilizar variáveis de ambiente para armazenar credenciais sensíveis. Para este projeto, a conexão está definida como:

        Certifique-se de que esta URL de conexão esteja acessível ou substitua-a pela sua própria URL de conexão do MongoDB Atlas, caso necessário.

4.  **Execute a aplicação**:

    Para iniciar o servidor em modo de desenvolvimento (com `nodemon` para recarga automática):

    ```bash
    npm run dev
    ```

    Para iniciar a aplicação em modo de produção:

    ```bash
    npm start
    ```

    A API estará disponível em `http://localhost:3060`.

## Como Usar

A API expõe endpoints RESTful para interagir com os recursos de membros e finanças. Você pode usar ferramentas como `curl`, Postman, Insomnia ou qualquer cliente HTTP para testar os endpoints.

### Exemplo de Endpoints (com `curl`)

#### Membros

*   **Listar todos os membros**:

    ```bash
    curl -X GET http://localhost:3060/membros
    ```

*   **Adicionar um novo membro**:

    ```bash
    curl -X POST -H "Content-Type: application/json" -d \'{
        "name": "João Silva",
        "mothersname": "Maria Silva",
        "fathersname": "Pedro Silva",
        "dateBirth": "10/05/1990",
        "sex": "Masculino",
        "telone": "(11) 98765-4321",
        "email": "joao.silva@example.com",
        "profession": "Engenheiro",
        "estadocivil": "Casado"
    }\' http://localhost:3060/membros
    ```

    *(Nota: O modelo de membro possui muitos campos. O exemplo acima mostra apenas alguns. Consulte `src/models/members.js` para a lista completa.)*

*   **Atualizar um membro** (substitua `:id` pelo ID do membro):

    ```bash
    curl -X PUT -H "Content-Type: application/json" -d \'{
        "profession": "Arquiteto de Software"
    }\' http://localhost:3060/membros/:id
    ```

*   **Deletar um membro** (substitua `:id` pelo ID do membro):

    ```bash
    curl -X DELETE http://localhost:3060/membros/:id
    ```

#### Finanças

*   **Listar todos os lançamentos financeiros**:

    ```bash
    curl -X GET http://localhost:3060/finance
    ```

*   **Adicionar um novo lançamento financeiro**:

    ```bash
    curl -X POST -H "Content-Type: application/json" -d \'{
        "tipodedado": "Dízimo",
        "valor": 150.75,
        "statuspagamento": "Pago",
        "datapagamento": "01/01/2026",
        "tipolancamento": "Entrada",
        "observacao": "Dízimo de janeiro"
    }\' http://localhost:3060/finance
    ```

    *(Nota: Consulte `src/models/financeiro.js` para a lista completa de campos.)*

*   **Atualizar um lançamento financeiro** (substitua `:id` pelo ID do lançamento):

    ```bash
    curl -X PUT -H "Content-Type: application/json" -d \'{
        "valor": 160.00
    }\' http://localhost:3060/finance/:id
    ```

*   **Deletar um lançamento financeiro** (substitua `:id` pelo ID do lançamento):

    ```bash
    curl -X DELETE http://localhost:3060/finance/:id
    ```

## Como Contribuir

Contribuições são bem-vindas! Se você deseja contribuir para este projeto, por favor, siga os passos abaixo:

1.  Faça um fork do repositório.
2.  Crie uma nova branch (`git checkout -b feature/sua-feature`).
3.  Faça suas alterações e adicione testes, se aplicável.
4.  Commit suas alterações (`git commit -m \'feat: Adiciona nova funcionalidade\'`).
5.  Envie para a branch (`git push origin feature/sua-feature`).
6.  Abra um Pull Request, descrevendo suas alterações.

## Licença

Este projeto está licenciado sob a licença **ISC**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---


