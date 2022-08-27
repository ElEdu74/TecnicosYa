const Order = require('../models/orders');
const OrderHasProducts = require('../models/order_has_products');

module.exports = {

    findByStatus(req, res) {
        const status = req.params.status;

        Order.findByStatus(status, (err, data) => {
            if (err) { 
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con el listado de órdenes',
                    error: err
                });
            }

            // codigo para parsear el json, no hace falta

            return res.status(201).json(data);
        });
    },

    findByTechnicalAndStatus(req, res) {
        const id_technical = req.params.id_technical;
        const status = req.params.status;

        Order.findByTechnicalAndStatus(id_technical, status, (err, data) => {
            if (err) { 
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con el listado de órdenes',
                    error: err
                });
            }

            // codigo para parsear el json, no hace falta

            return res.status(201).json(data);
        });
    },

    async create(req, res) {

        const order = req.body;

        Order.create(order, async (err, id) => {

            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con el registro de la orden',
                    error: err
                });
            }

            for (const product of order.products) {
                await OrderHasProducts.create(id, product.id, product.quantity, (err, id_data) => {
                    if (err) {
                        return res.status(501).json({
                            success: false,
                            message: 'Hubo un error con el registro de los productos de la orden',
                            error: err
                        });
                    }
        
                });

            }

            return res.status(201).json({
                success: true,
                message: 'La orden se creó correctamente',
                data: `${id}`
            });

        });

    },

    updateToDispatched(req, res) {
        const order = req.body;

        Order.updateToDispatched(order.id, order.id_technical, (err, id_order) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con la actualización de la orden',
                    error: err
                });
            }

            return res.status(201).json({
                success: true,
                message: 'La orden se actualizó correctamente',
                data: `${id_order}`
            });
  
        })
    },

    updateToOnTheWay(req, res) {
        const order = req.body;

        Order.updateToOnTheWay(order.id, (err, id_order) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con la actualización de la orden',
                    error: err
                });
            }

            return res.status(201).json({
                success: true,
                message: 'La orden se actualizó correctamente',
                data: `${id_order}`
            });
  
        })
    },

    updateLatLng(req, res) {
        const order = req.body;

        Order.updateLatLng(order, (err, id_order) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con la actualización de la orden',
                    error: err
                });
            }

            return res.status(201).json({
                success: true,
                message: 'La orden se actualizó correctamente',
                data: `${id_order}`
            });
  
        })
    }

}