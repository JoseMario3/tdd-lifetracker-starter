const express = require("express");
const { restart } = require("nodemon");
const Nutrition = require("../models/Nutrition");
const { createUserJwt } = require("../utils/tokens");
const security = require("../middleware/security");
//const permission = require("../middleware/permissions");
const { route } = require("./auth");
const router = express.Router();

router.get("/", security.requireAuthenticatedUser, async (req, res, next) => {
    try {
        const email = res.locals.user.email;
        const nutritions = await Nutrition.listNutritionForUser(email);
        res.status(200).json({ nutritions: nutritions });
    } catch (err) {
        next(err);
    }
});

router.post("/create", security.requireAuthenticatedUser, async (req, res, next) => {
    try {
        const email = res.locals.user.email;
        const item = req.body;
        const newNutrition = await Nutrition.createNutrition(email, item);
        res.status(201).json({ nutrition: newNutrition });
    } catch (err) {
        next (err);
    }
})

// router.get("/:nutritionId", security.requireAuthenticatedUser, permission.authedUserOwnsNutrition, async (req, res, next) => {
//     try {
//         return 0;
//     } catch (err) {
//         next (err);
//     }
// })

module.exports = router;