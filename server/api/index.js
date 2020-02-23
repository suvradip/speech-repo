const router = require('express').Router();
const signale = require('signale');
const Sequelize = require('sequelize');
const format = require('date-fns/format');
const fcDbo = require('../config/sequelize');

const speechModel = fcDbo.import('../models/speech.js');

const { Op } = Sequelize;
router.get('/speeches', async (req, res) => {
   const { query = '' } = req.query;
   let sqlResponse;
   try {
      if (query !== '') {
         sqlResponse = await speechModel.findAll({
            where: {
               [Op.or]: [
                  { title: { [Op.like]: '%' + query + '%' } },
                  { author: { [Op.like]: '%' + query + '%' } },
                  { keyWords: { [Op.like]: '%' + query + '%' } },
               ],
            },
            attributes: ['id', 'author', 'title', 'date'],
         });
      } else {
         sqlResponse = await speechModel.findAll({
            attributes: ['id', 'author', 'title', 'date'],
         });
      }

      if (sqlResponse) {
         return res.json(sqlResponse);
      }
      return res.status(400).json({
         error: 'No data records',
      });
   } catch (error) {
      console.log(error.message);
      return res.status(500).json({
         error: error.message,
      });
   }
});

router.get('/speeches/:id', async (req, res) => {
   const { id } = req.params;
   try {
      const sqlResponse = await speechModel.findOne({
         where: {
            id,
         },
      });

      if (sqlResponse) {
         const data = {
            ...sqlResponse.get({ plain: true }),
            date: format(new Date(sqlResponse.date), 'dd/MM/yyyy'),
         };

         return res.json(data);
      }
      return res.status(400).json({
         error: 'No data records',
      });
   } catch (error) {
      console.log(error.message);
      return res.status(500).json({
         error: error.message,
      });
   }
});

router.post('/speech', async (req, res) => {
   const { id = '', ...data } = req.body;
   try {
      const [response, created] = await speechModel.findOrCreate({ where: { id }, defaults: { ...data } });

      if (created) {
         signale.success('Model creation is successful.');
      } else {
         response.update({ ...data });
         signale.success('Model update is successful.');
      }

      const formatData = response.get({ plain: true });
      return res.json({
         ...formatData,
      });
   } catch (error) {
      console.log(error.message);
      return res.status(500).json({
         error: error.message,
      });
   }
});

router.delete('/speech/:id', async (req, res) => {
   const { id } = req.params;
   try {
      const response = await speechModel.destroy({ where: { id } });
      if (response) {
         return res.json({
            message: 'OK',
         });
      }
      return res.status(400).json({
         message: 'failed',
      });
   } catch (error) {
      console.log(error.message);
      return res.status(500).json({
         error: error.message,
      });
   }
});

module.exports = router;
