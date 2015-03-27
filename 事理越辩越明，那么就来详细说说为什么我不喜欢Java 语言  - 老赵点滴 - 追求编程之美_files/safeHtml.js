ZjBlog = ZjBlog || {};

ZjBlog.safeHtml = {
    _getTagsRegex: function () { return new RegExp("<\\s*(/?)\\s*(\\w*)([^>]*?)(/?)>", "gi"); },
    _getAttrSrcRegex: function () { return new RegExp('\\bsrc\\s*=\\s*"(\\w+://[^"]+)"', "gi"); },
    _getAttrTitleRegex: function () { return new RegExp('\\btitle\\s*=\\s*"([^"]+)"', "gi"); },
    _getAttrAltRegex: function () { return new RegExp('\\balt\\s*=\\s*"([^"]+)"', "gi"); },
    _getAttrHrefRegex: function () { return new RegExp('\\bhref\\s*=\\s*"(\\w+://[^"]+)"', "gi"); },
    _getAttrHeightRegex: function () { return new RegExp('\\bheight\\s*=\\s*"(\\d+)"', "gi"); },
    _getAttrWidthRegex: function () { return new RegExp('\\bwidth\\s*=\\s*"(\\d+)"', "gi"); },

    _getCodeBeginHighlightRegex: function () { return new RegExp('<pre>\\s*<code>\\s*\\[config\\]\\s*([:;\\[\\], \\w-]+)$', "gim"); },
    _getCodeBeginRegex: function () { return new RegExp('<pre>\\s*<code>\\s*', "gi"); },
    _getCodeEndRegex: function () { return new RegExp('</code>\\s*</pre>*', "gi"); },

    _validTags: ["a", "b", "blockquote", "code", "del", "dd", "dl", "dt", "em", "h1", "h2", "h3", "i", "img", "kbd", "li", "ol", "p", "pre", "s", "sup", "sub", "strong", "strike", "ul", "br", "hr"],

    _getClearedTag: function (m, tag) {
        tag = tag || m.tag.ToLower();
        return "<" + m.begin + tag + m.end + ">";
    },

    _appendWhenMatch: function (builder, attributes, regex, name) {
        var match = regex.exec(attributes)
        if (match) {
            builder.push(" " + name + '="' + match[1].trim() + '"');
        }
    },

    _processAnchor: function (m) {
        var attributes = m.attr;
        if (attributes == "") {
            return this._getClearedTag(m, "a");
        }

        // alert(attributes);

        var builder = ["<", m.begin, "a"];
        var hrefMatch = this._getAttrHrefRegex().exec(attributes);
        if (hrefMatch) {
            builder.push(' href="');
            builder.push(hrefMatch[1]);
            builder.push('"');
            builder.push(' rel="nofollow"');
        }

        this._appendWhenMatch(builder, attributes, this._getAttrTitleRegex(), "title");

        builder.push(m.end);
        builder.push(">");

        return builder.join("");
    },

    _processImg: function (m) {
        var attributes = m.attr;
        if (attributes == "") {
            return this._getClearedTag(m, "img");
        }

        var builder = ["<", m.begin, "img"];

        this._appendWhenMatch(builder, attributes, this._getAttrTitleRegex(), "title");
        this._appendWhenMatch(builder, attributes, this._getAttrSrcRegex(), "src");
        this._appendWhenMatch(builder, attributes, this._getAttrAltRegex(), "alt");

        var widthMatch = this._getAttrWidthRegex().exec(attributes);
        if (widthMatch) {
            var width = parseInt(widthMatch[1], 10);
            if (width > 0 && width < 1000) {
                builder.push(' width="');
                builder.push(width);
                builder.push('"');
            }
        }

        var heightMatch = this._getAttrHeightRegex().exec(attributes);
        if (heightMatch) {
            var height = parseInt(heightMatch[1], 10);
            if (height > 0 && height < 1000) {
                builder.push(' height="');
                builder.push(height);
                builder.push('"');
            }
        }

        builder.push(m.end);
        builder.push(">");

        return builder.join("");
    },

    _processHtmlTags: function (html) {

        var _this = this;
        var builder = [];
        var lastIndex = 0;

        return html.replace(this._getTagsRegex(), function (value, begin, tag, attr, end) {
            var m = { begin: begin, tag: tag, attr: attr, end: end };

            tag = tag.toLowerCase();
            var isValid = _this._validTags.binarySearch(tag, false) >= 0;
            if (!isValid) return "";

            if (tag == "a") {
                return _this._processAnchor(m);
            } else if (tag == "img") {
                return _this._processImg(m);
            } else {
                return _this._getClearedTag(m, tag);
            }
        });
    },

    process: function (html) {
        html = this._processHtmlTags(html);

        html = html.replace(this._getCodeBeginHighlightRegex(), '<pre class="$1">');
        html = html.replace(this._getCodeBeginRegex(), '<pre class="brush: plain;">');
        html = html.replace(this._getCodeEndRegex(), '</pre>');

        return html;
    },

    _init: function () {
        this._validTags.sort();
    }
};

ZjBlog.safeHtml._init();