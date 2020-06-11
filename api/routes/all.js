const express = require('express');
const router = express.Router();

let jsonData = require('../data/animals.json');


router.get('/', (req, res, next) => {
    res.status(200).json(
        jsonData//return all data
    );
});

router.get('/:alphaCode', (req, res, next) => {
    const alpha = req.params.alphaCode;
    var newData = jsonData.filter(function (jsonData) {
        if (!jsonData.alpha2Code) {
            return;
        }
        var theResult = jsonData.alpha2Code.includes(alpha);
        return theResult;
    });

    arr2 = req.query.field  //looping throw the parameters
    if (Object.keys(req.query).length === 0) {
        return res.status(200).json(
            newData //filtered by alpha code only
        );
    }

    
    var obj = []//my json array

    for (var value = 0; value < newData.length; value++) {
        value1 = newData[value];
        var item = {}
        for (var ke = 0; ke < arr2.length; ke++) {
            var a = arr2[ke];
            var keys = Object.keys(value1);
            for (var i = 0; i < keys.length; i++) {
                if (keys[i] === a) {//split to 2 if conditions
                    x = keys[i]
                    item[x] = value1[x];//adding the key,value pair in the object        
                }
            }

        }
        obj.push(item);//prints for the items only the right location needs to modify data
        console.log(obj)
    }
    newData = obj;// set new data to filteres fields


    res.status(200).json(
        newData //filtered by alpha code and fields
    );
});

module.exports = router;

//make if query != 0 will filter data and save newdata as obj else newdata stays the same and res.status will be at the end