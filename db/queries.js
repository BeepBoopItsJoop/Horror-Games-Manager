const pool = require('./pool');

const getGamesList = async () => {
     const SQL = `
     SELECT games.title, games.release_date, developers.name AS developer_name
     FROM games 
     JOIN  developers
     ON (games.developer_id = developers.id);
     `
     const { rows } = await pool.query(SQL);
     return rows;
}

const getDevelopersList = async () => {
     const { rows } = await pool.query('SELECT * FROM developers');
     return rows;
};

// const insertUsername = async (username) => {
//      await pool.query("INSERT INTO usernames (username) VALUES ($1)", [username]);
// }

module.exports = {
     getGamesList,
     getDevelopersList,
     // x
};

