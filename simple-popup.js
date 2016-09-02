function SimplePopup () {

    this.popup = null;

    this._transitionOnEnter = "";

    this._transitionOnExit = "";

    this.defaults = {

        closeBtn:  true,

        transition: {
            onOpen: null,

            onClose: null
        }
    };
}

SimplePopup.prototype.open = function (obj) {
    /** Check if already popup */
    if (this.popup != null) {
        this.close();
    }

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
    if (!obj.transition || obj.transition == null) {
        obj.transition = this.defaults.transition;
    }

    /** apply the values */
    this._getTransition(obj.transition);

    $(obj.content).removeClass('rsp-hide');
    $(obj.content).addClass('content');
    this.popup = $(obj.content).wrap("<div class='rsp'></div>");

    if (obj.closeBtn) {
        this.popup.prepend("<div class='close-button' onclick='rsp.close();'><p>×</p></div>");
    }

    $("body").append(
        $("<div>", {
                "class" : "rsp-overlay " + this._transitionOnEnter,
                "onclick" : "rsp.close()"
            }
        )
    );

    $("body").css("overflow", "hidden");
};

SimplePopup.prototype.close = function() {
    $('.rsp .close-button').remove();
    this.popup.unwrap();

    this.popup.addClass('rsp-hide');

    $('.rsp-overlay').remove();

    $("body").css("overflow", "auto");
};

SimplePopup.prototype._getTransition = function(obj) {

    switch (obj.onEnter) {
        case "slide":
            this._transitionOnEnter = "slide";
            break;
        case "fade":
            this._transitionOnEnter = "fade";
            break;
        default:
            break;
    }

    switch (obj.onExit) {
        case "slide":
            this._transitionOnExit = "slide";
            break;
        case "fade":
            this._transitionOnExit = "fade";
            break;
        default:
            break;
    }

};

var rsp = new SimplePopup();