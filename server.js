'use strict';
const PORT = process.env.PORT || 65000
let jade = require('jade')
let qs = require('qs')
let http = require('http')
let md5 = require('md5')
let nodeStatic = require('node-static')
let file = new nodeStatic.Server('./public')


http.createServer((req, res) => {
            let html;
            let qsParts = req.url.split('?')
            let msgParts = req.url.split('/')
            if (msgParts[1] === 'msgg') {
              var user = msgParts[2]
              var message = decodeURIComponent(msgParts[3])
              var date = decodeURIComponent(msgParts[4])
              var grav = md5(msgParts[2])
              html = jade.renderFile('./views/msgProto.jade', {
                message: message,
                user: user,
                date: date,
                grav: grav
              });
              res.end(html)
            }
            let path = qsParts[0]
            if (qsParts[1]) {
                var query = qs.parse(qsParts[1])
            }
            switch (path) {
                case "/":
                    html = jade.renderFile('./views/index.jade', {
                    });
                    res.end(html)
                    break;
                case "/msgDumb":
                    var user = user
                    var message = ""
                    var date = ""
                    console.log(user)
                    html = jade.renderFile('./views/msgProto.jade', {
                      user: user,
                      message: message,
                      date: date,
                      grav: md5(user)
                    });
                    res.end(html)
                    break;
                    case "/msgg":
                        var user = $("#name").val();
                        var message = $("#msg").val();
                        var date = Date.now();
                        console.log(user)
                        html = jade.renderFile('./views/msgProto.jade', {
                          user: user,
                          message: message,
                          date: date,
                          grav: md5(user)
                        });
                        res.end(html)
                        break;
                case "/other":
                    html = jade.renderFile('./views/other.jade', {
                    });
                    res.end(html)
                    break;
            }
            console.log("qsParts: ", qsParts, "  msgPart:  ", msgParts, "  query: ", query)
            file.serve(req, res)
          })
            .listen(PORT, err => {
    if (err) return console.log(err);
    console.log(`lising on the PORT ${PORT}`)
})
