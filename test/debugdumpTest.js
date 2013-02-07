var chai   = require('chai');
var should = chai.should();
var debug  = require('../src/debugdump');
var u      = require('underscore');

describe( 'Testing debug', function () {
    describe('#inspect() -> _inspectArray()', function () {
        it('Should return true', function () {
            var res = true;
            res.should.be.true;
        });

        it('Should be an object', function () {
            debug.should.be.an.instanceOf(Object);
        });

        it('Should dump simple array pretty', function () {
            debug.inspect([1,2,3]).should.be.string('[ 1, 2, 3 ]');                
        });

        it('Should dump another simple array equally pretty', function () {
            debug.inspect([1,"yes",3]).should.be.string("[ 1, 'yes', 3 ]");
        });
    });

    describe('#inspect() -> _inspectObject()', function () {
        it('Should dump a simple object real nice', function () {
            debug.inspect({
                en: 1,
                to: "to",
                "tre": "tretretre",
                4: 4
            }).should.be.string(
                "{\n" +
                "  4: 4,\n" +
                "  en: 1,\n" +
                "  to: 'to',\n" +
                "  tre: 'tretretre'\n" +
                "}"
            );
            debug.inspect({
                3: "tre",
                1: "en",
                2: "to"
            }).should.be.string("{\n  1: 'en',\n  2: 'to',\n  3: 'tre'\n}"); 
        });
    });

    describe('#inspect() -> _inspectFunction()', function () {
        it('Should dump a function as it should', function () {
            var test = function () {
                return true;
            };

            debug.inspect(test).should.be.string("[Function]");
        });
    });
    describe('#inspect() -> complex objects', function () {
        it('Should dump a nested structure in the desired fashion', function () {
            var test = {
                en: "en",
                2: "to",
                tre: {
                    en: 1, to: "to"
                }
            };
            var result = "" + 
                "{\n" +
                "  2: 'to',\n" +
                "  en: 'en',\n" +
                "  tre: {\n" +
                "    en: 1,\n" +
                "    to: 'to'\n" +
                "  }\n" +
                "}";
            // console.log("DEBUG: \n" + debug.inspect(test) + "\n" + result);
            debug.inspect(test).should.be.string(result);
        });
        it('Should dump another structure with arrays hand hashes', function () {
            var test = {
                en: [ 1, 2, 3, 'dette er fire', 'fem' ],
                to: {
                    'inner en': 1,
                    'inner to': 2
                },
                tre: 'tre'
            };
            var result = "" +
                "{\n" +
                "  en: [ 1, 2, 3, 'dette er fire', 'fem' ],\n" +
                "  to: {\n" +
                "    'inner en': 1,\n" +
                "    'inner to': 2\n" +
                "  },\n" +
                "  tre: 'tre'\n" +
                "}";

            // console.log("DEBUG: \n" + debug.inspect(test) + "\n" + result);
            debug.inspect(test).should.be.string(result);
        });
        it('Should output an object inside an array perfectly', function () {
            var test = {
                "dette er en": "her er en",
                "jackson 5": ["Jackie", "Tito", { 
                    "Jermaine": [1964, 1975], 
                    "Randy": [1975, 1990]
                }, "Marlon", "Michael"], 
                "dette er tre": 3
            };
            var result = "" + 
                "{\n" + 
                "  'dette er en': 'her er en',\n" +
                "  'jackson 5': [ 'Jackie', 'Tito', [object Object], " +
                "'Marlon', 'Michael' ],\n" +
                "  'dette er tre': 3\n" +
                "}";
            // console.log("DEBUG: \n" + debug.inspect(test) + "\n" + result);
            debug.inspect(test).should.be.string(result);        
        });

        it('Should output the object type of Array correctly', function () {
            var test = [1, [2, [3, [4, "end"]]]];
            var result = "[ 1, [ 2, [object Array] ] ]";
            // console.log("DEBUG: \n" + debug.inspect(test) + "\n" + result);
            debug.inspect(test).should.be.string(result);
        });
    });

    describe('#inspect() > Must be respectful of depth', function () {
        var test = { one: { two: { three: { four: { five: { six: 6 }}}}}};
        it('Should respect default depth of 2', function () {
            var result = "{\n  one: {\n    two: [object Object]\n  }\n}";
            debug.inspect(test).should.be.string(result);
        });
        it('Should respect depth of 5', function () {
            var result = "" +
                "{\n" + 
                "  one: {\n" +
                "    two: {\n" +
                "      three: {\n" +
                "        four: {\n" +
                "          five: [object Object]\n" +
                "        }\n" +
                "      }\n" +
                "    }\n" +
                "  }\n" +
                "}";
            // console.log("DEBUG: \n" + debug.inspect(test, 5) + "\n" + result);
            debug.inspect(test, 5).should.be.string(result);
        }); 
    });

});
