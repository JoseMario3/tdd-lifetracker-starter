const db = require("../db");
const { BadRequestError, NotFoundError } = require("../utils/errors");

class Nutrition {
    static async createNutrition({ newNutrition, user }) {
        const requiredFields = [
            "name",
            "category",
            "calories",
            "image_url",
        ]
        requiredFields.forEach((field) => {
            if (!newNutrition.hasOwnProperty(field)) {
                throw new BadRequestError(`Missing require field - ${field} - in request body`);
            }
        });

        const results = await db.query(
            `
                INSERT INTO nutrition (name, category, calories, image_url, user_id)
                VALUES ($1, $2, $3, $4, $5)
                RETURNING;
            `, [newNutrition.name, newNutrition.category, newNutrition.calories, newNutrition.image_url, user.id] );
        
        return results.rows[0];
    }

    static async fetchNutritionById(nutritionId) {
        const results = await db.query(
            `
                SELECT id
                FROM nutrition
                WHERE id = $1;
            `, [nutritionId]);
        const nutrition = results.rows[0];

        if (nutrition?.name) return nutrition;

        throw NotFoundError("No nutrition found with that id.");
    }

    static async listNutritionForUser() {

    }
}

module.exports = Nutrition;