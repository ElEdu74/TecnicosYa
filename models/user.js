const db = require('../config/config');
const bcrypt = require('bcryptjs');

const User = {};

User.findById = (id, result) => {

    const sql = `
    SELECT
        CONVERT(U.id, char) AS id,
        U.email,
        U.name,
        U.lastname,
        U.image,
        U.phone,
        U.password,
        UJSON.roles
        FROM
            users AS U
        INNER JOIN
            (
                SELECT id_usuario_json, CONCAT('[', resultado, ']') AS roles FROM
                (
                SELECT id_usuario_json, GROUP_CONCAT('{', my_json, '}' SEPARATOR ',') AS resultado FROM
                (
                SELECT 
                    U.id AS id_usuario_json,
                    CONCAT
                    (
                    '"id": '   , '"', RJSON.id, '"', ', ' 
                    '"name": '   , '"', RJSON.name, '"', ', ' 
                    '"image": '   , '"', RJSON.image, '"', ', ' 
                    '"route": ', '"', RJSON.route, '"'
                    ) AS my_json
				FROM users AS U
				INNER JOIN user_has_roles AS UHR
				ON UHR.id_user = U.id
				INNER JOIN roles AS RJSON
				ON UHR.id_rol = RJSON.id
                ) AS more_json
                GROUP BY id_usuario_json
                ) AS yet_more_json
            ) AS UJSON
        ON
            UJSON.id_usuario_json = U.id
    WHERE
        U.id = ?
	GROUP BY
		U.id
    `;

    db.query(
        sql,
        [id],
        (err, user) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                result(null, user[0]);
            }
        }
    )

}

User.findTechnicals = (result) => {
    const sql = `
    SELECT 
        CONVERT(U.id, char) AS id,
        U.email,
        U.name,
        U.lastname,
        U.image,
        U.phone
    FROM 
        users AS U
    INNER JOIN
        user_has_roles AS UHR
    ON
        UHR.id_user = U.id
    INNER JOIN
        roles as R
    ON
        R.id = UHR.id_rol
    WHERE
        R.id = 2;    
    `;

    db.query(
        sql,
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

User.findEmail = (email, result) => {

    const sql = `
    SELECT
        CONVERT(U.id, char) AS id,
        U.email,
        U.name,
        U.lastname,
        U.image,
        U.phone,
        U.password,
        UJSON.roles
        FROM
            users AS U
        INNER JOIN
            (
                SELECT id_usuario_json, CONCAT('[', resultado, ']') AS roles FROM
                (
                SELECT id_usuario_json, GROUP_CONCAT('{', my_json, '}' SEPARATOR ',') AS resultado FROM
                (
                SELECT 
                    U.id AS id_usuario_json,
                    CONCAT
                    (
                    '"id": '   , '"', RJSON.id, '"', ', ' 
                    '"name": '   , '"', RJSON.name, '"', ', ' 
                    '"image": '   , '"', RJSON.image, '"', ', ' 
                    '"route": ', '"', RJSON.route, '"'
                    ) AS my_json
				FROM users AS U
				INNER JOIN user_has_roles AS UHR
				ON UHR.id_user = U.id
				INNER JOIN roles AS RJSON
				ON UHR.id_rol = RJSON.id
                ) AS more_json
                GROUP BY id_usuario_json
                ) AS yet_more_json
            ) AS UJSON
        ON
            UJSON.id_usuario_json = U.id
    WHERE
        email = ?
	GROUP BY
		U.id
	`;

    db.query(
        sql,
        [email],
        (err, user) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                result(null, user[0]);
            }
        }
    )

}

User.create = async (user, result) => {

    const hash = await bcrypt.hash(user.password, 10);

    const sql = `
        INSERT INTO
            users(
                email,
                name,
                lastname,
                phone,
                image,
                password,
                created_at,
                updated_at
            )
        VALUES(?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query
    (
        sql,
        [
            user.email,
            user.name,
            user.lastname,
            user.phone,
            user.image,
            hash,
            new Date(),
            new Date()
        ],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Id del nuevo usuario: ', res.insertId);
                result(null, res.insertId);
            }
        }
    )

}

User.update = (user, result) => {

    const sql = `
    UPDATE
        users
    SET
        name = ?,
        lastname = ?,
        phone = ?,
        image = ?,
        updated_at = ?
    WHERE
        id = ?
    `;

    db.query
    (
        sql,
        [
            user.name,
            user.lastname,
            user.phone,
            user.image,
            new Date(),
            user.id
        ],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Usuario actualizado: ', user.id);
                result(null, user.id);
            }
        }
    )

}

User.updateWithoutImage = (user, result) => {

    const sql = `
    UPDATE
        users
    SET
        name = ?,
        lastname = ?,
        phone = ?,
        updated_at = ?
    WHERE
        id = ?
    `;

    db.query
    (
        sql,
        [
            user.name,
            user.lastname,
            user.phone,
            new Date(),
            user.id
        ],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Usuario actualizado: ', user.id);
                result(null, user.id);
            }
        }
    )

}

module.exports = User;