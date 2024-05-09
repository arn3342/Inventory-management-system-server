const Categories = require('../models/Categories');
const Product = require('../models/Product');

const getAllCategories = async (req, res) => {
    console.log("first")
    try {
        Categories.find()
            .then(data => res.send(data))
    }
    catch (error) {
        console.log(error);
    }
}
const deleteCategories = (req, res) => {
    const id = req.query.id;
    Product.deleteMany({ categoryId: id })
        .then(result => {

        })
    Categories.deleteOne({ _id: id })
        .then(result => {
            res.send(result)
        })
}
const addCategories = (req, res) => {

    let category = new Categories({
        name: req.body.name,
    })

    category.save()
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
module.exports = {
    getAllCategories,
    deleteCategories,
    addCategories
}