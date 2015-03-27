Array.prototype.binarySearch = function (v, i) {
    var h = this.length, l = -1, m;
    while (h - l > 1)
        if (this[m = h + l >> 1] < v) l = m;
        else h = m;
    return this[h] != v ? i ? h : -1 : h;
};

String.prototype.trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, "");
}

String.prototype.trimLeft = function () {
    return this.replace(/(^\s*)/g, "");
}

String.prototype.trimRight = function () {
    return this.replace(/(\s*$)/g, "");
}