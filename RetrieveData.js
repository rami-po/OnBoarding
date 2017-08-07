/**
 * Created by Rami Khadder on 7/10/2017.
 */
var http = require("http");
var https = require("https");

exports.getJSON = function(options, body, onResult)
{
    console.log("rest::getJSON");

    var prot = options.port == 443 ? https : http;
    var req = prot.request(options, function(res)
    {
        var output = '';
        console.log(options.host + ':' + res.statusCode);
        res.setEncoding('utf8');

        res.on('data', function (chunk) {
            console.log('Body: ' + chunk);
            output += chunk;
        });

        res.on('end', function() {
            var obj = JSON.parse(output);
            onResult(res.statusCode, obj);
        });
    });

    req.on('error', function(err) {
        //res.send('error: ' + err.message);
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    });

    if (body !== null){
        req.write(body);
    }

    req.end();
};
