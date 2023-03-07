const Estacionamento = require('../models/Estacionamento');
const Carro = require('../models/Carro');
const Moto = require('../models/Moto');
const Caminhonete = require('../models/Caminhonete');


exports.getConfig = async (req, res) => {

    const estacionamento = await Estacionamento.findOne();
    const carro = await Carro.findOne();
    const moto = await Moto.findOne();
    const caminhonete = await Caminhonete.findOne();

    if(!estacionamento || !carro || !moto || !caminhonete){return res.status(400).json({error: "error-not-found-config"})}

    return res.status(200).json({ success: "success-find-config", estacionamento: estacionamento,carro:carro,moto:moto,caminhonete: caminhonete })


}

exports.setConfig = async (req, res) => {

    const nome = req.body.nome;
    const numvagas = req.body.numvagas;

    const carro15min = req.body.carro15min;
    const carro30min = req.body.carro30min;
    const carro1hr = req.body.carro1hr;
    const carro1hradc = req.body.carro1hradc;

    const moto15min = req.body.moto15min;
    const moto30min = req.body.moto30min;
    const moto1hr = req.body.moto1hr;
    const moto1hradc = req.body.moto1hradc;

    const caminhonete15min = req.body.caminhonete15min;
    const caminhonete30min = req.body.caminhonete30min;
    const caminhonete1hr = req.body.caminhonete1hr;
    const caminhonete1hradc = req.body.caminhonete1hradc;

    if (!nome || !numvagas || !carro15min || !carro30min || !carro1hr || !carro1hradc) { res.status(400).json({ error: "car-park-is-empty" }) }
    if (!moto15min || !moto30min || !moto1hr || !moto1hradc) { res.status(400).json({ error: "motorbike-is-empty" }) }
    if (!caminhonete15min || !caminhonete30min || !caminhonete1hr || !caminhonete1hradc) { res.status(400).json({ error: "truck-is-empty" }) }

    const estacionamento = await Estacionamento.findOne();
    const carro = await Carro.findOne();
    const moto = await Moto.findOne();
    const caminhonete = await Caminhonete.findOne();


    if (estacionamento && carro && moto && caminhonete) {

        Estacionamento.findByIdAndUpdate(estacionamento._id, {
            nome: nome,
            numvagas: numvagas,
        }).then(() => {

            Carro.findByIdAndUpdate(carro._id, {
                ate15min: carro15min,
                ate30min: carro30min,
                ate1hr: carro1hr,
                adc1hr: carro1hradc
            }).then(() => {

                Moto.findByIdAndUpdate(moto._id, {
                    ate15min: moto15min,
                    ate30min: moto30min,
                    ate1hr: moto1hr,
                    adc1hr: moto1hradc
                }).then(() => {

                    Caminhonete.findByIdAndUpdate(caminhonete._id, {
                        ate15min: caminhonete15min,
                        ate30min: caminhonete30min,
                        ate1hr: caminhonete1hr,
                        adc1hr: caminhonete1hradc
                    }).then(() => {
                        return res.status(200).json({ success: "success-update-config" })

                    }).catch((err) => {
                        return res.status(400).json({ error: "fail-set-truck" })
                    })

                }).catch((err) => {
                    console.log(err)
                    return res.status(400).json({ error: "fail-set-motorbike" })
                })

            }).catch((err) => {
                return res.status(400).json({ error: "fail-set-car" })
            })

        }).catch((err) => {
            return res.status(400).json({ error: "fail-set-parking" })
        })

    }else{

        Estacionamento.create({
            nome: nome,
            numvagas: numvagas,
        }).then(() => {

            Carro.create({
                ate15min: carro15min,
                ate30min: carro30min,
                ate1hr: carro1hr,
                adc1hr: carro1hradc
            }).then(() => {

                Moto.create({
                    ate15min: moto15min,
                    ate30min: moto30min,
                    ate1hr: moto1hr,
                    adc1hr: moto1hradc
                }).then(() => {

                    Caminhonete.create({
                        ate15min: caminhonete15min,
                        ate30min: caminhonete30min,
                        ate1hr: caminhonete1hr,
                        adc1hr: caminhonete1hradc
                    }).then(() => {
                        return res.status(200).json({ success: "success-create-config" })

                    }).catch((err) => {
                        return res.status(400).json({ error: "fail-create-truck" })
                    })

                }).catch((err) => {
                    console.log(err)
                    return res.status(400).json({ error: "fail-create-motorbike" })
                })

            }).catch((err) => {
                return res.status(400).json({ error: "fail-create-car" })
            })

        }).catch((err) => {
            return res.status(400).json({ error: "fail-create-parking" })
        })

    }


}