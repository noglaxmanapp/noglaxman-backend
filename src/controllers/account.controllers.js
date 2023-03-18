const { response, query } = require('express');
const pool = require("../connect");

const getAllAccount = async (req, res) => {
  try {
    const resultAccount = await pool.query('SELECT * FROM Account')
    return res.json(resultAccount);
  } catch (error) {
    res.json(error)
  }
};

const getAccount = async (req, res) => {
  try {

    const { id } = req.params
    const resultAccount = await pool.query('SELECT * FROM Account WHERE account_id = ?', [id])
    return res.json(resultAccount);
  } catch (error) {
    res.json(error)
  }
};


const getAllAcountOfClient = async (req, res) => {
  try {
    const {client_id} = req.body;
    const resultAccount = await pool.query("SELECT * FROM Account WHERE clientID = ?",
     [client_id]);
     return res.json(resultAccount);
  } catch (error) {
    res.json(error);
  }
};

const createAccount = async (req, res) => {
  try {
    const {clientID, account_id} = req.body
    const resultAccount = await pool.query('INSERT INTO Account (clientID, account_id) VALUES(?,?)', [clientID, account_id])
    if (resultAccount){
      return res.send({message: "Cuenta creada con éxito"})
    }
  } catch (error) {
    res.send("Ocurrió un error!")
  }
};

const updateAccount = async (req, res) => {
  try {
    const { id } = req.params
    // console.log(`viejo: ${id}`)
    const {account_id} = req.body
    // console.log(`nuevo: ${account_id}`)
    const resultAccount = await pool.query('UPDATE Account SET account_id = ? WHERE account_id = ?', [account_id, id])

    console.log(resultAccount)
    return res.json(resultAccount);
  } catch (error) {
    res.json(error)
  }
};

const deleteAccount = async (req, res) => {
  try {
    const {id} = req.params;
    const resultAccount = await pool.query("DELETE FROM Account WHERE account_id = ?", [id]);
    res.json(resultAccount)    
  } catch (error) {
    res.json(error)
  }
};

module.exports = { getAllAccount, getAccount, getAllAcountOfClient, createAccount, updateAccount, deleteAccount }