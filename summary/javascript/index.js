/**
 * Created by admin on 2018-6-6.
 */

$( document ).ready( function () {
    var index = {
        //参数定义
        parameter: {
            currentOpenPanel: '',
            showFlag: true,
            query_form: $( '#j_hidden_query_form' )
        },

        //程序入口
        init: function () {
            var self = this, para = self.parameter;

            self._execute();
            self._bind();
            $.common.initJQueryUI();
        },

        //执行
        _execute: function () {
            var self = this, para = self.parameter;

            self._addFormValidate();
            self._initDatePicker();
        },

        _initDatePicker: function(){
            $( '.show-for-date' ).datepicker( {
                dateFormat: "dd.mm.yy"
            } );
        },

        _addFormValidate: function(){
            $( '#j_flights_form' ).validate();
            $( '#j_hotels_form' ).validate();
            $( '#j_login_form' ).validate();
        },

        showFloatPanel: function( type, elm ){
            var self = this, para = self.parameter, allElm = $( '.has-float-panel' ), allPanel = $( '.has-float-panel .float-panel'), targetPanel = elm.find( '.float-panel' );

            if( $.common.notNull( elm.closest( '.float-panel' ) ) || $.common.notNull( elm.closest( '#ui-datepicker-div') ) ){
                para.showFlag = false;

                window.setTimeout( function(){
                    para.showFlag = true;
                }, 0 );

                return false;
            }

            if( para.showFlag ){
                allElm.removeClass( 'open' );
                allPanel.hide();

                if( type ){
                    para.showFlag = false;
                    if( type != para.currentOpenPanel ){
                        para.currentOpenPanel = type;
                        elm.addClass( 'open' );
                        targetPanel.show();
                    }

                    window.setTimeout( function(){
                        para.showFlag = true;
                    }, 0 );
                }
                else{
                    para.currentOpenPanel = '';
                }
            }
        },

        //事件绑定
        _bind: function () {
            var self = this, para = self.parameter;

            $( '.to-jump-link' ).bind( 'click', function( e ){
                var elm = $( e.currentTarget );
                $.common.jump_to_link( elm );
            } );

            $( '*' ).bind( 'click', function( e ){
                var elm = $( e.currentTarget);
                self.showFloatPanel( elm.attr( 'user-data-type' ), elm );
            } );
        }
    };

    index.init();
});