const { Pool } = require('pg')
const bcrypt = require('bcryptjs')


const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: 'luispost',
    database: 'softjobs',
    allowExitOnIdle: true
})

const resgistrarUsuario = async ({ email, password, rol, lenguage }) => {
    const passwordEncryptada = bcrypt.hashSync(password)
    password = passwordEncryptada
    const values = [email, passwordEncryptada, rol, lenguage]
    const consulta = " insert into usuarios values(DEFAULT, $1, $2, $3,$4)"
    await pool.query(consulta, values)
}

const verificarCredenciales = async ({ email, password }) => {
    const values = [email]
    consulta = "select * from usuarios where email = $1"
    const { rows: [usuario], rowCount } = await pool.query(consulta, values)
    const { password: passwordEncryptada } = usuario
    const passwordiscorrect = bcrypt.compareSync(password, passwordEncryptada)
    if (!passwordiscorrect || !rowCount) throw { code: 401, message: "Email y contraseña o Contraseña Incorrecta" }
}

const obtenerUsuario = async (email) => {
    const values = [email]
    consulta = "Select * from usuarios where email = $1"
    const { rows: usuario } = await pool.query(consulta, values)
    return usuario[0]
}

const mostrarInfo = (usuario) => {
    const info = {
        "Email": usuario.email,
        "Rol": usuario.rol,
        "lenguage": usuario.lenguage
    }
    return info
}
module.exports = { resgistrarUsuario, verificarCredenciales, obtenerUsuario, mostrarInfo }