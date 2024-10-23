const express = require('express');
const { randomUUID } = require('crypto'); 
const app = express();

app.use(express.json());

let pessoas = [];
