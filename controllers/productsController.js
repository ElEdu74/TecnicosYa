const Product = require('../models/product');
const storage = require('../utils/cloud_storage');
const asyncForEach = require('../utils/async_foreach');


module.exports = {

    findByCategory(req, res) {
        const id_category = req.params.id_category;

        Product.findByCategory(id_category, (err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al obtener los productos',
                    error: err
                });
            }

            return res.status(201).json(data);
        });
    },

    create(req, res) {
        const product = req.body;

        let inserts = 0;
        Product.create(product, (err, id) => {

            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con el registro del producto',
                    error: err
                });
            }

            return res.status(201).json({
                success: true,
                message: 'El producto se creó correctamente',
                data: `${id}`
            })
        })
    }
}
