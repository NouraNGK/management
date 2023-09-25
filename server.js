// import app
const app = require("./backend/app");

// start server on: http://localhost:3003
app.listen(3003,()=>{
    console.log("Express Application is Listening on PORT 3003")
});