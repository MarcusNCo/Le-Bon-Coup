import {body, check, validationResult} from 'express-validator'

export const validateFormConnect = ()=>{
return[
    check('mail').isEmail().withMessage('doit etre un email valide'),

    check('password').isLength({ min: 5 }).withMessage('doit contenir au moins 5 caractères')
]

}

export const validate = (req, res, next) =>{
        const errors = validationResult(req)
        if (errors.isEmpty()) {
            next() 
          }
          if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
          }
}



