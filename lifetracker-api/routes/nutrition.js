const express = require("express");
const { restart } = require("nodemon");
const Nutrition = require("../models/Nutrition");
const { createUserJwt } = require("../utils/tokens");
const security = require("../middleware/security");
const permission = require("../middleware/permissions");
const { route } = require("./auth");
const router = express.Router();

router.get("/", security.requireAuthenticatedUser, permission.authedUserOwnsNutrition, async (req, res, next) => {
    try {
        const perDay = await Activity.calculateDailyCaloriesSummaryStats();
        const perCategory = await Activity.calculatePerCategoryCaloriesSummaryStats();
        res.status(200).json({ nutritions: null })
    } catch (err) {
        next(err);
    }
});

router.post("/", security.requireAuthenticatedUser, permission.authedUserOwnsNutrition, async (req, res, next) => {
    try {

    } catch (err) {
        next (err);
    }
})

router.get("/:nutritionId", security.requireAuthenticatedUser, permission.authedUserOwnsNutrition, async (req, res, next) => {
    try {

    } catch (err) {
        next (err);
    }
})

module.exports = router;