const express = require('express');
const app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { reportarConsulta } = require('./middlewares/reporte_consulta')
const { resgistrarUsuario, verificarCredenciales, obtenerUsuario, mostrarInfo } = require('./consultas')

app.use(express.json())
app.use(cors())

app.listen(3000, () => console.log('SERVER ON'))

app.post('/usuarios', reportarConsulta, async (req, res) => {
    try {
        const usuario = req.body
        await resgistrarUsuario(usuario)
        res.send('Usuario Registrado con Éxito')
    } catch (error) {
        res.status(error.code || 500).send(error)
    }
})

app.post('/login', reportarConsulta, async (req, res) => {
    try {
        const { email } = req.body
        const usuario = req.body
        await verificarCredenciales(usuario)
        const token = jwt.sign({ email }, "a-z_A-Z")
        res.send(token)
        res.send("usuario logueado")
    } catch (error) {
        res.status(error.code || 500).send(error)
    }
})
app.get('/usuarios', reportarConsulta, async (req, res) => {
    const Authorization = req.header("Authorization")
    const token = Authorization.split("Bearer ")[1]
    jwt.verify(token, "a-z_A-Z")
    const { email } = jwt.decode(token)
    const usuario = await obtenerUsuario(email)
    const info = mostrarInfo(usuario)
    res.json(info)
})
app.get('/perfil', reportarConsulta, async (req, res) => {
    const Authorization = req.header("Authorization")
    const token = Authorization.split("Bearer ")[1]
    jwt.verify(token, "a-z_A-Z")
    const { email } = jwt.decode(token)
    const usuario = await obtenerUsuario(email)
    const info = mostrarInfo(usuario)
    res.json(info)
})