const usersController = require('../controllers/usersControllers');
const passport = require('passport');

module.exports = (app, upload) => {
    
    app.get('/api/users/findTechnicals', passport.authenticate('jwt', { session: false }), usersController.findTechnicals);

    app.post('/api/users/create', usersController.register);
    app.post('/api/users/createWithoutImage', usersController.registerWithoutImage);
    app.post('/api/users/createWithImage', upload.array('image', 1), usersController.registerWithImage);
    app.post('/api/users/login', usersController.login);

    app.put('/api/users/update', passport.authenticate('jwt', { session: false }), upload.array('image', 1), usersController.updateWithImage);
    app.put('/api/users/updateWithoutImage', passport.authenticate('jwt', { session: false }), usersController.updateWithoutImage);

}