import express, {Router}  from 'express'

const controller = require('../controller/signUpController') // Change after migrating controller

const router:Router = express.Router()

router.post('/', controller.createNewUser)

export {router as signupRoute}