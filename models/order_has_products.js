const db = require('../config/config');

const OrderHasProducts = {};



OrderHasProducts.create = (id_order, id_product, quantity, equipo, problema, horario, result) => {

    console.log('OrderHasProducts.create ',id_order, id_product, quantity, equipo, problema, horario);
    const sql = `
        INSERT INTO
            order_has_products(
                id_order, 
                id_product,
                quantity,
                equipo,
                problema,
                horario,
                created_at, 
                updated_at
            )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            id_order, 
            id_product,
            quantity,
            equipo,
            problema,
            horario,
            new Date(),
            new Date()
        ],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Id de la nueva orden_has_products: ', res.insertId);
                result(null, res.insertId);
            }
        }
    )


}


module.exports = OrderHasProducts;
