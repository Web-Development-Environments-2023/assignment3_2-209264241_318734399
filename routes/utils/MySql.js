var mysql = require("mysql2");
require("dotenv").config();

const config = {
  connectionLimit: 4,
  bcrypt_saltRounds:13,
  spooncular_apiKey:'e45ade9df77d4855bbeb0c1d0a4ea8f6',
  host: process.env.host, //"localhost"
  user: "root",
  password:"pass_root@123",
  database: "mydb",
};

const pool = mysql.createPool(config);
const connection = () => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, conn) => {
      if (err) {
        reject(err);
        return;
      }
      console.log("MySQL pool connected: threadId " + conn.threadId);

      const query = (sql, binding) => {
        return new Promise((resolve, reject) => {
          conn.query(sql, binding, (err, result) => {
            if (err) {
              reject(err);
              return;
            }
            resolve(result);
          });
        });
      };

      const release = () => {
        return new Promise((resolve, reject) => {
          conn.release();
          console.log("MySQL pool released: threadId " + conn.threadId);
          resolve();
        });
      };

      resolve({ query, release });
    });
  });
};

const query = (sql, binding) => {
  return new Promise((resolve, reject) => {
    pool.query(sql, binding, (err, result, fields) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
};

module.exports = { pool, connection, query };

