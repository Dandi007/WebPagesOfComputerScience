if ($.browser.msie && $.browser.version.substring(0, 1) === '6') {
    window.location = "http://files.cnblogs.com/JeffreyZhao/no-ie6.xml?r=" + Math.random().toString() + "&from=" + encodeURIComponent(url1);
}

function doContentResize() {
    var width = $("#wrapper").width() - 465;
    $("#content").css("width", width + "px");
    $("#markItUpCommentMarkup").css("width", (width - 10) + "px");
    $("#commentMarkup").css("width", (width - 62) + "px");
}

function __showAndHide(toShow, toHide) {
    document.getElementById(toShow).style.display = "block";
    document.getElementById(toHide).style.display = "none";
}

function __showInNewWindow(html) {
    var winname = window.open("", "_blank", "");
    winname.document.open("text/html", "replace");
    winname.document.write(html);
    winname.document.close();
}

$(window).resize(function () { doContentResize(); setTimeout(doContentResize, 1000); });

var ZjBlog = {};

ZjBlog.messageBox = {

    _getBox: function () { return $("#messageBox"); },

    show: function (html) {
        this._getBox().html(html).css({ display: "block" });
    },

    hide: function () { this._getBox().css({ display: "none" }); }
};

ZjBlog.code = {

    highlight: function (element) {
        element.find("pre").each(
            function (index, element) {
                if (element.className.toLowerCase().indexOf("brush") < 0) return;

                if (element.parentNode.className != "commentContent") {
                    element.className = "code";
                } else {
                    SyntaxHighlighter.highlight({}, element);
                }
            });
    }
}