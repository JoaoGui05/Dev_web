const express = require('express');
const { randomUUID } = require('crypto');
const app = express();

app.use(express.json());

let pessoas = [];

app.listen(3000, () => console.log('Servidor rodando na porta: 3000'));

app.get('/pessoas', (req, res) => {
    res.json(pessoas);
});

app.post('/pessoas', (req, res) => {
    const { nome, celular } = req.body;
    const novaPessoa = { id: randomUUID(), nome, celular };
    pessoas.push(novaPessoa);
    res.status(201).json(novaPessoa);
});

app.put('/pessoas/:id', (req, res) => {
    const { id } = req.params;
    const { nome, celular } = req.body;

    const pessoa = pessoas.find(p => p.id === id);
    if (pessoa) {
        pessoa.nome = nome;
        pessoa.celular = celular;
        res.json(pessoa);
    } else {
        res.status(404).json({ error: 'Pessoa não encontrada' });
    }
});

app.delete('/pessoas/:id', (req, res) => {
    const { id } = req.params;
    const index = pessoas.findIndex(p => p.id === id);

    if (index !== -1) {
        pessoas.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).json({ error: 'Pessoa não encontrada' });
    }
});
