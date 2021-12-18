const express = require('express')

const router = express.Router()

const controller = require('../controller/blogPostsController')

router.get('/:username', controller.getBlogPostsTitleTime)

// router.post('/:username')

// router.put('/:username/:postId')

// router.delete('/:username/:postId')

// router.get('/:username/:postId')


module.exports = router