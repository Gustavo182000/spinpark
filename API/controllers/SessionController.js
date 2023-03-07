const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async(req, res) =>{

    const login = req.body.login;
    let senha = req.body.senha;

    if (!login || !senha) { return res.status(400).json({ error: "login-password-is-empty" }) }
    if (senha.length < 6) { return res.status(400).json({ error: "password-min-6" }) }

    senha = bcrypt.hashSync(req.body.senha, 6);

    User.create({login: login,senha: senha}).then(()=>{
        return res.status(200).json({ success: "user-created" })
    }).catch((err) => {
        return res.status(400).json({ error: "fail-create-user" })
    })


}


exports.login = async(req, res) =>{

    const login = req.body.login;
    const senha = req.body.senha;

    if (!login || !senha) { return res.status(400).json({ error: "login-password-is-empty" }) }

    const usuario = await User.findOne({ login: login })
    if (!usuario) { return res.status(400).json({ error: "user-not-exist" }) }
    const match = await bcrypt.compare(senha, usuario.senha)

    if (!match) { return res.status(400).json({ error: "login-password-not-match" }) }else{
        const token = jwt.sign({id: usuario._id,login: usuario.login},"g32364341",{
            expiresIn: 7200
        })
        return res.status(200).json({success: "login-success",token: token, auth: true})
    }


}
exports.logout = async (req, res) => {

    res.status(200).json({ success: "logout-success", token: null, auth: false });

}
exports.verifyJWT = async (req, res) => {

    const token = req.headers['x-access-token'];

    if(!token){return res.status(401).json({error: "token-expected"})}

    jwt.verify(token,"g32364341",(err,decoded)=>{
        if(err){return res.status(500).json({error: "failed-auth-token"})}
        return res.status(200).json({success: "token-valid", auth: true,_id: decoded.id,email: decoded.email})
    })

}