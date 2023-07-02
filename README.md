# API CRUD de Usuários

## Sobre
Esta API é projetada para fornecer um CRUD (Create, Read, Update, Delete) completo para usuários. Cada usuário tem um identificador único (UUIDv4) e os seguintes campos:

```json
{
    "username": "user",
    "pass": "pass",
    "name": "fulano",
    "lastName": "de tal",
    "cpf": "13568724090",
    "phone": "85999887766",
    "email": "teste@teste.com",
    "status": "ACTIVE",
    "address": {
        "street": "Av L",
        "number": "1366",
        "city": "Fortaleza",
        "state": "CE",
        "country": "Vila Velha",
        "postalCode": "60347-540"
    }   
}
```

## Funcionalidades Implementadas
Atualmente, o projeto conta com a seguinte rota:

- `POST - dev/user` - Faz com que a entidade seja criada do caso de uso

## Próximas Funcionalidades
Para as próximas etapas do projeto, planejamos:

- Implementar a interação com o banco de dados abstrata por adapter, podendo assim mudarmos facilmente a tecnologia de armazenamento de dados
- Adicionar rotas para:
  - atualizar um usuário existente
  - deletar um usuário
  - buscar todos os usuários
  - buscar um usuário específico pelo seu UUIDv4
- Evoluir a injeção de dependências.
 com isso terminaremos a etapa 1 do projeto.

 Em seguida vamos cuidar dos seguintes aspectos.

 - Estabilidade
 - Confiabilidade 
 - Escalabilidade
 - Tolerância a falhas e prontidão para catástrofes
 - Desempenho
 - Monitoramento
 - Documentação

## Instalação e Uso
### Requisitos
- Node.js
- Yarn
- TypeScript
- Serverless Offline

### Instalação
```bash
git clone https://github.com/aureliotechnology/ms-node-user-serverless
cd ms-node-user-serverless
yarn install
yarn dev
