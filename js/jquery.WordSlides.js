/**
 * Created by cheng on 16/5/25.
 */
(function( $, undefined ) {
    "use strict";

    $.WordSlides 				= function( options, element ) {

        this.$el	= $( element );
        this._init( options );

    };

    $.WordSlides.defaults 		= {
        current		: 0	// 默认显示到第几个
    };

    $.WordSlides.prototype 	= {
        _init 				: function( options ) {

            //当前的配置
            this.options 		= $.extend( true, {}, $.WordSlides.defaults, options );
            //当前默认的元素索引
            this.current		= this.options.current;
            //外壳包裹元素
            this.$wrapper		= this.$el.find('.dc-wrapper');

            //所有子页面不可见
            this._getItems().css({
                'opacity'	: 0,
                'visibility': 'hidden'
            });

            //初始化布局
            this._layout();

        },
        //获取page子元素
        _getItems           : function () {
            return this.$wrapper.children('div');
        },
        //获取多少个page子元素
        _itemsCount         : function () {
            return this.$wrapper.children('div').length;
        },
        //设置子页面的形态
        _setItems           : function () {

            var items = this._getItems();
            var itemsCount = this._itemsCount();

            //当前中间的试图
            this.$currentItm	= items.eq( this.current );
            //紧邻中间试图的左边试图
            this.$leftItm		= ( this.current === 0 ) ? null : items.eq( this.current - 1 );
            //紧邻中间试图的右边试图
            this.$rightItm		= ( this.current === itemsCount - 1 ) ? null : items.eq( this.current + 1 );

            if (this.$leftItm){
                var prev = this.$leftItm.prev();
                this.$prevItm = prev.length == 1 ? prev :null;
            }else{
                this.$prevItm = null;
            }

            if (this.$rightItm){
                var next = this.$rightItm.next();
                this.$nextItm = next.length == 1 ? next :null;
            }else{
                this.$nextItm = null;
            }


            items.css( 'z-index', 1 );
            this.$currentItm.css( 'z-index', 999 );

        },
        //初始布局
        _layout             : function (){
            this._setItems();

            var leftCSS, rightCSS, currentCSS;

            leftCSS = this._getCoordinates('left');
            rightCSS = this._getCoordinates('right');
            currentCSS = this._getCoordinates('center');

            if (this.$leftItm){
                leftCSS.opacity	= 1;
                leftCSS.visibility	= 'visible';
                this.$leftItm.css(leftCSS);
            }

            if (this.$rightItm){
                rightCSS.opacity	= 1;
                rightCSS.visibility	= 'visible';
                this.$rightItm.css(rightCSS);
            }

            if (this.$currentItm){
                currentCSS.opacity	= 1;
                currentCSS.visibility	= 'visible';
                this.$currentItm.css(currentCSS);
            }


        },
        //获取对应page的样式和坐标
        _getCoordinates     : function (position) {

            switch (position){
                case 'left':
                    return {
                        '-webkit-transform'	: 'translateX(-100px) scale(0.9,0.9)',
                        '-moz-transform'	: 'translateX(-100px) scale(0.9,0.9)',
                        '-o-transform'		: 'translateX(-100px) scale(0.9,0.9)',
                        '-ms-transform'		: 'translateX(-100px) scale(0.9,0.9)',
                        'transform'			: 'translateX(-100px) scale(0.9,0.9)',
                        '-moz-filter'       : 'blur(5px)',
                        '-webkit-filter'    : 'blur(5px)',
                        '-o-filter'         : 'blur(5px)',
                        '-ms-filter'        : 'blur(5px)',
                        'filter'            : 'blur(5px)',
                        'opacity'	: 1,
                        'visibility': 'visible'
                    };
                    break;
                case 'leftLeft':
                    return {
                        '-webkit-transform'	: 'translateX(-100px) scale(0.9,0.9)',
                        '-moz-transform'	: 'translateX(-100px) scale(0.9,0.9)',
                        '-o-transform'		: 'translateX(-100px) scale(0.9,0.9)',
                        '-ms-transform'		: 'translateX(-100px) scale(0.9,0.9)',
                        'transform'			: 'translateX(-100px) scale(0.9,0.9)',
                        'opacity'	: 0,
                        'visibility': 'hidden'
                    };
                    break;
                case 'center':
                    return {
                        '-webkit-transform'	: 'none',
                        '-moz-transform'	: 'none',
                        '-o-transform'		: 'none',
                        '-ms-transform'		: 'none',
                        'transform'			: 'none',
                        '-moz-filter'       : 'none',
                        '-webkit-filter'    : 'none',
                        '-o-filter'         : 'none',
                        '-ms-filter'        : 'none',
                        'filter'            : 'none',
                        'opacity'	: 1,
                        'visibility': 'visible'
                    };
                    break;
                case 'right':
                    return {
                        '-webkit-transform'	: 'translateX(100px) scale(0.9,0.9)',
                        '-moz-transform'	: 'translateX(100px) scale(0.9,0.9)',
                        '-o-transform'		: 'translateX(100px) scale(0.9,0.9)',
                        '-ms-transform'		: 'translateX(100px) scale(0.9,0.9)',
                        'transform'			: 'translateX(100px) scale(0.9,0.9)',
                        '-moz-filter'       : 'blur(5px)',
                        '-webkit-filter'    : 'blur(5px)',
                        '-o-filter'         : 'blur(5px)',
                        '-ms-filter'        : 'blur(5px)',
                        'filter'            : 'blur(5px)',
                        'opacity'	: 1,
                        'visibility': 'visible'
                    };
                    break;
                case 'rightRight':
                    return {
                        '-webkit-transform'	: 'translateX(100px) scale(0.9,0.9)',
                        '-moz-transform'	: 'translateX(100px) scale(0.9,0.9)',
                        '-o-transform'		: 'translateX(100px) scale(0.9,0.9)',
                        '-ms-transform'		: 'translateX(100px) scale(0.9,0.9)',
                        'transform'			: 'translateX(100px) scale(0.9,0.9)',
                        '-moz-filter'       : 'blur(5px)',
                        '-webkit-filter'    : 'blur(5px)',
                        '-o-filter'         : 'blur(5px)',
                        '-ms-filter'        : 'blur(5px)',
                        'filter'            : 'blur(5px)',
                        'opacity'	: 0,
                        'visibility': 'hidden'
                    };
                    break;

            }
        },
        //操作的动作
        _action             : function ( dir , index) {
            switch (dir){
                case 'next':
                    if (this.$rightItm){
                        this.current = this.$rightItm.index();
                    }
                    break;
                case 'prev':
                    if (this.$leftItm){
                        this.current = this.$leftItm.index();
                    }
                    break;
                case 'move':
                    this.current = index;
                    //所有子页面不可见
                    this._getItems().css({
                        '-webkit-transform'	: 'none',
                        '-moz-transform'	: 'none',
                        '-o-transform'		: 'none',
                        '-ms-transform'		: 'none',
                        'transform'			: 'none',
                        'opacity'	: 0,
                        'visibility': 'hidden'
                    });
                    break;
                case 'update':
                    this._getItems().css({
                        '-webkit-transform'	: 'none',
                        '-moz-transform'	: 'none',
                        '-o-transform'		: 'none',
                        '-ms-transform'		: 'none',
                        'transform'			: 'none',
                        'opacity'	: 0,
                        'visibility': 'hidden'
                    });
                    break;
            }

            this._setItems();

            var leftCSS, rightCSS, currentCSS;

            leftCSS = this._getCoordinates('left');
            rightCSS = this._getCoordinates('right');
            currentCSS = this._getCoordinates('center');

            if (this.$leftItm){
                leftCSS.opacity	= 1;
                leftCSS.visibility	= 'visible';
                this.$leftItm.css(leftCSS);
            }

            if (this.$rightItm){
                rightCSS.opacity	= 1;
                rightCSS.visibility	= 'visible';
                this.$rightItm.css(rightCSS);
            }

            if (this.$currentItm){
                currentCSS.opacity	= 1;
                currentCSS.visibility	= 'visible';
                this.$currentItm.css(currentCSS);
            }

            if (this.$prevItm){
                this.$prevItm.css(this._getCoordinates('leftLeft'));
            }

            if (this.$nextItm){
                this.$nextItm.css(this._getCoordinates('rightRight'));
            }

        },
        //下一个
        next                : function () {
            this._action('next');
        },
        //上一个
        prev                : function () {
            this._action('prev');
        },
        //跳转到哪里
        move                : function (index) {

            if ((this._itemsCount() - 1) < index || index < 0){
                return false;
            }
            this._action('move' , index);
        },
        //更新页面
        update              : function () {
            this._action('update' );
        },
        //销毁
        destroy             : function () {
            
        }


    }

    var logError 			= function( message ) {
        if ( this.console ) {
            console.error( message );
        }
    };


    $.fn.WordSlides			= function( options ) {

        if ( typeof options === 'string' ) {

            var args = Array.prototype.slice.call( arguments, 1 );

            this.each(function() {

                var instance = $.data( this, 'WordSlides' );

                if ( !instance ) {
                    logError( "cannot call methods on WordSlides prior to initialization; " +
                        "attempted to call method '" + options + "'" );
                    return;
                }

                if ( !$.isFunction( instance[options] ) || options.charAt(0) === "_" ) {
                    logError( "no such method '" + options + "' for WordSlides instance" );
                    return;
                }

                instance[ options ].apply( instance, args );

            });

        }
        else {

            this.each(function() {

                var instance = $.data( this, 'WordSlides' );

                if ( !instance ) {
                    $.data( this, 'WordSlides', new $.WordSlides( options, this ) );
                }
            });

        }

        return this;

    };
})( jQuery );