docker-compose up -d
npx prisma migrate dev --name init
npm run dev
http://localhost:3000/api-docs/#/
