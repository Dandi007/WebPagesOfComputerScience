// vim: filetype=javascript
require.config({
    baseUrl: "http://s2.pstatp.com/r2/js/",
    paths: {
        'jquery': 'lib/jquery-1.7.2.min',
        'utils': 'utils',
        'mustache': 'lib/mustache',
        'jquery-isotope': 'lib/jquery.isotope.min',
        'bootstrap-button': 'lib/bootstrap/bootstrap-button',
        'bootstrap-modal': 'lib/bootstrap/bootstrap-modal',
        'bootstrap-dropdown': "lib/bootstrap/bootstrap-dropdown",
        'bootstrap-collapse': "lib/bootstrap/bootstrap-collapse",
        'bootstrap-tab': 'lib/bootstrap/bootstrap-tab',
        'user': 'user'
    }
    ,priority: ['utils']
    //,urlArgs: "bust=" +  (new Date()).getTime()
    ,urlArgs: ''
});

define('config', function(){
    return {
        STATIC_BASE_URL : 'http://s2.pstatp.com'
    }
})
