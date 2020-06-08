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