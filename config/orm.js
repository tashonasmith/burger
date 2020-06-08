// var connection = require("./connection.js");

// var orm = {
//     selectAll: function(tableInput) {
//         var queryString = "SELECT * FROM ??";
//         connection.query(queryString [tableInput],
//         function(err, result) {
//             if (err) throw err;
//             console.log(result);
//         });
//     },
//     insertOne: function(tableInput, colName, colVal) {
//         var queryString = "INSERT INTO ?? (??) VALUES (?)";
//         console.log(queryString);
        
//         connection.query(queryString, [tableInput, colName, colVal],
//         function(err, result) {
//             if (err) throw err;
//             console.log(result);
//         });
//     },
//     updateOne: function(tableInput, updateCol, updateVal, idVal) {
//         var queryString = "UPDATE ?? SET ??=? WHERE `id` =?";
//         console.log(queryString);
        
//         connection.query(queryString, [tableInput, updateCol, updateVal, idVal], 
//         function(err, result) {
//             if (err) throw err;
//             console.log(result);
//         });
//     }
// };

// module.exports = orm;

var connection = require("./connection.js");

function printQuestionMarks(num) {
    var arr = [];

    for (var i = 0; i < num; i++) {
        arr.push("?");
    }

    return arr.toString();
}

function objToSql(ob) {
    var arr = [];

    for (var key in ob) {
        var value = ob[key];

        if (Object.hasOwnProperty.call(ob, key)) {
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            arr.push(key + "=" + value);
        }
    }
    return arr.toString();
}

var orm = {
    selectAll: function(tableInput, cb) {
        var queryString = "SELECT * FROM " + tableInput + ";";
        connection.query(queryString, function(err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },
    insertOne: function(table, colName, colVal, cb) {
        var queryString = "INSERT INTO " + table;

        queryString += " (";
        queryString += colName.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(colVal.length);
        queryString += ") ";

        console.log(queryString);

        connection.query(queryString, colVal, function(err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },
    // updateOne: function(table, objColVals, condition, cb) {
    //     var queryString = "UPDATE " + table;

    //     queryString += " SET ";
    //     queryString += objToSql(objColVals);
    //     queryString += " WHERE ";
    //     queryString += condition;

    //     console.log(queryString);
    //     connection.query(queryString, function(err, result) {
    //         if (err) {
    //             throw err;
    //         }
    //         cb(result);
    //     });
    // }
    updateOne: function(table, objColVals, id, cb) {
        var queryString = "UPDATE " + table;
        
        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE id =";
        queryString += id;

        console.log(queryString);
        connection.query(queryString, function(err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        })
    }
};

module.exports = orm;