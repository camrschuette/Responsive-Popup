function ResponsivePopup () {
    this.popup = null;
}

ResponsivePopup.prototype.open = function (obj) {
    /** Required Params */
    if (obj.content == null) {
        console.error("No body content included");
        return;
    } else if (!$(obj.content).length) {
        console.error("No body content included");
        return;
    }

    /** Default Values */
    if (!obj.closeBtn || obj.closeBtn == null) {
        obj.closeBtn = true;
    }

    $(obj.content).removeClass('rsp-hide');
    $(obj.content).addClass('content');
    this.popup = $(obj.content).wrap("<div class='rsp'></div>");

    if (obj.closeBtn) {
        this.popup.prepend("<div class='close-button' onclick='rsp.close();'><i class='fa fa-times' aria-hidden='true'></i></div>");
    }

    $("body").append(
        $("<div>", {
                "class" : "rsp-overlay",
                "onclick" : "rsp.close()"
            }
        )
    );

    $("body").css("overflow", "hidden");
};

ResponsivePopup.prototype.close = function() {
    $('.rsp .close-button').remove();
    this.popup.unwrap();

    this.popup.addClass('rsp-hide');

    $('.rsp-overlay').remove();

    $("body").css("overflow", "auto");
};

var rsp = new ResponsivePopup();