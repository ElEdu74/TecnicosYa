const Address = require('../models/address');

module.exports = {

    findByUser(req, res) {
        const id_user= req.params.id_user;
        Address.findByUser(id_user, (err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error obteniendo direcciones',
                    error: err
                });
            }
            //console.log('Direcciones obtenidas: ', res.status(201).json(data));
            return res.status(201).json(data);

        })
    },

    create(req, res) {

        const address = req.body;

        Address.create(address, (err, id) => {

            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con el registro de la dirección',
                    error: err
                });
            }

            return res.status(201).json({
                success: true,
                message: 'La dirección se creó correctamente',
                data: `${id}`
            });

        });

    },

}