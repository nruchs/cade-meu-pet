const multer = require("multer");
const path = require("path");

// Configuração do armazenamento
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../public/uploads"));
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

// Configuração do Multer
const upload = multer({
    storage: storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // Limite de 2 MB
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png/;
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = fileTypes.test(file.mimetype);
        
        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb("Apenas arquivos JPEG, JPG e PNG são permitidos!");
        }
    }
});

module.exports = upload;
