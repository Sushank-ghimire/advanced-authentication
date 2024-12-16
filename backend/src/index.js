import app from "./app.js";
import { configDotenv } from "dotenv";
import pool from "./utils/DbConfig.js";
configDotenv();

const PORT = process.env.PORT || 3000;

pool
  .getConnection()
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `Server is listining on port : ${PORT}`
      );
    });
  })
  .catch((error) => {
    console.log(`Error occured while creating datbase connection : ${error}`);
  });
