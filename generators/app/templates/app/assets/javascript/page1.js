var wsjs = (function (wsjs) {

    wsjs = wsjs || {};

        (function ($) {

        $(function () {

            wsjs.function1 = function () {

                alert("page1");
            };

        });

    }(jQuery));

    return wsjs;

})(wsjs);