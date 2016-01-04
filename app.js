/**
 * Created by vimalkumar on 10/18/2015.
 */

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var _dataSet = require('./DataSource/CodeDescription');

var $ = require('jquery');

app.use(bodyParser.urlencoded({extended: true}));  // this will let to get the data  from a post
app.use(bodyParser.json());

var port = 5555;

var router = express.Router();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use('jquery', express.static(__dirname + '/node_modules/jquery/dist/'));

// This return the codes
router.get('/codes', function (req, res) {
    res.header('Content-Type', 'text/xml');
    res.send((_dataSet.data))
    //res.json();
});
//http://localhost:5555/teslamotors/codes
//http://localhost:5555/teslamotors/code_depedencies/13236
//_dataSet.fetchCompleteList(14456,_dataSet.jsonData);

// This return the code dependency
router.get('/code_depedencies/:code', function (req, res, next) {

    var reg = /^\d+$/;
    if (reg.test(req.params.code)) {
        res.header('Content-Type', 'text/xml');

        res.send(_dataSet.codeDepndency(parseInt(req.params.code)));
    }
    else {
        var e = new Error("Invalid code");
        e.message = "code dependency not found"
        e.statusCode = 404;
        return next(e);

    }

    //res.json();
}, logErrors);
//http://localhost:5555/teslamotors/listAllDependency/14456
// this is used to return all the hierarchy
router.get('/listAllDependency/:code', function (req, res, next) {

    var reg = /^\d+$/;
    if (reg.test(req.params.code)) {
        res.header('Content-Type', 'application/json');

        _dataSet.jsonData = {};
        var x = _dataSet.fetchCompleteList(parseInt(req.params.code), _dataSet.jsonData);
        console.log(_dataSet.jsonData);
        if (x) {
            _dataSet.jsonData['text'] = req.params.code;

            res.send(_dataSet.jsonData);
        }
        else {
            res.send({});
        }
    }
    else {
        var e = new Error("Invalid code");
        e.message = "code dependency not found"
        e.statusCode = 404;
        return next(e);

    }

    //res.json();
}, logErrors);

function logErrors(err, req, res, next) {
    req.unhandledError = err;

    var message = err.message;
    var error = err.error || err;
    var status = err.status || 500;

    res.json({message: message, error: error}, status);
};


app.use('/teslamotors', router);
app.listen(port);
console.log('Server Listening at port' + port);