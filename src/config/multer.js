const multer = require('multer')
const path = require('path')
const crypto = require('crypto')

module.exports = {

    dest : path.resolve(__dirname, '..', '..','tmp','uploads'),
    storage: multer.diskStorage({
        destination: (req, files, cb) => {
            cb(null, path.resolve(__dirname, '..', '..','tmp','uploads'))
        },
        filename: (req, files, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                if(err) cb(err)

                const fileName = `${hash.toString('hex')}-${files.originalname}`
                cb(null, fileName)
            })
        }
    }),
    limits: {
        fileSize: 6 * 1024 * 1024,
        files: 5,
    }

}