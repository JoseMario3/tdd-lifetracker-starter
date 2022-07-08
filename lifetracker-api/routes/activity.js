const express = require("express");
const { restart } = require("nodemon");
const Activity = require("../models/Activity");
const { createUserJwt } = require("../utils/tokens");
const security = require("../middleware/security");
const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        const perDay = await Activity.calculateDailyCaloriesSummaryStats();
        const perCategory = await Activity.calculatePerCategoryCaloriesSummaryStats();
        res.status(200).json({ nutrition: { calories: { perDay: perDay, perCategory: perCategory }}})
    } catch (err) {
        next(err);
    }
});

module.exports = router;