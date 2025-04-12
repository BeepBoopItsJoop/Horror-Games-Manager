require('dotenv').config();
const express = require('express');
const app = express();
const indexRouter = require('./routes/indexRouter');

const InvalidParamError = require('./errors/InvalidParamError');;

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/', indexRouter);

app.use((err, req, res, next) => {
     if(err.statusCode === 404) {
          console.log(err);
          res.status(err.statusCode).render('404', {title: 'Not found', url: err.url});
     } else if(err.name === 'InvalidParamError') {
          console.log(err);
          res.status(err.statusCode).render('invalidParam', {title: 'Invalid parameters', url: err.url})
     } else {
          console.log(err);
          // TODO: 500 page
          res.status(err.statusCode || 500).send(err.message);
     }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`App running on port ${PORT}`));
