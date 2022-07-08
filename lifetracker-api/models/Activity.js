const db = require("../db");

class Activity {
    static async calculateDailyCaloriesSummaryStats(userId) {
        const results = await db.query(
            `
                SELECT nutrition.created_at AS date,
                   nutriton.calories AS "totalCaloriesPerDay"
                FROM nutrition
                WHERE user_id = $1;             
            `, [userId]);
        return results.rows;
    }

    static async calculatePerCategoryCaloriesSummaryStats() {
        const results = await db.query(
            `
                SELECT nutrition.category,
                    nutrition.calories AS "avgCaloriesPerCAtegory"
                FROM nutrition
                WHERE users_id = $1;
            `, [userId]);

        return results.rows;
    }
}

module.exports = Activity;