const express = require('express');
const app = express();
const port = 3301 || process.env.PORT;
const routes = require('./routes');
const mongoose = require('mongoose');

app.use(express.json());
app.use(routes)

mongoose.connect('mongodb+srv://root:root@spinpark.xgpw7kk.mongodb.net/?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.listen(port,()=> console.log(`Rodando na porta ${port}`))
