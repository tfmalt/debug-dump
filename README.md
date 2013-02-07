debug-dump
==========
A js lib for the days you don't have access to an interactive javascript console.

Usage
-----

    var dd = require('debug-dump');
    console.log(dd.inspect({}));


Rationale
---------
Normally you have access to mostly proper debugging tools if you're 
implementing something in node, or through the browser webkit inspector.
But some times the current environment don't let you inspect object and
variables interactively. You just want to pretty print them to stdout.

I created this while developing a phonegap application, unable to get the remote
webkit inspector to run properly.

If you find it useful great. If you know of a better way to debug and inspect your
code running on the iOS simulator, please tell me.

Functionality
-------------
The module is implemented to both be usable directly in node, and in the browser 
as is.

Currently it only exports one function:
- inspect() : Implemented to work similar to the util.inspect function in node.



