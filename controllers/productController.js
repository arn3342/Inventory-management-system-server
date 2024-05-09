const { ObjectId } = require('mongodb');
const Product = require('../models/Product');


const addProduct = async (req, res) => {
    let product = new Product({
        name: req.body.name,
        email: req.body.email,
        price: req.body.price,
        categoryId: req.body.categoryId,
        image: req.body.image
    })

    product.save()
        .then(result => {
            if (result) {
                res.send({ message: "product insert successfully!", acknowledged: true })
            }
            else {
                res.send({ message: "Product cann't inserted!" })
            }
        })
        .catch(error => {
            console.log(error);
        })
}

const imageUpload = async (req, res) => {
    const url = req?.file?.path;
    res.send({ path: url });
}

const searchProduct = async (req, res) => {
    const id = req.query.id;
    const email = req.query.email;
    if (id == 'All') {
        Product.find({ email: email })
            .then(result => {
                res.send(result)
            })
    }
    else {
        Product.find({ categoryId: id, email: email })
            .then(result => {
                res.send(result)
            })
    }
}
const singleProduct = async (req, res) => {
    const id = req.params.id;
    Product.find({ _id: id })
        .then(result => {
            res.send(result)
        })

}
const deleteProduct = async (req, res) => {
    const id = req.query.id;
    Product.deleteOne({ _id: id })
        .then(result => {
            res.send(result)
        })
}
const updateProduct = async (req, res) => {
    const id = req.query.id;
    const email = req.query.email;
    Product.updateOne({ _id: id, email: email }, { $set: { name: req.body.name, price: req.body.price } })
        .then(result => {
            res.send(result)
        })
}
module.exports = {
    addProduct,
    imageUpload,
    searchProduct,
    deleteProduct,
    singleProduct,
    updateProduct
}