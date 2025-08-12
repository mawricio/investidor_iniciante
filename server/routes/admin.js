const express = require('express');
const router = express.Router();
const Page = require('../models/Page');
const auth = require('../middleware/auth');

router.post('/pages/:key', auth('admin'), async (req, res) => {
  try{
    const data = req.body;
    const page = await Page.findOneAndUpdate(
      { key: req.params.key },
      { ...data, key: req.params.key },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    res.json(page);
  }catch(err){ res.status(500).json({ error: err.message }); }
});

module.exports = router;
