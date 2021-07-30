import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response, Router } from "express";
const path = require('path');
const router = Router();
const knex = require('knex');

// Create database object
let multerFile: Express.Multer.File;

const db = knex(
    {
        client: 'pg',
        connection: {
            // host: '127.0.0.1',
            // user: 'postgres',
            // password: 'Wycrd123',
            // database: 'beers', //crear tabla en beers y cambiar abajito
            host: 'ec2-52-0-67-144.compute-1.amazonaws.com',
            user: 'kbtkcaykkepdot',
            password: 'cb5d9106fb333421b4e0cab09693f5d9fcb378d53e7b606286e0d3c57081a598',
            database: 'dd5nk5u7f9hepv', //crear tabla en beers y cambiar abajito
        },
    }
);

export interface MulterFile {
    key: string
    path: string
    mimetype: string
    originalname: string
    size: number
}

const multer = require('multer');
// Create multer object
const imageUpload = multer({
    storage: multer.diskStorage({
        destination: function (req: any, file: any, cb: any) { cb(null, 'images/'); },
        filename: function (req: any, file: any, cb: any) {
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
    console.log( process.env.HOST, process.env.USER, process.env.PASSWORD, process.env.DATABASE, "DOT ENV")
    console.log(req.file,"fileeeeeee")
    const { filename, mimetype, size } = req.file;
    const filepath = req.file?.path;
    db.insert({
        filename,
        filepath,
        mimetype,
        size,
    })
        .into('image_upload')
        .then(() => res.json({ success: true, filename }))
        .catch((error: any) => res.status(400).json({ success: false, message: 'upload failed', stack: error.stack, }));
});


// Image Get Routes
router.get('/:filename', (req, res) => {
    const { filename } = req.params;
    db.select('*').from('image_upload').where({ filename }).then((images: any) => {
        if (images[0]) {
            const dirname = path.resolve();
            const fullfilepath = path.join(dirname, images[0].filepath);
            return res.type(images[0].mimetype).sendFile(fullfilepath);
        }
        return Promise.reject(
            new Error('Image does not exist')
        );
    })
        .catch((err: any) => res.status(404).json({ success: false, message: 'not found', stack: err.stack, }),);
});

export default router;