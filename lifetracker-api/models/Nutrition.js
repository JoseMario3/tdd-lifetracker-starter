const db = require("../db");
const { BadRequestError, NotFoundError } = require("../utils/error");

class Nutrition {

    static async createNutrition(email, newNutrition) {
        const requiredFields = [
            "name",
            "category",
            "calories",
            "quantity",
            "image_url",
        ]
        requiredFields.forEach((field) => {
            if (!newNutrition.hasOwnProperty(field)) {
                throw new BadRequestError(`Missing require field - ${field} - in request body`);
            }
        });

        const user = await this.fetchUserByEmail(email);
        console.log("user", user);

        const results = await db.query(
            `
                INSERT INTO nutrition (name, category, calories, quantity, image_url, user_id)
                VALUES ($1, $2, $3, $4, $5, $6)
                RETURNING id, name, category, calories, quantity, image_url;
            `, [newNutrition.name, newNutrition.category, newNutrition.calories, newNutrition.quantity, newNutrition.image_url, user.id] );
        
        return results.rows[0];
    }

    static async listNutritionForUser(email) {
        const user = await this.fetchUserByEmail(email);
        const query =  `SELECT * FROM nutrition WHERE user_id = $1`;
        const results = await db.query(query, [user.id]);
        return results.rows;
    }

    // static async fetchNutritionById(nutritionId) {
    //     const results = await db.query(
    //         `
    //             SELECT id
    //             FROM nutrition
    //             WHERE id = $1;
    //         `, [nutritionId]);
    //     const nutrition = results.rows[0];

    //     if (nutrition?.name) return nutrition;

    //     throw NotFoundError("No nutrition found with that id.");
    // }

    static async fetchUserByEmail(email) {
        if (!email) {
            throw new BadRequestError("No email provided");
        }
        const query = `SELECT * FROM users WHERE EMAIL = $1`;
        const result = await db.query(query, [email.toLowerCase()]);
        const user = result.rows[0];
        return user;
    }
}

module.exports = Nutrition;