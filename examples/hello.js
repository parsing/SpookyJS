var Spooky = require('../lib/spooky');

var spooky = new Spooky({
        child: {
            port: 8081,
            script: './lib/bootstrap.js',
            spooky_lib: './node_modules'
        },
        casper: {
            logLevel: 'debug',
            verbose: true
        }
    }, function (err, error) {
        if (err || error) {
            e = new Error('Failed to initialize SpookyJS');
            e.details = err || error;
            throw e;
        }

        spooky.on('error', function (e) {
            console.error(e);
        });

        /*
        // Uncomment this block to see all of the things Casper has to say.
        // There are a lot.
        // He has opinions.
        spooky.on('console', function (line) {
            console.log(line);
        });
        */

        spooky.on('log', function (log) {
            if (log.space === 'remote') {
                console.log(log.message.replace(/ \- .*/, ''));
            }
        });

        spooky.start(
            'http://en.wikipedia.org/wiki/Spooky_the_Tuff_Little_Ghost');
        spooky.thenEvaluate(function () {
            console.log('Hello, from', document.title);
        });
        spooky.run();
    });