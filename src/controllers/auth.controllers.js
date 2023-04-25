const { encrypt } = require("../helpers/handleBcrypt");
// const { error } = require('./../errors/error')
const { response, query } = require('express');
const pool = require("../connect");
const { compare } = require("bcryptjs");
const { tokenSign } = require("../helpers/generateToken");

const login = async (req, res) => {
  try {
    const {username, pass} = req.body
    const user = await pool.query('SELECT * FROM Client WHERE username = ? ', [username])
    if (user.length === 0){
      res.status(404)
      res.send({error: 'El usuario no existe'})
      return
    }
    const checkPass = await compare(pass, user[0].pass)
    const tokenSession = await tokenSign(user[0]);
    if (checkPass) {
      res.send({
        data: user[0],
        tokenSession
      })
      return
    }
    if (!checkPass){
      res.status(409);
      res.send({error:'Contraseña incorrecta'})
      return
    }
    
  } catch(error) {
    res.send(error);
  }
}

const register = async (req, res) => {
  try {
    const {dni, name, lastname, username, pass} = req.body
    const passwordHash = await encrypt(pass)
    const resultClient = await pool.query('INSERT INTO Client (dni, name, lastname, username, pass) VALUES(?,?,?,?,?) ', [dni, name, lastname, username, passwordHash])
    if (resultClient){
      return res.send({message: "Cliente creado con éxito"})
    }
  } catch(error){
    // res.status(404)
    // const error = new Error("Ya existe un cliente con ese DNI o ese usuario")
    res.send("El usuario no existe")
  }
}

module.exports = {
  register,
  login
}