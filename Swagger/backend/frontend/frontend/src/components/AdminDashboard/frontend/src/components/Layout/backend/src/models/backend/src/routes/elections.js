const express = require('express');
const router = express.Router();
const Election = require('../models/Election');
const { verifyAdmin } = require('../middleware/auth');

// Get all elections
router.get('/', async (req, res) => {
  try {
    const elections = await Election.find().sort({ startDate: -1 });
    res.json(elections);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create election (admin only)
router.post('/', verifyAdmin, async (req, res) => {
  try {
    const { title, description, startDate, endDate, votingAmount } = req.body;
    const election = new Election({
      title,
      description,
      startDate,
      endDate,
      votingAmount
    });
    await election.save();
    res.status(201).json(election);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
