const Profile = require('../models/profileModel')

const createProfileInfo = async (req, res) => {
    const { name, address, favSport , age, mobile, gender } = req.body
    let newData = new Profile ({ name, address, favSport , age, mobile, gender })
    const updatedData = await newData.save();
    res.status(201).json(updatedData);
}

const profileInfo = async (req, res) => {
    let {type,key, value} = req.body
    let resultJson 

    // aggration method match to get matched  elements
    if (type === 'match') {
        // resultJson =  await Profile.aggregate([
        //     { $match : { [key] : value } }
        //  ])


        // ----- to get matched data greater than 25 and gender female 
        // resultJson =  await Profile.aggregate([

        //     { $match :  { $and :  [
        //         { gender : "female" },
        //         { age : { $gt : 25 } }
        //     ] }  } 
        //  ])

        //  -------to get the count of favourite sports of a user ---- -

        resultJson = await Profile.aggregate([

            { $project : {
                _id : 0,
                name : 1,
                numberOfSports : { $size: "$favSport" } }
     } ])
    }

    
    // aggration method profect to get specific keys element -- name, age, sports

    if (type === 'project') {
        resultJson = await Profile.aggregate([
            { $project : {_id : 0, name : 1, age : 1, favSport : 1} }
        ])
    }


    // aggration method addField to add some fields to the doc 

    if (type === 'addField') {
        resultJson = await Profile.aggregate([
            { $match : { gender : 'female' } },
            { $addFields : { maritalStatus : 'single' } },
            { $limit : 2 } // to limit the number of records
        ])
    }


    // aggration method sum to get sum  elements

    if (type === 'sum') {
        resultJson = await Profile.aggregate(
            [
              {
                $group:
                  {
                    _id : "$name",
                    totalAge: { $sum: "$age" },
                    count: { $sum: 1 }
                  }
              }
            ]
         )
    }

        // aggration method avg to get average of elements

        if (type === 'avg') {
            resultJson = await Profile.aggregate(
                [
                  {
                    $group:
                      {
                        _id : "$gender",
                        avgCount : { $avg : "$age" }
                      }
                  }
                ]
             )
        }


    if (type === 'aggregate') {
       resultJson =  await Profile.aggregate([
           { $match : { [key] : value } },
           { $sort : {name:-1}  },
           { $project : { _id : 0, name : 1  } }
        ])
    }



// $out -- method used to make collection from the result of aggregation 
//  { $out : "nameOfCollection" }

    res.status(200).json({
        resultJson
    })

}

module.exports = {profileInfo, createProfileInfo}