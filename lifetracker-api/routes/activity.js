const express = require("express");
const { restart } = require("nodemon");
const Activity = require("../models/Activity");
const { createUserJwt } = require("../utils/tokens");
const security = require("../middleware/security");
const router = express.Router();

router.get("/", security.requireAuthenticatedUser, async (req, res, next) => {
    try {
        const email = res.locals.user.email;
        const perDay = await Activity.calculateDailyCaloriesSummaryStats(email);
        const perCategory = await Activity.calculatePerCategoryCaloriesSummaryStats(email);
        res.status(200).json({ calories:{ perDay: perDay, perCategory: perCategory}})
    } catch (err) {
        next(err);
    }
});

module.exports = router;
