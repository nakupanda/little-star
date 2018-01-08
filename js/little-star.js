/**
 * Star rating library based on Font-Awesome icons.
 * 
 */
var LittleStar = null;

!function ($) {
    "use strict";

    LittleStar = function (options) {
        this.options = $.extend({
            namespace: 'little-star',
            max: 5,
            stars: 0,
            readonly: true,
            onRating: null,
            onRated: null
        }, options);
        this.init();
    };
    LittleStar.STAR_EMPTY = 0;
    LittleStar.STAR_FULL = 1;
    LittleStar.prototype = {
        constructor: LittleStar,
        init: function () {
            var $view = this.createView();
            $view.html('');
            for (var i = 1; i <= this.options.max; i++) {
                var $star = this.createStar();
                $star.addClass('star-' + i);
                $star.data('stars', i);
                $star.data('littleStar', this);
                $star.off('mouseover').on('mouseover', {littleStar: this}, function (event) {
                    var littleStar = event.data.littleStar;
                    if (!littleStar.isReadonly()) {
                        var $star = $(this);
                        var stars = $star.data('stars');
                        typeof littleStar.options.onRating === 'function' && littleStar.options.onRating.call(littleStar, stars);
                        littleStar.updateView(stars);
                    }
                });
                $view.append($star);
            }
            $view.off('mouseleave').on('mouseleave', {littleStar: this}, function (event) {
                var littleStar = event.data.littleStar;
                littleStar.updateView();
            });
            $view.off('click').on('click', {littleStar: this}, function (event) {
                var littleStar = event.data.littleStar;
                if (!littleStar.isReadonly()) {
                    var prevStars = littleStar.getStars();
                    var stars = littleStar.getView().data('stars');
                    littleStar.setStars(stars);
                    typeof littleStar.options.onRated === 'function' && littleStar.options.onRated.call(littleStar, prevStars, stars);
                    littleStar.updateView();
                }
            });
            this.setView($view);
            this.updateView();

            return this;
        },
        createView: function () {
            var $view = $('<span></span>');
            $view.addClass(this.options.namespace);
            $view.addClass('star-bar');

            return $view;
        },
        getView: function () {
            return this.$view;
        },
        setView: function ($view) {
            this.$view = $view;

            return this;
        },
        updateView: function (stars) {
            var max = this.options.max;
            if (!stars) {
                stars = this.getStars();
            }

            var $view = this.getView();
            if (this.isReadonly()) {
                $view.addClass('readonly');
            } else {
                $view.removeClass('readonly');
            }
            $view.removeClass(function (i, className) {
                return (className.match(/max-\d+/g) || []).join(' ');
            });
            $view.removeClass(function (i, className) {
                return (className.match(/stars-\d+/g) || []).join(' ');
            });
            $view.addClass('max-' + max);
            $view.addClass('stars-' + stars);
            $view.data('stars', stars);

            var $stars = $view.find('.little-star-star');
            $stars.each(function (i) {
                var $star = $(this);
                if ($star.data('stars') <= stars) {
                    $star.addClass('fa-star');
                    $star.removeClass('fa-star-o');
                } else {
                    $star.addClass('fa-star-o');
                    $star.removeClass('fa-star');
                }
            });

            return this;
        },
        createStar: function () {
            var $star = $('<i class="fa fa-star-o little-star-star"></i>');

            return $star;
        },
        isReadonly: function () {
            return this.options.readonly;
        },
        setReadonly: function (readonly) {
            this.options.readonly = readonly;
            this.updateView();

            return this;
        },
        getStars: function () {
            return this.options.stars;
        },
        setStars: function (stars) {
            this.options.stars = stars;
            this.updateView();

            return this;
        }
    };

    $.fn.littlestar = function (options) {
        return this.each(function (index) {
            var $this = $(this);
            var data = $this.data('littlestar');
            if (!data) {
                var littleStar = new LittleStar(options);
                $this.data('littlestar', littleStar);
                $this.html(littleStar.getView());
            }
        });
    };
}(window.jQuery);