import { PrismaClient } from "@prisma/client";
import { NextFunction, Request,Response, Router } from "express";
const path = require('path');
const router = Router();
const knex = require('knex');

// Create database object
let multerFile: Express.Multer.File;

const db = knex(
    {
        client: 'pg',
        connection: {
            host: '127.0.0.1',
            user: 'postgres',
            password: 'Wycrd123',
            database: 'image_upload',
        },
    }
);

export interface MulterFile {
    key: string // Available using `S3`.
    path: string // Available using `DiskStorage`.
    mimetype: string
    originalname: string
    size: number
  }

const multer = require('multer');
// Create multer object
const imageUpload = multer({
    storage: multer.diskStorage({destination: function (req:any, file:any, cb:any) {cb(null, 'images/');},
            filename: function (req:any, file:any, cb:any) {
                cb(
                    null,
                    new Date().valueOf() +
                    '_' +
                    file.originalname
                );
            }
        }
    ),
});
router.post('/', imageUpload.single('image'), (req: any, res: Response) => {
    const { filename, mimetype, size } = req.file;
    const filepath = req.file?.path;
    db.insert({
            filename,
            filepath,
            mimetype,
            size,
        })
        .into('image_files')
        .then(() => res.json({ success: true, filename }))
        .catch((error:any) => res.json({success: false,message: 'upload failed',stack: error.stack,}));
});
// Image Get Routes
router.get('/:filename', (req, res) => {
    const { filename } = req.params;
    db.select('*').from('image_files').where({ filename }).then((images:any) => {
            if (images[0]) {
                const dirname = path.resolve();
                const fullfilepath = path.join(dirname,images[0].filepath);
                return res.type(images[0].mimetype).sendFile(fullfilepath);
            }
            return Promise.reject(
                new Error('Image does not exist')
            );
        })
        .catch((err:any) => res.status(404).json({success: false, message: 'not found', stack: err.stack,}),);
});

export default router;