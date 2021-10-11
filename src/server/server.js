const path = require("path");
const express = require("express");
const handlebars = require("express-handlebars");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("express-flash");

const expressFlashRoutes = require("../routes/express-flash.route"); // Solution - 1 (using express-flash)
const customFlashRoutes = require("../routes/custom-flash.route"); // Solution - 2 (using custom middleware)

const PORT = 4000;

const app = express();

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.set("view engine", "hbs");
app.engine(
  "hbs",
  handlebars({
    layoutsDir: path.join(__dirname, "../../views/layouts/"),
    partialsDir: path.join(__dirname, "../../views/partials/"),
    extname: "hbs",
  })
);
app.use(express.static(path.join(__dirname, "../../public/")));

app.use(cookieParser("secret"));
app.use(session({ 
    cookie: { maxAge: 60000 },
    saveUninitialized: true,
    resave: 'true',
    secret: 'secret'
 }));

/** Solution - 1 :: START */
app.use(flash());
app.use("/", expressFlashRoutes);

/** Solution - 1 :: END */

/** Solution - 2 :: START */
/** 
 * A custom middleware to read and delete messages on a request session
 * Note: - use only with customFlashRoutes routes in this app
 *
app.use(function(req, res, next){
    res.locals.sessionFlashMessages = req.session.sessionFlashMessages;
    delete req.session.sessionFlashMessages;
    next();
});

app.use("/", customFlashRoutes);
/** Solution - 2 :: END */

module.exports = app;
