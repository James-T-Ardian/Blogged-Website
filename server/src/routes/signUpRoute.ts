import express, {Router}  from 'express'

import * as  signUpController from '../controller/signUpController' 

const router:Router = express.Router()

// Routes
router.post('/', signUpController.createNewUser)

export {router as signupRoute}