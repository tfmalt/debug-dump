/**
 * A simple debug library since phonegap is lacking som dump obj stuff.
 */
var u_;
if (typeof exports === 'undefined') {
    // Running in browser methinks
    u_ = _;
} else {
    u_ = require('underscore');
}

(function (exports) {
    "use strict";
    exports.inspect = function (obj, depth, curr) {
        var depth = depth || 2; // init depth if not set.
        var curr  = curr  || 0; // Curr is optional so init if not set.

        if (u_.isArray(obj)) {
            return _inspectArray(obj, depth, curr);
        }
        if (u_.isFunction(obj)) {
            return _inspectFunction(obj, depth, curr);
        }
        if (u_.isObject(obj)) {
            return _inspectObject(obj, depth, curr);
        }
        return obj.toString()
    };

    var _inspectArray = function (obj, depth, curr) {
        // throw exception if not an array
        var depth = depth || 2;
        var curr  = curr  || 0;

        var str = "[ ";
        u_.each(obj, function (value) {
            if (u_.isObject(value)) {
                str += exports.inspect(value, depth, curr+1);
            } else {
                str += (u_.isString(value)) ? "'" + value + "', " : value + ", ";
            }
        });
        str = str.replace(/, $/, "");
        str += " ]";
        return str;
    };

    var _inspectObject = function (obj, depth, curr) {
        var depth  = depth || 2;
        var curr   = curr  || 0;
        var indent = Array(curr).join("  ");

        var str = "{\n";
        u_.each(obj, function(val, key) {
            str += key + ": ";
            if (u_.isObject(val)) {
                str += exports.inspect(val, depth, curr+1);
            } else {
                str += (u_.isString(val)) ? "'" + val + "'" : val;
                str += ", ";
            }
        });
        str = str.replace(/, $/, "");
        str += " }";

        return str;
    };

    var _inspectFunction = function (obj, depth, curr) {
        var depth = depth || 2;
        var curr  = curr  || 0;

        // Maybe should throw error if not function 
        return "[Function]";
    }

})(typeof exports === 'undefined' ? this['debug'] = {} : exports);

