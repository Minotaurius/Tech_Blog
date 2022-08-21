const express = require('express');
const path = require('path');
const { engine } = require('express-handlebars');
const db = require('./config/connection');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

require('dotenv').config();

const { view_routes, auth_routes, dash_routes } = require('./controllers');

const PORT = process.env.PORT || 9000;
const app = express();

app.use(express.static(path.join('front')));
app.engine('hbs', engine({ extname: '.hbs'}));
app.set('view engine', 'hbs')
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(session({
    secret: process.env.SECRET,
    store: new SequelizeStore({ db }),
    saveUninitialized: false,
    resave: false,
    cookie: {

    }
}));

app.use('/', view_routes);
app.use('/auth', auth_routes);
app.use('/dashboard', dash_routes);
// app.use('/comment', comm_routes);
// app.use('/post', post_routes);
// app.use(require('./controllers'));

db.sync().then(() => {
    app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));
});