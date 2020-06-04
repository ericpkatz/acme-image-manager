const router = require('express').Router()
const {Image, User} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Image.findAll({
    include: [User]
  })
    .then(images => res.send(images))
    .catch(next)
})

router.post('/', (req, res, next) => {
  Image.upload(req.body)
    .then(image => res.send(image))
    .catch(next)
})
