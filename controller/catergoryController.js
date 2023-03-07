const { findByIdAndDelete } = require('../MOdel/categoriesMOdel')
const Category = require('../MOdel/categoriesMOdel')

// add category

exports.addCategory = async (req, res) => {
    let category = await Category.findOne({ category_name: req.body.category_name })
    if (category) {
        return res.status(404).json({ error: "Category already exist" })
    }
    let categoryTOAdd = new Category({
        category_name: req.body.category_name
    })

    categoryTOAdd = await categoryTOAdd.save()
    if (!categoryTOAdd) {
        return res.status(400).json({ error: "Something went wrong" })

    }
    res.send(categoryTOAdd)
}

/*
find ond(filter) => search and return object {} which matches th filter object
find(filter)=> returns all data in array [], which matches in filter object
find()=> returns all data
findById(id)=>returns the object with id
findByIdAndUpdate(id,{updates},option)=>find an object with given id and updates it with update
findByIdAndDelete(id) or findByIdAndRemove(id)=>find ana object with given id and removes it


req.body => to get value form form
req.params => to get value from url
req.querry => to get value form url using named parameters

res.send => to send object to user
res.status(code).json(object) => to send json data to user with status code
    code - 400 - error
         - 200 - success

res.json(json object) => to send json data to user
*/

//  to get all the categories

exports.getAllCategories = async (req, res) => {
    let categories = await Category.find()
    if (!categories) {
        return res.status(400).json({ error: "Something went wrong" })
    }
    res.send(categories)
}

// to get all the caterogy detail

exports.getAllCategoryDetails = async (req, res) => {
    let category = await Category.findById(req.params.id)
    if (!category) {
        return res.status(400).json({ error: "something went worng" })
    }
    res.send(category)
}


// to update category

exports.updateCategory = async (req,res) => {
    let categoryToUpdate = await Category.findByIdAndUpdate(req.params.id, {
        category_name: req.body.category_name
    }, { new: true })
    if (!categoryToUpdate) {
        return res.status(404).json({ error: "Something went wrong" })
    }
    res.send(categoryToUpdate)
}

// to delete category

// exports.deleteCategory = (res,req)=>{
//     Category.findByIdAndRemove(req.params.id)
//     .then(category=>{
//         if(!category){
//             return res.status(404).json({error: "Category Not Found"})
//         }
//         else{
//             return res.status(200).json({message: "Category deleted sucessfully"})
//         }
//     })
//     .catch(error=>{return res.status(400).json({error:"error message"})})
// }
// delete category usind async await
exports.deleteCategory = async (req, res) => {
    try {
        let categoryToDelete = await Category.findByIdAndRemove(req.params.id)
        if (!categoryToDelete) {
            return res.status(400).json({ error: "Category not found" })
        }
    
    res.status(200).json({ msg: "Category deleted sucessfully" })
    }
    catch(error){
        res.status(400).json({error:error.message})
    }
}
