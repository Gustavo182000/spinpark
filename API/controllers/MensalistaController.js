const Mensalista = require('../models/Mensalista');

exports.cadastro = async (req, res) => {

    const cpfcnpj = req.body.cpfcnpj;
    const nome = req.body.nome;
    const cep = req.body.cep;
    const placa = req.body.placa;
    const veiculo = req.body.veiculo;
    const endereco = req.body.endereco;
    const bairro = req.body.bairro;
    const cidade = req.body.cidade;
    const uf = req.body.uf;
    const telefone = req.body.telefone;
    const celular = req.body.celular;
    const email = req.body.email;
    const valorplano = req.body.valorplano;
    const observacao = req.body.observacao;

    if (!cpfcnpj || !nome || !endereco || !bairro || !cidade || !uf || !celular || !valorplano || !placa || !veiculo) { return res.status(400).json({ error: "error-data-empty" }) }

    Mensalista.create({
        cpfcnpj: cpfcnpj,
        nome: nome,
        cep: cep,
        veiculo: veiculo,
        placa: placa,
        endereco: endereco,
        bairro: bairro,
        cidade: cidade,
        uf: uf,
        telefone: telefone,
        celular: celular,
        email: email,
        valorplano: valorplano,
        observacao: observacao
    }).then(()=>{
        return res.status(200).json({success: "create-success"});
    }).catch(()=>{
        return res.status(400).json({error: "create-error"});

    })


}

exports.update = async (req, res) => {

    const id = req.body.id;
    const cpfcnpj = req.body.cpfcnpj;
    const placa = req.body.placa;
    const veiculo = req.body.veiculo;
    const nome = req.body.nome;
    const cep = req.body.cep;
    const endereco = req.body.endereco;
    const bairro = req.body.bairro;
    const cidade = req.body.cidade;
    const uf = req.body.uf;
    const telefone = req.body.telefone;
    const celular = req.body.celular;
    const email = req.body.email;
    const valorplano = req.body.valorplano;
    const observacao = req.body.observacao;

    if (!cpfcnpj || !nome || !endereco || !bairro || !cidade || !uf || !celular || !valorplano || !placa || !veiculo) { return res.status(400).json({ error: "error-data-empty" }) }

    Mensalista.findByIdAndUpdate(id,{
        cpfcnpj: cpfcnpj,
        nome: nome,
        cep: cep,
        veiculo: veiculo,
        placa: placa,
        endereco: endereco,
        bairro: bairro,
        cidade: cidade,
        uf: uf,
        telefone: telefone,
        celular: celular,
        email: email,
        valorplano: valorplano,
        observacao: observacao
    }).then(()=>{
        return res.status(200).json({success: "updated-success"});
    }).catch((err)=>{
        console.log(err)
        return res.status(400).json({error: "updated-error"});

    })


}

exports.getById = async (req, res) => {

    const id = req.params.id;

    if(id === undefined){return res.status(400).json({error: "id-invalid"})}

    const dados = await Mensalista.findById(id)

    res.status(200).json(dados);
    

}
exports.getAll = async (req, res) => {


    const dados = await Mensalista.find({})

    res.status(200).json(dados);
    

}