const router = require('express').Router();

const userController = require('../controllers/UserController');

const path = require('path')
const multer = require('multer');

const storage = multer.diskStorage({
    destination: './upload/userimages',
    filename: (req, file, cb) => {  
        return cb(null, `${file.originalname.split('.')[0]}_${((Math.random())).toString().split('.')[1]}${path.extname(file.originalname)}`)
    }
})

const upload = multer(
    {
        storage: storage
    }
)

router.post('/', userController.addUser);
router.post('/imageupload', upload.single('image'), userController.imageUpload);
router.post('/login', userController.login);

module.exports = router;

