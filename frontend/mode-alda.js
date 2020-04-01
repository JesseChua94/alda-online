import * as ace from './ace.js'
'use strict';

// Alda Grammar
ace.define("ace/mode/alda_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"], function(require, exports, module) {
    "use strict";

    var oop = require("../lib/oop");
    var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

    var AldaHighlightRules = function() {
    
        this.$rules = {
            pitch: [{
                token: "variable.parameter.operator.pitch.alda",
                regex: /(?:[+\-]+|\=)/
            }, {
                token: "",
                regex: "",
                next: "timing"
            }],
            timing: [{
                token: "string.quoted.operator.timing.alda",
                regex: /\d+(?:s|ms)?/
            }, {
                token: "",
                regex: "",
                next: "start"
            }],
            start: [{
                token: [
                    "constant.language.instrument.alda",
                    "constant.language.instrument.alda",
                    "meta.part.call.alda",
                    "storage.type.nickname.alda",
                    "meta.part.call.alda"
                ],
                regex: /^([a-zA-Z]{2}[\w\-+\'()]*)((?:\s*\/\s*[a-zA-Z]{2}[\w\-+\'()]*)*)(?:(\s*)(\"[a-zA-Z]{2}[\w\-+\'()]*\"))?(\s*:)/
            }, {
                token: [
                    "text",
                    "entity.other.inherited-class.voice.alda",
                    "text"
                ],
                regex: /^(\s*)(V\d+)(:)/
            }, {
                token: "comment.line.number-sign.alda",
                regex: /#.*$/
            }, {
                token: "entity.name.function.pipe.measure.alda",
                regex: /\|/
            }, {
                token: "comment.block.inline.alda",
                regex: /\(comment\b/,
                push: [{
                    token: "comment.block.inline.alda",
                    regex: /\)/,
                    next: "pop"
                }, {
                    defaultToken: "comment.block.inline.alda"
                }]
            }, {
                token: "entity.name.function.marker.alda",
                regex: /%[a-zA-Z]{2}[\w\-+\'()]*/
            }, {
                token: "entity.name.function.at-marker.alda",
                regex: /@[a-zA-Z]{2}[\w\-+\'()]*/
            }, {
                token: "keyword.operator.octave-change.alda",
                regex: /\bo\d+\b/
            }, {
                token: "keyword.operator.octave-shift.alda",
                regex: /[><]/
            }, {
                token: "keyword.operator.repeat.alda",
                regex: /\*\s*\d+/
            }, {
                token: "string.quoted.operator.timing.alda",
                regex: /[.]|r\d*(?:s|ms)?/
            },{
                token: "text",
                regex: /([cdefgab])/,
                next: "pitch"
            }, {
                token: "string.quoted.operator.timing.alda",
                regex: /~/,
                next: "timing"
            }, {
                token: "punctuation.section.embedded.cram.alda",
                regex: /\}/,
                next: "timing"
            }, {
                token: "constant.numeric.subchord.alda",
                regex: /\//
            }, {
                todo: {
                    token: "punctuation.section.embedded.cram.alda",
                    regex: /\{/,
                    push: [{
                        token: "punctuation.section.embedded.cram.alda",
                        regex: /\}/,
                        next: "pop"
                    }, {
                        include: "$self"
                    }]
                }
            }, {
                todo: {
                    token: "keyword.control.sequence.alda",
                    regex: /\[/,
                    push: [{
                        token: "keyword.control.sequence.alda",
                        regex: /\]/,
                        next: "pop"
                    }, {
                        include: "$self"
                    }]
                }
            }, {
                token: "meta.inline.clojure.alda",
                regex: /\(/,
                push: [{
                    token: "meta.inline.clojure.alda",
                    regex: /\)/,
                    next: "pop"
                }, {
                    include: "source.clojure"
                }, {
                    defaultToken: "meta.inline.clojure.alda"
                }]
            }]
        };
        
        this.normalizeRules();
    };
    
    AldaHighlightRules.metaData = {
        scopeName: "source.alda",
        fileTypes: ["alda"],
        name: "Alda"
    }
    
    
    oop.inherits(AldaHighlightRules, TextHighlightRules);
    
    exports.AldaHighlightRules = AldaHighlightRules;
    });

    ace.define('ace/mode/alda',["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"], function(require, exports, module) {

        var oop = require("../lib/oop");
        var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;
        var TextMode = require("./text").Mode;

        var AldaHighlightRules = require("ace/mode/alda_highlight_rules").AldaHighlightRules;

        var Mode = function() {
            this.HighlightRules = AldaHighlightRules;
        };
        oop.inherits(Mode, TextMode);

        (function() {
            // this.lineCommentStart = ""\\(comment\\b"";
            // this.blockComment = {start: ""/*"", end: ""*/""};
            // Extra logic goes here.
            this.$id = "ace/mode/alda"
        }).call(Mode.prototype);

        exports.Mode = Mode;
    });                
    
    // (function() {
    //                 window.require(["ace/mode/alda"], function(m) {
    //                     if (typeof module == "object" && typeof exports == "object" && module) {
    //                         module.exports = m;
    //                     }
    //                 });
    //             })();