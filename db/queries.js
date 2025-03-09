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
     SELECT games.id, games.title, games.release_date, developers.name AS developer_name
     FROM games 
     JOIN  developers
     ON (games.developer_id = developers.id)
     WHERE games.id = ($1);
     `;
     const { rows } = await pool.query(SQL, [id]);
     return rows;
}

const addGame = async ({title, release_date, developer}) => {
     const SQL = `
     INSERT INTO games (title, release_date, developer_id)
     VALUES ($1, $2, $3);
     `;
     
     await pool.query(SQL, [title, release_date, developer]);
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

const addMonster = async ({name, description, id}) => {
     const SQL = `
     INSERT INTO monsters (name, description, game_id)
     VALUES ($1, $2, $3);
     `;
     
     await pool.query(SQL, [name, description, id]);
}

const updateMonster = async ({name, description, id}) => {
     const SQL = `
     UPDATE monsters 
     SET name = $1, description = $2
     WHERE id = $3;
     `;
     
     await pool.query(SQL, [name, description, id]);
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

const addDeveloper = async ({name, country}) => {
     const SQL = `
     INSERT INTO developers (name, country)
     VALUES ($1, $2);
     `;
     
     await pool.query(SQL, [name, country]);
}

const updateDeveloper = async ({name, country, id}) => {
     const SQL = `
     UPDATE developers 
     SET name = $1, country = $2
     WHERE id = $3;
     `;
     
     await pool.query(SQL, [name, country, id]);
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

const addLocation = async ({name, description, id}) => {
     const SQL = `
     INSERT INTO locations (name, description, game_id)
     VALUES ($1, $2, $3);
     `;

     await pool.query(SQL, [name, description, id]);
}

module.exports = {
     developerList,
     developer,
     addDeveloper,
     updateDeveloper,
     
     developerGameList,
     gameList,
     game,
     addGame,

     gameMonsterList,
     monster,
     addMonster,
     updateMonster,

     gameLocationList,
     location,
     addLocation,
};

