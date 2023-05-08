const db = require('../config/config');

const Order = {};

Order.findByStatus = (status, result) => {

    const sql = `
    SELECT
        CONVERT(O.id, char) AS id,
        CONVERT(O.id_client, char) AS id_client,
        CONVERT(O.id_address, char) AS id_address,
        CONVERT(O.id_technical, char) AS id_technical,
        O.status,
        O.timestamp,
        O.lat,
        O.lng,
        CONVERT(O.rating, char) AS rating,
        O.obs_rating,
        JSON_OBJECT(
            'id', CONVERT(A.id, char),
            'address', A.address,
            'neighborhood', A.neighborhood,
            'lat', A.lat,
            'lng', A.lng
        ) AS address,
        JSON_OBJECT(
            'id', CONVERT(U.id, char),
            'name', U.name,
            'lastname', U.lastname,
            'image', U.image,
            'phone', U.phone
        ) AS client,
        JSON_OBJECT(
            'id', CONVERT(U2.id, char),
            'name', U2.name,
            'lastname', U2.lastname,
            'image', U2.image,
            'phone', U2.phone
        ) AS delivery,
        JSON_ARRAYAGG(
            JSON_OBJECT(
                'id', CONVERT(P.id, char),
                'name', P.name,
                'description', P.description,
                'image1', P.image1,
                'image2', P.image2,
                'image3', P.image3,
                'price', P.price,
                'quantity', OHP.quantity
            )
        ) AS products
    FROM 
        orders AS O
    INNER JOIN
        users AS U
    ON
        U.id = O.id_client
	LEFT JOIN
		users AS U2
	ON
		U2.id = O.id_technical
    INNER JOIN
        address AS A
    ON
        A.id = O.id_address 
    INNER JOIN
        order_has_products AS OHP
    ON
        OHP.id_order = O.id
    INNER JOIN
        products AS P
    ON
        P.id = OHP.id_product
    WHERE 
        status = ?
    GROUP BY
        O.id
	ORDER BY
		O.timestamp;
    `;

    db.query(
        sql,
        status,
        (err, data) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                result(null, data);
            }
        }
    )
}

Order.findByClientAndStatus = (id_client, status, result) => {
    const sql = `
    SELECT 
    CONVERT(O.id, char) AS id,
    CONVERT(O.id_client, char) AS id_client,
    CONVERT(O.id_address, char) AS id_address,
    CONVERT(O.id_technical, char) AS id_technical,
    O.status,
    O.timestamp,
    O.lat,
    O.lng,
    CONVERT(O.rating, char) AS rating,
    O.obs_rating,
    JSON_OBJECT(
        'id', CONVERT(A.id, char),
        'address', A.address,
        'cp', A.cp,
        'neighborhood', A.neighborhood,
        'lat', A.lat,
        'lng', A.lng
    ) AS address,
    JSON_OBJECT(
        'id', CONVERT(U.id, char),
        'name', U.name,
        'lastname', U.lastname,
        'image', U.image,
        'phone', U.phone
    ) AS client,
    JSON_OBJECT(
        'id', CONVERT(U2.id, char),
        'name', U2.name,
        'lastname', U2.lastname,
        'image', U2.image,
        'phone', U2.phone
    ) AS technical,
    JSON_ARRAYAGG(
        JSON_OBJECT(
        'id', CONVERT(P.id, char),
        'name', P.name,
        'description', P.description,
        'image1', P.image1,
        'image2', P.image2,
        'image3', P.image3,
        'price', P.price,
        'quantity', OHP.quantity,
        'equipo', OHP.equipo,
        'problema', OHP.problema,
        'horario', OHP.horario
        )
    ) AS products
    FROM
        orders AS O
    INNER JOIN
        users AS U
    ON
        U.id = O.id_client
    LEFT JOIN
        users AS U2
    ON
        U2.id = O.id_technical
    INNER JOIN
        address AS A
    ON
        A.id = O.id_address
    INNER JOIN
        order_has_products AS OHP
    ON 
        OHP.id_order = O.id
    INNER JOIN
        products AS P
    ON P.id = OHP.id_product
    WHERE
        O.id_client = ? AND status = ?
    GROUP BY
        O.id
    ORDER BY
        O.timestamp
    ;    
`;

    db.query(
        sql,
        [
            id_client,
            status
        ],
        (err, data) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log("data");
                console.log(data);
                result(null, data);
            }
        }
    )
}

