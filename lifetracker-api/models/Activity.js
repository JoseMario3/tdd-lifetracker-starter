const {BadRequestError, NotFoundError} = require("../utils/error");
const db = require("../db");

class Activity{

    static async calculateDailyCaloriesSummaryStats(email){
        const user = await this.fetchUserByEmail(email)
        if (!user) throw new NotFoundError("no user found")
        const query = `SELECT to_char(created_at, 'DD/MM/YYYY') AS "date", SUM(calories) AS "totalCalories" 
                       FROM nutrition WHERE user_id = $1 
                       GROUP BY date ORDER BY date DESC;`
        const results = await db.query(query, [user.id])
        return results.rows
    }

    static async calculatePerCategoryCaloriesSummaryStats(email){
        const user = await this.fetchUserByEmail(email)
        if (!user) throw new NotFoundError("no user found")
        const query = `SELECT category AS "category", AVG(calories) as "avgCaloriesPerCategory" 
                       FROM nutrition WHERE user_id = $1 GROUP BY category;`
        const results = await db.query(query, [user.id])
        return results.rows
    }

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

module.exports = Activity