import { Pool } from "pg";

// @Bring In Keys for DB from configuration folder
import devKeys from "../config/config";
import prodKeys from "../config/config";
import testKeys from "../config/config";




// @Make connection to the Database Depending on the environment
if (process.env.NODE_ENV === "production") {
  module.exports = new Pool({
    connectionString: prodKeys.DATABASE_URL,
  });
}

if (process.env.NODE_ENV === "test") {
  module.exports = new Pool({
    connectionString: testKeys.DATABASE_URL,
  });

} else {
  module.exports = new Pool({
    connectionString: devKeys.DATABASE_URL,
  });
}