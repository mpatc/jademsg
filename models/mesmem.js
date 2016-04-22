'use strict';

var uuid = require('uuid');
var fs = require('fs');
var path = require('path');
var dataFile = path.join(__dirname, '../data/msgs.json')

// var dataFile = '../data/msgs.json'
exports.findAll = function(cb) {

    fs.readFile(dataFile, (err, data) => {
        console.log("dataFile!:   ", data, "dataFile: ", dataFile)
        if (err) {
            cb(err);
            return;
        }
        var msgs = JSON.parse(data)
        console.log("msggs:  ", msgs)
          cb(null, msgs)
    })

}

exports.create = function(msg, cb) {

    // if (!msg.user) {
    //     return cb('please give me a user')
    // }

    this.findAll((err, msgs) => {
        if (err) {
            return err
        };
        // console.log("msgin:  ", msg)
        var newMsg = {
            user: msg.user,
            message: msg.message,
            ident: uuid.v4(),
            grav: msg.grav,
            date: msg.date
        };

        msgs.push(newMsg)
        // console.log("msg   :", newMsg)
        // console.log("msgs   :", msgs)

        fs.writeFile(dataFile, JSON.stringify(msgs), err => {
            if (err) {
                console.log(err)
            }
            console.log("this is responsse: ", msgs)
            return msgs
        })
    });


}
