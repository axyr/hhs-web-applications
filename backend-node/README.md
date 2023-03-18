# Run the migrations from scratch

```bash
npx sequelize-cli db:migrate:undo:all && 
npx sequelize-cli db:migrate && 
npx sequelize-cli db:seed:all
```

# Run the docker image

- docker build . -t <your username>/node-web-app
- docker run -p 3000:3000 -d <your username>/node-web-app