const router = require('express').Router();
const signale = require('signale');
const fcDbo = require('../config/sequelize');

const speechModel = fcDbo.import('../models/speech.js');

router.get('/speeches', async (req, res) => {
   const sqlResponse = await speechModel.findAll({
      attributes: ['id', 'author', 'title', 'date'],
   });
   //  const userObj = {};
   if (sqlResponse) {
      console.log(JSON.stringify(sqlResponse, null, 2));
      // userObj = sqlResponse.get({ plain: true });
   }
   res.json(sqlResponse);
});

router.post('/speech', async (req, res) => {
   const data = req.body;
   console.log(data);
   const sqlResponse = await speechModel.create(data);
   if (sqlResponse) {
      signale.success('Model creation is successful.');
   }
   res.json({});
});

module.exports = router;
