const { UnauthorizedError } = require("../utils/error");
const db = require("../db");

const authedUserOwnsNutrition = async (req, res, next) => {
    const id = req.nutrition.id;
    const results = await db.query(
        `
            SELECT id
            FROM nutrition
            WHERE id = $1; 
        `, [id]);
    
}

module.exports = authedUserOwnsNutrition;