exports.indexGet = (req, res) => {
     res.render('index', {
          title: 'Inventory manager',
          // inventory: db.getInventory(),
     });
}

exports.aboutGet = (req, res) => {
     res.render('about', {
          title: 'About us',
          // inventory: db.getInventory(),
     });
}
