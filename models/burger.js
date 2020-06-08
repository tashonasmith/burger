var orm = require("../config/orm.js");

// var burger = {
//     selectAll: function(allBurgers) {
//         orm.selectAll("burgers", function(res) {
//             allBurgers(res);
//         });
//     },
//     insertOne: function(name) {
//         orm.insertOne("burgers", name, function(res) {
//             name(res);
//         });
//     },
//     updateOne: function(dev) {
//        orm.updateOne("burgers", dev, function(res) {
//            name(res);
//        });
//     }
// };

// module.exports = burger;

var burger = {
   selectAll: function(cb) {
       orm.selectAll("burgers", function(res) {
           cb(res);
       });
   },
   insertOne: function(colName, colVal, cb) {
       orm.insertOne("burgers", colName, colVal, function(res) {
            cb(res);
       }); 
    },
    updateOne: function(objColVals, condition, cb) {
        orm.updateOne("burgers", objColVals, condition, function(res) {
            cb(res);
        });
    }
   };

   module.exports = burger;
