/*jslint node: true, vars: true, newcap: true, nomen: true */
/*global _ */
/**
 * A simple debug library since phonegap is lacking som dump obj stuff.
 */

(function (exports) {
    "use strict";
    var isNode,
        u,
        _inspect,
        _inspectArray,
        _inspectFunction,
        _inspectObject,
        _getUnderscore;

    isNode = (typeof module !== 'undefined' && module.exports) ? true : false;

    _getUnderscore = function () {
        if (isNode) {
            try {
                return require('underscore');
            } catch (e) {
                console.log("Could not require underscore: " + e.toString());
            }
        } else {
            try {
                return _;
            } catch (e) {
                alert("You must load underscore for this script to work");
            }
        }
    };

    u = _getUnderscore();
    _inspect = function (obj, depth, curr) {
        depth = depth || 2; // init depth if not set.
        if (typeof obj === "undefined") return '[undefined]';
        if (u.isString(obj)) return "'" + obj + "'";
        // if (curr == depth+1) return obj.toString();

        curr = curr || 0 ; // Curr is optional so init if not set.

        if (u.isArray(obj))    return _inspectArray(    obj, depth, curr + 1 );
        if (u.isFunction(obj)) return _inspectFunction( obj, depth, curr + 1 );
        if (u.isObject(obj))   return _inspectObject(   obj, depth, curr + 1 );

        return obj.toString();
    };


    _inspectArray = function (obj, depth, curr) {
        // throw exception if not an array
        // console.log("DEBUG: " + curr + ":" + obj.toString());
        if (typeof obj === 'undefined') return '[undefined]';
        if (depth == curr - 1) return '[object Array]';
        var str = "[ ";
        u.each(obj, function (val) {
            str += _inspect(val, depth, curr) + ", ";
        });
        str = str.replace(/, $/, "");
        str += " ]";

        return str;
    };

    _inspectObject = function (obj, depth, curr) {
        if (depth == curr - 1) return obj.toString();
        if (typeof obj === 'undefined') return '[undefined]';

        var indent = Array(Number(curr)).join("  ");
        var str    = "{\n";
        u.each(obj, function (val, key) {
            if (key.match(/ /g)) {
                key = "'" + key + "'";
            }
            str += indent + "  " + key + ": ";
            str += _inspect(val, depth, curr);
            str += ",\n";
        });
        str = str.replace(/,\n$/m, "");
        str += "\n" + indent + "}";

        return str;
    };

    _inspectFunction = function (obj, depth, curr) {
        // Maybe should throw error if not function 
        return "[Function]";
    };

    exports.inspect = _inspect;

})(typeof exports === 'undefined' ? this['dd'] = {} : exports);

