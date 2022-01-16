import express, {Router} from 'express'

const controller = require('../controller/blogPostsController') // Change after migrating controller

const router:Router = express.Router()

router.get('/:username', controller.getBlogPostsTitleTime)

router.post('/:username', controller.createBlogPost)

router.put('/:username/:postId', controller.updateBlogPost)

router.delete('/:username/:postId', controller.deleteBlogPost)

router.get('/:username/:postId', controller.getSpecificPost)


export {router as blogPostsRoute}