Order.findByTechnicalAndStatus = (id_technical, status, result) => {
    const sql = `
    SELECT 
    CONVERT(O.id, char) AS id,
    CONVERT(O.id_client, char) AS id_client,
    CONVERT(O.id_address, char) AS id_address,
    CONVERT(O.id_technical, char) AS id_technical,
    O.status,
    O.timestamp,
    O.lat,
    O.lng,
    CONVERT(O.rating, char) AS rating,
    O.obs_rating,
    JSON_OBJECT(
        'id', CONVERT(A.id, char),
        'address', A.address,
        'neighborhood', A.neighborhood,
        'lat', A.lat,
        'lng', A.lng
    ) AS address,
    JSON_OBJECT(
        'id', CONVERT(U.id, char),
        'name', U.name,
        'lastname', U.lastname,
        'image', U.image,
        'phone', U.phone
    ) AS client,
    JSON_OBJECT(
        'id', CONVERT(U2.id, char),
        'name', U2.name,
        'lastname', U2.lastname,
        'image', U2.image,
        'phone', U2.phone
    ) AS technical,
    JSON_ARRAYAGG(
        JSON_OBJECT(
        'id', CONVERT(P.id, char),
        'name', P.name,
        'description', P.description,
        'image1', P.image1,
        'image2', P.image2,
        'image3', P.image3,
        'price', P.price,
        'quantity', OHP.quantity
        )
    ) AS products
    FROM
        orders AS O
    INNER JOIN
        users AS U
    ON
        U.id = O.id_client
    LEFT JOIN
        users AS U2
    ON
        U2.id = O.id_technical
    INNER JOIN
        address AS A
    ON
        A.id = O.id_address
    INNER JOIN
        order_has_products AS OHP
    ON 
        OHP.id_order = O.id
    INNER JOIN
        products p
    ON P.id = OHP.id_product
    WHERE
        O.id_technical = ? AND status = ?
    GROUP BY
        O.id
    ORDER BY
        O.timestamp
    ;    
`;

    db.query(
        sql,
        [
            id_technical,
            status
        ],
        (err, data) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Id de la nueva orden: ', data);
                result(null, data);
            }
        }
    )
}

Order.create = (order, result) => {

    const sql = `
        INSERT INTO
            orders(
                id_client, 
                id_Address,
                status,
                timestamp, 
                created_at, 
                updated_at
            )
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            order.id_client,
            order.id_address,
            'PEDIDO', //order.status, //1.PEDIDO 2.ASIGNADO 3.CUMPLIDO
            Date.now(),
            new Date(),
            new Date()
        ],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Id de la nueva orden: ', res.insertId);
                result(null, res.insertId);
                console.log(order.id_client);
                console.log(order.id_address);
                console.log(Date.now());
                console.log(Date());
                }
        }
    )


}

Order.updateToAsignada = (id_order, id_technical, result) => {
    const sql = `
    UPDATE
        orders
    SET
        id_technical = ?,
        status = ?,
        updated_at = ?
    WHERE
        id = ?
    `;

    db.query(
        sql,
        [
            id_technical,
            'ASIGNADO', //order.status, //1.PEDIDO 2.ASIGNADO 3.CUMPLIDO
            new Date(),
            id_order
        ],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                result(null, id_order);
            }
        }
    )
}

Order.updateToCumplida = (id_order, result) => {
    const sql = `
    UPDATE
        orders
    SET
        status = ?,
        updated_at = ?
    WHERE
        id = ?
    `;

    db.query(
        sql,
        [
            'CUMPLIDO', //order.status, //1.PEDIDO 2.ASIGNADO 3.CUMPLIDO
            new Date(),
            id_order
        ],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                result(null, id_order);
            }
        }
    )
}

Order.updateLatLng = (order, result) => {
    const sql = `
    UPDATE
        orders
    SET
        lat = ?,
        lng = ?,
        updated_at = ?
    WHERE
        id = ?
    `;

    db.query(
        sql,
        [
            order.lat,
            order.lng,
            new Date(),
            order.id
        ],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                result(null, order.id);
            }
        }
    )
}

Order.updateTechnical = (order, result) => {
    const sql = `
    UPDATE
        orders
    SET
        id_technical = ?,
        status = ?,
        updated_at = ?
    WHERE
        id = ?
    `;

    db.query(
        sql,
        [
            order.id_technical,
            order.status,
            new Date(),
            order.id
        ],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                result(null, order.id);
            }
        }
    )
}

Order.updateQualify = (order, result) => {
    const sql = `
    UPDATE
        orders
    SET
        rating = ?,
        updated_at = ?
    WHERE
        id = ?
    `;

    db.query(
        sql,
        [
            order.rating,
            new Date(),
            order.id
        ],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                result(null, order.id);
            }
        }
    )
}

module.exports = Order;
