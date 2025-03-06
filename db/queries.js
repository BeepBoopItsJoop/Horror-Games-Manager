const pool = require('./pool');

const gameList = async () => {
     const SQL = `
     SELECT games.title, games.release_date, developers.name AS developer_name, games.id
     FROM games 
     JOIN  developers
     ON (games.developer_id = developers.id);
     `
     const { rows } = await pool.query(SQL);
     return rows;
}

const game = async (id) => {
     const SQL = `
     SELECT games.title, games.release_date, developers.name AS developer_name
     FROM games 
     JOIN  developers
     ON (games.developer_id = developers.id)
     WHERE games.id = ($1);
     `;
     const { rows } = await pool.query(SQL, [id]);
     return rows;
}

const gameMonsterList = async (id) => {
     const SQL = `
     SELECT monsters.name, monsters.description, monsters.id
     FROM games
     JOIN monsters 
     ON (games.id = monsters.game_id)
     WHERE games.id = ($1);
     `
     const { rows } = await pool.query(SQL, [id]);
     return rows;
}

const monster = async (id) => {
     const SQL = `
     SELECT monsters.name, monsters.description
     FROM monsters
     WHERE monsters.id = ($1);`;

     const { rows } = await pool.query(SQL, [id]);
     return rows;
}

const developerList = async () => {
     const { rows } = await pool.query('SELECT developers.id, developers.name, developers.country FROM developers');
     return rows;
};

const developer = async (id) => {
     const SQL = `
     SELECT developers.name, developers.country
     FROM developers
     WHERE developers.id = ($1);
     `;
     const { rows } = await pool.query(SQL, [id]);
     return rows;
}

const developerGameList = async (dev_id) => {
     const SQL = `
     SELECT games.title, games.release_date, games.id
     FROM games 
     JOIN developers 
     ON (games.developer_id = developers.id) 
     WHERE developers.id = ($1);
     `;

     const { rows } = await pool.query(SQL, [dev_id]);
     return rows;
}

const gameLocationList = async (id) => {
     const SQL = `
     SELECT locations.name, locations.description, locations.id
     FROM games
     JOIN locations
     ON (games.id = locations.game_id)
     WHERE games.id = ($1);
     `

     const { rows } = await pool.query(SQL, [id]);
     return rows;
}

const location = async (id) => {
     const SQL = `
     SELECT locations.name, locations.description
     FROM locations
     WHERE locations.id = ($1);`;

     const { rows } = await pool.query(SQL, [id]);
     return rows;
}

// const insertUsername = async (username) => {
//      await pool.query("INSERT INTO usernames (username) VALUES ($1)", [username]);
// }

module.exports = {
     developerList,
     developer,
     developerGameList,
     gameList,
     game,
     gameMonsterList,
     monster,
     gameLocationList,
     location,
};

