/*
    Rutas de Usuarios / Auth
    host + /api/auth
*/

const { Router } = require('express');
const { check } = require('express-validator')
const router = Router();

const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

router.post(
    '/new',
    [// Middlewares
        check('name', 'El nombre es obligatorio').not().isEmpty(), // el nombre debe ser obligatorio y que no este vacio
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres al menos').isLength({ min: 6 }),
        validarCampos
    ],
    crearUsuario );

router.post(
    '/',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de tener al menos 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ],
     loginUsuario );

router.get('/renew', validarJWT ,revalidarToken );


module.exports = router;