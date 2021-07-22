const multer = require('multer')


const storage = multer.diskStorage({
    destination: function (req: any, file: any, cb: any) {
        cb(null, 'uploads')
    },
    filename: function (req: any, file: any, cb: any) {
        cb(null, file.fieldname + '-' + Date.now())
    }
})

const upload = multer({ storage: storage })

exports.upload = upload.single('myFile')

exports.uploadFile = (req: any, res: any) => {
    res.send({ data: 'Enviar un archivo' })
}
