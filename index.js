// Dev comments :
//
// All uncommented lines reason (https unactive)
// ------------------------------------------------------------------------------
const app = require("express")();
const http = require("http")
const server = http.createServer(app);
const apiRouter = require("./apiRouter").router;
const bodyparser = require("body-parser");


app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, tokensession");
  next();
});
app.use("/", apiRouter);

server.listen(process.env.PORT || 1339);