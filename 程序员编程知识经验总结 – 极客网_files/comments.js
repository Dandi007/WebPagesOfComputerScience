$body=(window.opera)?(document.compatMode=="CSS1Compat"?$('html'):$('body')):$('html,body');
$('#comments-navi a').live('click', function(e){
    e.preventDefault();
    $.ajax({
        type: "GET",
        url: $(this).attr('href'),
        beforeSend: function(){
            $('#comments-navi').remove();
            $('.commentlist').remove();
            $('.comments-loading').slideDown();
            $body.animate({scrollTop: $('#comments').offset().top - 65}, 800 );
        },
        dataType: "html",
        success: function(out){
            result = $(out).find('.commentlist');
            nextlink = $(out).find('#comments-navi');
            $('.comments-loading').slideUp('fast');
            $('.comments-loading').after(result.fadeIn(500));
            $('.commentlist').after(nextlink);
        }
    });
});