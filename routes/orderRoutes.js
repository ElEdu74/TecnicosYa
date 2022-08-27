const ordersController = require('../controllers/ordersController');
const passport = require('passport');

module.exports = (app) => {
    
    app.get('/api/orders/findByStatus/:status', passport.authenticate('jwt', { session: false }), ordersController.findByStatus);
    app.get('/api/orders/findByTechnicalAndStatus/:id_technical/:status', passport.authenticate('jwt', { session: false }), ordersController.findByTechnicalAndStatus);

    app.post('/api/orders/create', passport.authenticate('jwt', { session: false }), ordersController.create);

    app.put('/api/orders/updateToDispatched', passport.authenticate('jwt', { session: false }), ordersController.updateToDispatched);
    app.put('/api/orders/updateToOnTheWay', passport.authenticate('jwt', { session: false }), ordersController.updateToOnTheWay);
    app.put('/api/orders/updateLatLng', passport.authenticate('jwt', { session: false }), ordersController.updateLatLng);
 
}