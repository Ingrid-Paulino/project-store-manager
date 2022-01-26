const express = require('express');
const bodyParse = require('body-parser');
// const { use } = require('./routes');
const routes = require('./routes');
const error = require('./middlewares/error');

const app = express();
app.use(bodyParse.json());

require('dotenv').config();

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(routes);

app.use(error.globalError);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
