const { response, query } = require('express');
const pool = require("../connect");
const { verifyToken } = require('../helpers/generateToken');
const { encrypt } = require('../helpers/handleBcrypt');

const getAllClient = async (req, res) => { 
  try {
    const resultClient = await pool.query('SELECT * FROM Client')
    return res.json(resultClient);
  } catch {
    const error = new Error("No se encontraron clientes")
    return res.json({error: error.message})
  }
};

const getClient = async (req, res) => {
  try {
    const { id } = req.params
    const resultClient = await pool.query('SELECT * FROM Client WHERE client_id = ?', [id])
    return res.json(resultClient);
  } catch {
    const error = new Error("Cliente no encontrado")
    return res.json({error: error.message})
  }
};


const updateClient = async (req, res) => {
  try {
    const { id } = req.params
    const {dni, name, lastname, username, pass} = req.body
    const passwordHash = await encrypt(pass)
    const client = {
      ...(dni ? {dni} : {}),
      ...(name ? {name} : {}),
      ...(lastname ? {lastname} : {}),
      ...(username ? {username} : {}),
      ...(passwordHash ? {pass: passwordHash} : {})
    }
    const resultClient = await pool.query('UPDATE Client SET ? WHERE client_id = ?', [client, id])

    if (resultClient){
      return res.send({message: "Cliente actualizado con éxito"});
    }
  } catch (error) {
    res.send("No se pudo actualizar el cliente.");
  }
};

const deleteClient = async (req, res) => {
  try {
    const {id} = req.params;
    const resultClient = await pool.query("DELETE FROM Client WHERE client_id = ?", [id]);
    if (resultClient){
      return res.send({message: "Cliente eliminado con éxito"});
    }    
    else{
      res.status(409);
      res.send({error: "No se pudo eliminar el cliente."});
    }
  } catch (error) {
    res.status(409);
    res.send({error: "No se pudo eliminar el cliente."});
  }
};

const getRole = async (req, res ) => {
  const {token} = req.body
  try {
    const tokenData = await verifyToken(token);
    res.send({role: tokenData.role})
  } catch (error) {
    res.status(409)
    res.send({error:"No existe el token"})
  }
}

module.exports = { getAllClient, getClient, updateClient, deleteClient, getRole }