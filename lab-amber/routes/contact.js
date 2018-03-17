'use strict';

const express = require('express');
const mongoose = require('mongoose');

const Contact = require('../models/contact.js');
const contactStorage = require('../lib/contact.js');

const router = express.Router();

router.get('/', (req, res) => {
  if (req.query.id) {
    let id = req.query.id;
    contactStorage.get(id)
    .then(contact => {
      res.send(contact);
    })
    .catch(err => {
      console.error(err);
    });
  } else 
  {
    contactStorage.getAll()
    .then(contacts => {
      res.send(contacts);
    })
    .catch(err => {
      console.error(err);
    });
  }
});

router.post('/', (req, res) => {
  contactStorage.save(req.body)
  .then(lead => {
    console.log('***** reached router then');
    res.status(200);
    res.send(lead);
  })
  .catch(err => {
    console.error(err);
  });
});

// router.put('/leads', (req, res) => {
//   storage.update(req.query.id, req.body)
//   .then(lead => {
//     res.status(200);
//     res.send('updated successfully');
//   })
//   .catch(err => {
//     console.error(err);
//   });
// });

// router.delete('/leads', (req, res) => {
//   storage.remove(req.query.id)
//   .then(project => {
//     res.status(204);
//     res.send('deleted successfully');
//   })
//   .catch(err => {
//     console.error(err);
//   });
// });

module.exports = router;