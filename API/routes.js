const express = require('express');
const router = express.Router();
const SessionController = require('./controllers/SessionController')
const ConfiguracoesController = require('./controllers/ConfiguracoesController')
const Cliente = require('./controllers/ClienteController')
const MensalistaController = require('./controllers/MensalistaController')

const jwt = require('jsonwebtoken');

router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE ");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization,x-access-token");
  next();
});

function verifyJWT(req, res, next) {
  const token = req.headers['x-access-token'];

  if (!token) { return res.status(401).json({ error: "token-expected" }) }

  jwt.verify(token, "g32364341", (err, decoded) => {
    if (err) { return res.status(500).json({ error: "failed-auth-token" }) }
    next();
  })
}

router.post('/register', SessionController.register);
router.post('/login', SessionController.login);
router.post('/verifyjwt',SessionController.verifyJWT);
router.get('/configuracoes',verifyJWT, ConfiguracoesController.getConfig);
router.post('/configuracoes',verifyJWT, ConfiguracoesController.setConfig);
router.post('/cliente',verifyJWT, Cliente.setCliente);
router.get('/cliente',verifyJWT, Cliente.getCliente);
router.put('/cliente',verifyJWT, Cliente.updateCliente);
router.post('/mensalista',verifyJWT, MensalistaController.cadastro);
router.put('/mensalista',verifyJWT, MensalistaController.update);
router.get('/mensalista/:id',verifyJWT, MensalistaController.getById);
router.get('/mensalista',verifyJWT, MensalistaController.getAll);





module.exports = router;