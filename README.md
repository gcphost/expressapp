# Install Server
Configure `config/config.json`.

```
npm i 
sequelize db:migrate
sequelize db:seed:all
npm run dev

# Test
npm test
```

# Install Web
```
cd web
npm i
npm run start

# Test
npm test
```