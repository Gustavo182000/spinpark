const Cliente = require('../models/Cliente');


exports.setCliente = async(req, res) =>{

    const placa = req.body.placa;
    const veiculo = req.body.veiculo;
    const mensalista = req.body.mensalista;
    const entrada = new Date().toLocaleString('pt-BR');
    console.log("Placa"+placa)

    if(!placa){return res.status(400).json({error: "placa-is-empty"})} 
    if(placa === null){return res.status(400).json({error: "placa-is-empty"})} 
    if(placa === ""){return res.status(400).json({error: "placa-is-empty"})} 


    Cliente.create({
        placa: placa,
        veiculo: veiculo,
        entrada: entrada,
        mensalista: mensalista,
    }).then(()=>{
        return res.status(200).json({success: "create-success"});
    }).catch(()=>{
        return res.status(400).json({error: "create-error"});

    })

    


}

exports.getCliente = async(req, res) =>{

    const clientes = await Cliente.find({});
    return res.status(200).json(clientes);


}

exports.updateCliente = async(req, res) =>{

    const id = req.body.id;
    const saida = req.body.saida;
    const pagamento = req.body.pagamento;
    const valor = req.body.valor;


    if(!id || !saida || !pagamento || !valor){return res.status(400).json({error: "data-not-found"})}

    Cliente.findByIdAndUpdate(id,{
        saida: saida,
        pagamentotipo: pagamento,
        valor: valor
    }).then(()=>{
        return res.status(200).json({success: "success-update"})
    }).catch((err)=>{
        console.log(err)
        return res.status(400).json({error: "error-to-update"})
    })





}


