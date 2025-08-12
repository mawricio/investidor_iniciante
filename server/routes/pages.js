const express = require('express');
const router = express.Router();
const Page = require('../models/Page');

router.get('/:key', async (req, res) => {
  try {
    const page = await Page.findOne({ key: req.params.key });
    if (!page) return res.status(404).json({ error: 'Page not found' });
    res.json(page);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const pages = await Page.find().sort({ createdAt: -1 });
    res.json(pages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
