const router = require('express').Router();

const productController = require('../controllers/productController');
 
const path = require('path')
const multer = require('multer');

const storage = multer.diskStorage({
    destination: './upload/productimages',
    filename: (req, file, cb) => {  
        return cb(null, `${file.originalname.split('.')[0]}_${((Math.random())).toString().split('.')[1]}${path.extname(file.originalname)}`)
    }
})

const upload = multer(
    {
        storage: storage
    }
)

router.post('/', productController.addProduct);
router.get('/search', productController.searchProduct);
router.get('/single/:id', productController.singleProduct);
router.delete('/delete', productController.deleteProduct);
router.put('/update', productController.updateProduct);
router.post('/imageupload', upload.single('image'),productController.imageUpload);

module.exports = router;

