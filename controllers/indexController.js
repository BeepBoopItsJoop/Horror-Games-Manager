const indexGet = (req, res) => {
     res.render('index', {
          title: 'Inventory manager',
          // inventory: db.getInventory(),
     });
}

const aboutGet = (req, res) => {
     res.render('about', {
          title: 'About us',
          // inventory: db.getInventory(),
     });
}

module.exports = {
     indexGet,
     aboutGet
};
