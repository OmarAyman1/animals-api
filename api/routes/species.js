const express = require('express');
const router = express.Router();

let jsonData = require('../data/animals.json');

router.get('/', (req, res, next) => {
    res.status(400).send({
        ERROR: "please enter the species"
    });
});

router.get('/:species', (req, res, next) => {
    const spe = req.params.species;
    var finalData;
    var filteredData = jsonData.filter(function (jsonData) {
        if (!jsonData.species) {
            return;
        }
        var theResult = jsonData.species.includes(spe);
        return theResult;
    });

    if (Object.keys(req.query).length === 0) {
        finalData = filteredData; //filtered by species only
    }

    else {
        var queryParams = req.query.fields.split(',');
        var resultArr = []
        for (var obj = 0; obj < filteredData.length; obj++) {
            objN = filteredData[obj];
            var tempObj = {}
            for (var i = 0; i < queryParams.length; i++) {
                var filter = queryParams[i];
                var keys = Object.keys(objN);
                for (var j = 0; j < keys.length; j++) {
                    if (keys[j] === filter) {
                        x = keys[j]
                        tempObj[x] = objN[x];//adding the key,value pair to the temporary object      
                    }
                }
            }
            resultArr.push(tempObj);
        }
        finalData = resultArr;//set final data to required fields only
    }

    res.status(200).json(
        finalData //filtered by species and fields
    );
});

module.exports = router;