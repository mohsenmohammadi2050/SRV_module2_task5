var express = require("express")
var router = express.Router()
var AWS = require("aws-sdk")
var s3 = new AWS.S3()


router.post("/", async function(req, res){
    const { text } = req.body;
    await s3.putObject({
        Body: JSON.stringify({text:text}, null, 2),
        Bucket: "cyclic-jealous-sweater-toad-eu-north-1",
        Key: "text.json",
    }).promise()
    res.end()

})


router.get("/", async function(req, res){
    let my_file = await s3.getObject({
        Bucket: "cyclic-jealous-sweater-toad-eu-north-1",
        Key: "text.json",
    }).promise()

    res.send(JSON.parse(my_file?.Body)?.text)
})


module.exports = router