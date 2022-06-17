import { body } from 'express-validator'

// Custom error messages enable easier translation in the frontend
const userValidators = [
    body("email").isWhitelisted("abcdfghijklmnopqrstuvxyz1234567890-_").withMessage("username-invalid"),
    body("email").isEmail().withMessage("email-invalid"),
    body("password").isLength({ min: 8 }).withMessage("password-too-short"),
    body("password").isLength({ max: 28 }).withMessage("password-too-long"),
    body("password").isStrongPassword().withMessage("password-too-weak"),
]

export default userValidators