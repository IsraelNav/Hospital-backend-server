exports.validacionUsuario = (req, res, next) => {
    req.check("nombre", "Nombre es requerido").notEmpty();
    req.check("email", "Email debe tener entre 3 y 32 caracteres")
        .matches(/.+\@.+\..+/)
        .withMessage("Email debe contener @")
        .isLength({
            min: 4,
            max: 32
        });
    req.check("password", "Password es requerido").notEmpty();
    req.check("password")
        .isLength({ min: 6 })
        .withMessage("Password debe contener al menos 6 caracteres")
        .matches(/\d/)
        .withMessage("Password debe contener un numero");
    const errors = req.validationErrors();
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
     next();
};

exports.updateUsuario = (req, res, next) => {
    req.check("nombre", "Nombre es requerido").notEmpty();
    req.check("email", "Email debe tener entre 3 y 32 caracteres")
        .matches(/.+\@.+\..+/)
        .withMessage("Email debe contener @")
        .isLength({
            min: 4,
            max: 32
        });
    req.check("role","role es requerido").notEmpty();
    const errors = req.validationErrors();
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
     next();
};

exports.loginUsuario = (req, res, next) => {
    req.check("email", "El email es obligatorio")
        .notEmpty();

    req.check("password","El password es requerido").notEmpty();
    const errors = req.validationErrors();
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
     next();
};

exports.validarHospital = (req, res, next) => {
    req.check("nombre", "El nombre es obligatorio")
        .notEmpty();
    const errors = req.validationErrors();
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
     next();
};

exports.validarMedico = (req, res, next) => {
    req.check("nombre", "El nombre es obligatorio").notEmpty();
    req.check("hospital", "El hospital id debe ser valido").isMongoId();
    const errors = req.validationErrors();
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
     next();
};

exports.validarGoogle = (req, res, next) => {
    req.check("token", "El token de Google es obligatorio").notEmpty();
    const errors = req.validationErrors();
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
     next();
};
