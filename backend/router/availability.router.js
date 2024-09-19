const express = require('express');
const { Availability } = require('../models');
const router = express.Router();



// Get all availability for a doctor

router.get('/', async (req, res) => {
    try {
        const availability = await Availability.findAll();
        res.json(availability);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get availability for a specific doctor by ID
router.get('/:doctorId', async (req, res) => {
    try {
        const availability = await Availability.findAll({
            where: { DoctorID: req.params.doctorId },
        });
        res.json(availability);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create availability
router.post('/', async (req, res) => {
    try {
        const availability = await Availability.create(req.body);
        res.status(201).json(availability);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update availability

router.put('/:id', async (req, res) => {
    try {
        const availability = await Availability.findByPk(req.params.id);

        if (!availability) {
            return res.status(404).json({ message: 'Availability not found' });
        }

        await availability.update(req.body);
        res.json(availability);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete availability

router.delete('/:id', async (req, res) => {
    try {
        const availability = await Availability.findByPk(req.params.id);

        if (!availability) {
            return res.status(404).json({ message: 'Availability not found' });
        }

        await availability.destroy();
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;