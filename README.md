# Projeto de Controle de Visitantes

Este projeto é uma aplicação simples para gerenciar visitantes por salas, registrando entradas, saídas e mantendo um histórico completo.

---

## Bibliotecas Utilizadas

- **React** — biblioteca principal para construção da interface.
- **Styled-components** — para estilização dos componentes de forma modular e dinâmica.
- **React Router DOM** — para gerenciamento das rotas no frontend.
- **Typescript** — para tipagem estática e maior segurança no desenvolvimento.
- **React Hook Form** - para validação de formulário.

---

## Armazenamento de Dados

Para manter a simplicidade e eficiência, todos os dados são armazenados (salas - inseri 3 salas mockadas, mas poderia ser cadastrada também - visitantes, histórico, logs, token) no **Local Storage** do navegador. Isso permite que o histórico de visitantes e informações das salas sejam salvos localmente no navegador do usuário, sem necessidade de backend ou banco de dados externo.

O token é guardado por 1 hora e depois é feito logout, sendo necessário login após esse tempo.

---

## Requisitos

- **Node.js** versão 18 ou superior.

---

## Como rodar o projeto

1. Clone este repositório:

```git clone ```

2. Acesse a pasta do projeto:

```cd jarvis-test```

3. Instale as dependências:

```yarn```

4. Crie um arquivo ```.env```, copie as informações do arquivo ```.env.example```e cole no ```.env``.

5. Inicie o servidor:

```yarn dev```

6. Faça login com e-mail e senha do arquivo ```.env```.

7. projeto será aberto na URL `http://localhost:5173/`.