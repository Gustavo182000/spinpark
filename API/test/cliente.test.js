const supertest = require('supertest')
const request = supertest('localhost:3301')
const jwt = require('jsonwebtoken');

describe('Teste para a função setCliente', () => {

    const token = jwt.sign({id: 0,login: 0},"g32364341",{
        expiresIn: 7200
    })

    test('Deve retornar o status 400 se o campo placa estiver vazio', () => {
        return request.post('/cliente').set('x-access-token',token).send({}).then((res)=>{
            expect(res.status).toBe(400);
            expect(res.body).toEqual({error: 'placa-is-empty'});
        })
    })
    test('Deve retornar o status 400 se o campo placa com o valor null', () => {
        return request.post('/cliente').set('x-access-token',token).send({placa: null}).then((res)=>{
            expect(res.status).toBe(400);
            expect(res.body).toEqual({error: 'placa-is-empty'});

        })
    })
    test('Deve retornar o status 400 se o campo placa estiver uma string vazia', () => {
        return request.post('/cliente').set('x-access-token',token).send({placa: ""}).then((res)=>{
            expect(res.status).toBe(400);
            expect(res.body).toEqual({error: 'placa-is-empty'});

        })
    })
    test('Deve retornar o status 200 se o cliente for cadastrado com sucesso', () => {
        return request.post('/cliente').set('x-access-token',token).send({placa: "123-4321",veiculo: 'Carro',entrada: '07/03/2023 16:00',mensalista: 'Não'}).then((res)=>{
            expect(res.status).toBe(200);
            expect(res.body).toEqual({success: 'create-success'});

        })
    })
    test('Deve retornar o status 400 se o houver um erro ao cadastrar o cliente', () => {
        return request.post('/cliente').set('x-access-token',token).send({placa: [{}],veiculo: 'Carro',entrada: '07/03/2023 16:00',mensalista: 'Não'}).then((res)=>{
            expect(res.status).toBe(400);
            expect(res.body).toEqual({error: 'create-error'});

        })
    })

})