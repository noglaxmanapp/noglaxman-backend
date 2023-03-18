const { response, query } = require('express');
const pool = require("../connect");

const getAllSummary = async (req, res) => {
  try {
    const resultSummary = await pool.query('SELECT * FROM Summary')
    return res.json(resultSummary);
  } catch (error) {
    res.json(error)
  }
};

const getAllSummaryOfAcount = async (req, res) => {
  try {
    const {account_id} = req.body;
    const resultSummary = await pool.query("SELECT * FROM Summary WHERE accountID = ?",
     [account_id]);
     return res.json(resultSummary);
  } catch (error) {
    res.json(error);
  }
};

const getSummary = async (req, res) => {
  try {
    const { id } = req.params
    const resultSummary = await pool.query('SELECT * FROM Summary WHERE summary_id = ?', [id])
    return res.json(resultSummary);
  } catch (error) {
    res.json(error)
  }
};

const createSummary = async (req, res) => {
  try {
    const {accountID, summary_url, summary_date, profit} = req.body
    const resultSummary = await pool.query('INSERT INTO Summary (accountID, summary_url, summary_date, profit) VALUES(?,?,?,?)', [accountID, summary_url, summary_date, profit])
    return res.json(resultSummary);
  } catch (error) {
    res.json(error)
  }
};

const updateSummary = async (req, res) => {
  try {
    const { id } = req.params 
    const {summary_url, summary_date, profit} = req.body

    const summary = {
      ...(summary_url ? {summary_url} : {}),
      ...(summary_date ? {summary_date} : {}),
      ...(profit ? {profit} : {})
    }
    const resultSummary = await pool.query('UPDATE Summary SET ? WHERE summary_id = ?', [summary, id])

    return res.json(resultSummary);
  } catch (error) {
    res.json(error)
  }
};

const deleteSummary = async (req, res) => {
  try {
    const {id} = req.params;
    const resultSummary = await pool.query("DELETE FROM Summary WHERE summary_id = ?", [id]);
    res.json(resultSummary)    
  } catch (error) {
    res.json(error)
  }
};

module.exports = { getAllSummary, getSummary, createSummary, updateSummary, deleteSummary, getAllSummaryOfAcount }