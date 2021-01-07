const { Query } = require("../../database/index");

const getAllProducts = async () =>
  await Query(`SELECT P.*, 
(SELECT Floor(Avg(R.rating)) 
 FROM   reviews R 
 WHERE  R.product_id = P.product_id) AS Rating 
FROM   product P; `);

module.exports = { getAllProducts };