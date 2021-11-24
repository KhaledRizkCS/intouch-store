// requirements
require("dotenv").config();
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var router = require("./routes/apis");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const cors = require('cors');

// initialization
var app = express();

// middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());


// swagger documentation
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      version: "1.0.0",
      title: "Intouch Store API Documentation",
      description: "Information Regarding The Intouch Store API",
    },
  },
  // ['.routes/*.js']
  apis: ["app.js", "routes/apis.js"],
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// routes
/**
 * @swagger
 * /:
 *  get:
 *    description: Use to make sure the server is running
 *    responses:
 *      '200':
 *        description: Success
 *      '500':
 *        description: Server error
 */
app.get("/", (req, res) => {
  res.send("The Server Is Running!");
});

// apis router
app.use("/api", router);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
});

module.exports = app;
