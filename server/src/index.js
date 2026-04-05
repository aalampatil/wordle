import "./config/env.js"
import { connectDB } from "./db/db.js";
import app from "./app.js";

const port = process.env.PORT;

connectDB().then(() => {
    app.on("error", (error) => {
      console.error('index.js connectDB on error', error);
    });

    app.listen(port, () => {
      console.log(`server is listening on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log("fileName - index.ts connectDb catch statement ", error); 
  });


  