
npm init -y
npm install prisma typescript ts-node @types/node --save-dev
npx prisma init
npx prisma migrate dev --name init


## Inicializar o prisma no projeto
ao executar `npx prisma init` irá criar o dir `prisma` com a estrutura de modelos (model) do banco. e irá criar o .env que deverá receber a string de conexão
