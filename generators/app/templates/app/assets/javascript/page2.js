var wsjs = (function (wsjs) {

    wsjs = wsjs || {};

        (function ($) {

        $(function () {

            wsjs.function2 = function () {

                alert("page2");
            };

        });

    }(jQuery));

    return wsjs;

})(wsjs);