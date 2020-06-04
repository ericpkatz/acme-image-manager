const crypto = require('crypto')
const Sequelize = require('sequelize')
const {UUID, UUIDV4, STRING} = Sequelize
const db = require('../db')
const AWS = require('aws-sdk')

const S3 = new AWS.S3()

const Image = db.define('image', {
  id: {
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4
  },
  URL: {
    type: STRING
  },
  userId: {
    type: UUID,
    allowNull: false
  }
})

Image.upload = function({userId, data}) {
  const regex = new RegExp(/^data:image\/(\w+);.*/)
  const extension = regex.exec(data)[1]
  const Body = Buffer.from(
    data.replace(/^data:image\/\w+;base64,/, ''),
    'base64'
  )
  const ContentType = `image/${extension}`
  const image = Image.build({userId})
  return new Promise((resolve, reject) => {
    S3.upload(
      {
        Bucket: process.env.BUCKET,
        Body,
        Key: `${image.id}.${extension}`,
        ContentType,
        ContentEncoding: 'base64',
        ACL: 'public-read'
      },
      (err, response) => {
        if (err) {
          return reject(err)
        }
        if (response) {
          image.URL = response.Location
          image
            .save()
            .then( image => image.reload({
              include: [
                db.models.user
              ]
            }))
            .then(image => resolve(image))
            .catch(ex => reject(ex))
        }
      }
    )
  })
}

module.exports = Image
