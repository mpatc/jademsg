'use strict';
const PORT = process.env.PORT || 65000
let qs = require('qs')
let http = require('http')
let md5 = require('md5')
let nodeStatic = require('node-static')
var express = require('express');
var morgan = require('express')
var bodyParser = require('body-parser')
var uuid = require('uuid')
var fs = require('fs')
let file = new nodeStatic.Server('./public')

var app = express();


app.use(morgan('dev'))
app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(bodyParser.json())

var Mesmem = require('./models/mesmem')

app.use(express.static('public'))

app.set('view engine', 'jade');

app.route('/api/message/')
    .get((req, res, next) => {
        console.log("req:", req.params)
        Mesmem.findAll((err, message) => {
            res.render("index", {
                messages: messages
            })
            res.status(err ? 400 : 200).send(err || null)
        })
    })
    .post((req, res, next) => {

        var user = req.params.user
        var message = req.params.message
        var date = req.params.date
        var ident = uuid.v4()
        var grav = md5(user)
console.log("user ", user, )
        var msgNew = {
            user: user,
            message: message,
            date: date,
            ident: ident,
            grav: grav
        }
        Mesmem.create(msgNew, (err, messages) => {
            console.log("app.js create req", messages)
            console.log("req1:", err)
            res.render("index", {
                messages: messages
            })
        })

    })


app.get('/', (req, res, next) => {
    console.log("req.para: ", req.params)
        // res.render("home")

    Mesmem.findAll((err, messages) => {
        console.log("msgs!:  ", messages)
        res.render("index", {messages: messages})
        //     message: messages.message,
        //     user: messages.user,
        //     ident: messages.indent,
        //     grav: messages.grav,
        //     date: messages.date
        // })
    });
});

app.use((req, res, next) => {
    res.status(404).send('Sorry cant find that!');
});

app.listen(PORT, err => {
    console.log(err || `YOU ARE NOW! listening on port ${PORT}`)
});


// http.createServer((req, res) => {
//             let html;
//             let qsParts = req.url.split('?')
//             let msgParts = req.url.split('/')
//             if (msgParts[1] === 'msgg') {
//               var user = msgParts[2]
//               var message = decodeURIComponent(msgParts[3])
//               var date = decodeURIComponent(msgParts[4])
// var grav = md5(msgParts[2])
//               html = jade.renderFile('./views/msgProto.jade', {
//                 message: message,
//                 user: user,
//                 date: date,
//                 grav: grav
//               });
//               res.end(html)
//             }
//             let path = qsParts[0]
//             if (qsParts[1]) {
//                 var query = qs.parse(qsParts[1])
//             }
//             switch (path) {
//                 case "/":
//                     html = jade.renderFile('./views/index.jade', {
//                     });
//                     res.end(html)
//                     break;
//                 case "/msgDumb":
//                     var user = user
//                     var message = ""
//                     var date = ""
//                     console.log(user)
//                     html = jade.renderFile('./views/msgProto.jade', {
//                       user: user,
//                       message: message,
//                       date: date,
//                       grav: md5(user)
//                     });
//                     res.end(html)
//                     break;
//                     case "/msgg":
//                         var user = $("#name").val();
//                         var message = $("#msg").val();
//                         var date = Date.now();
//                         console.log(user)
//                         html = jade.renderFile('./views/msgProto.jade', {
//                           user: user,
//                           message: message,
//                           date: date,
//                           grav: md5(user)
//                         });
//                         console.log(JSON.stringify(html))
//                         res.end(html)
//                         break;
//                 case "/other":
//                     html = jade.renderFile('./views/other.jade', {
//                     });
//                     res.end(html)
//                     break;
//             }
//             console.log("qsParts: ", qsParts, "  msgPart:  ", msgParts, "  query: ", query)
//             file.serve(req, res)
//           })
//             .listen(PORT, err => {
//     if (err) return console.log(err);
//     console.log(`lising on the PORT ${PORT}`)
// })
