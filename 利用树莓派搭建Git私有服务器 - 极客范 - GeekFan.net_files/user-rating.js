(function ($) {

    function user_rating() {
        if ($('.gp-user-stars-wrapper').length) {
          this.el = this.build_el();
          if (!this.is_rated()) {
              this.el.stars.top.css('background-position-y', '1px');
              this.el.stars.under.css('width', ratingWidth);
              this.bind_events();
          } else {
              this.display_user_rating();
          }
        }
    }

    user_rating.prototype.is_rated = function () {
        if (this.readCookie('gp_rating_' + gp_script.post_id) === 'rated') {
            return true;
        } else {
            return false;
        }
    };

    user_rating.prototype.display_user_rating = function () {
        var score = this.readCookie('gp_rating_score_' + gp_script.post_id),
            position = this.readCookie('gp_rating_position_'+ gp_script.post_id);
        this.el.rating.score.html(score);
        this.el.stars.top.css('width', position + 'px');
        this.el.rating.label.your_rating.show();
        this.el.rating.label.user_rating.hide();
    };

    user_rating.prototype.build_el = function () {
        var el = {
            rating:{
                score:$('span.score', '.gp-text-wrapper'),
                count:$('span.count', '.gp-text-wrapper'),
                label:{
                    your_rating:$('span.your_rating', '.gp-text-wrapper'),
                    user_rating:$('span.user_rating', '.gp-text-wrapper')
                }
            },
            stars:{
                under:$('.rating-unselected', '.gp-user-stars-wrapper'),
                top:$('.rating-selection', '.gp-user-stars-wrapper')
            }
        };

        // Plain JS style retrieval
        el.stars.old_position = parseInt(el.stars.top[0].style.width, 10);
        el.rating.old_score = el.rating.score.html();

        return el;
    };

    user_rating.prototype.bind_events = function () {
        var me = this;

        // Hover effect
        me.el.stars.under.on('mouseover', function () {
            // changes the sprite
            me.el.stars.top.css('background-position-y', '-20px');

            // Changes the cursor
            $(this).css('cursor', 'pointer');

            // changes the text
            me.el.rating.label.your_rating.show();
            me.el.rating.label.user_rating.hide();

        });
        me.el.stars.under.on('mouseout', function () {
            // Returns the sprite
            me.el.stars.top.css('background-position-y', '1px');

            // Returns the initial position
            me.el.stars.top.css('width', me.el.stars.old_position + 'px');

            // Returns the text and initial rating
            me.el.rating.label.user_rating.show();
            me.el.rating.label.your_rating.hide();
            me.el.rating.score.html(me.el.rating.old_score);

        });
        me.el.stars.under.on('mousemove', function (e) {
            if (!e.offsetX){
                e.offsetX = e.clientX - $(e.target).offset().left;
            }
            // Moves the width
            var offset = e.offsetX + 4;
            if (offset > ratingWidth) {
                offset = ratingWidth;
            }
            me.el.stars.top.css('width', offset + 'px');

            // Update the real-time score
            var score = Math.floor((((((offset / ratingWidth) * 100) * starNumber) / 100) * 10)) / 10;
            if (score > starNumber) {
                score = starNumber;
            }
            me.el.rating.score.html(score);

        });

        // Click effect
        me.el.stars.under.on('click', function (e) {
            if (!e.offsetX){
                e.offsetX = e.clientX - $(e.target).offset().left;
            }
            var count = parseInt(me.el.rating.count.html(), 10) + 1,
                score = (Math.floor(((((((e.offsetX + 4) / ratingWidth) * 100) * starNumber) / 100) * 10)) / 10),
                position = e.offsetX + 4;
            if (score > starNumber) {
                score = starNumber;
            }        
            if (position > ratingWidth) {
                position = ratingWidth;
            }
            // Unbind events
            me.el.stars.under.off();
            me.el.stars.under.css('cursor', 'default');

            // Stars animation
            me.el.stars.top.fadeOut(function () {
                me.el.stars.top.css('background-position-y', '0');
                me.el.stars.top.fadeIn();
            });

            // Count increment
            me.el.rating.count.html(count);

            // AJAX call to wordpress
            var req = {
                action:'gp_rating',
                rating_position:position,
                rating_score:score,
                post_id:gp_script.post_id
            };

            $.post(gp_script.ajaxurl, req, function () {
                // Save cookie
                me.createCookie('gp_rating_' + gp_script.post_id, 'rated', 900);
                me.createCookie('gp_rating_score_' + gp_script.post_id, score, 900);
                me.createCookie('gp_rating_position_' + gp_script.post_id, position, 900);
            })
        });
    };

    user_rating.prototype.createCookie = function (name, value, days) {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            var expires = "; expires=" + date.toGMTString();
        }
        else var expires = "";
        document.cookie = name + "=" + value + expires + "; path=/";
    }

    user_rating.prototype.readCookie = function (name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    user_rating.prototype.eraseCookie = function (name) {
        createCookie(name, "", -1);
    }

    $(document).ready(function () {
        new user_rating();
    });
})(jQuery);