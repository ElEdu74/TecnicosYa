const Category = require('../models/category');

module.exports = {

    create(req, res) {

        const category = req.body;

        Category.create(category, (err, id) => {

            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con el registro de la categoría',
                    error: err
                });
            }

            return res.status(201).json({
                success: true,
                message: 'La categoría se creó correctamente',
                data: `${id}`
            });

        });

    },

    getAll(req, res) {
        Category.getAll((err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al obtener las categorías',
                    error: err
                });
            }

            return res.status(201).json(data);
        });
    }

}