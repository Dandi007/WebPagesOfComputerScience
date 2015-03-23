function redirectMobile(url) {
	if (/AppleWebKit.*Mobile/i.test(navigator.userAgent) || (/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(navigator.userAgent))) {

		try {
			if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
				window.location.href = url;
			} else if (/iPad/i.test(navigator.userAgent)) {}
			else {
				window.location.href = url;
			}
		} catch (e) {}
	}
}

if (true) {
	var href = location.href;
	 if (href.indexOf('/edu/') >= 0) {
		var reg = /\/edu\/(\d+)\.html/i;
		var m = reg.exec(href);
		if (m && m.length == 2) {
			redirectMobile('http://m.pc6.com/n/' + m[1]);
		}
	} else if (href.indexOf('/infoview/') >= 0) {
		var reg = /\/infoview\/Article_(\d+)\.html/i;
		var m = reg.exec(href);
		if (m && m.length == 2) {
			redirectMobile('http://m.pc6.com/n/' + m[1]);
		}
	}

}
