var express = require("express")
var router = express.Router()
const CyclicDB = require('@cyclic.sh/dynamodb')
const db = CyclicDB(process.env.CYCLIC_DB)
let dishes = db.collection('dishes')



router.get("/", async function(req, res){
    const all_dishes = await dishes.list()
    res.send(all_dishes)
})


router.get("/:dishKey", async function (req, res) {
    const dishKey = req.params.dishKey;

    const dish = await dishes.get(dishKey)
    res.send(dish)
})


router.post("/", async function(req, res){
    const { name, country } = req.body;

    await dishes.set(name, {
        name: name,
        country: country
    })

    res.end()
})



module.exports = router;