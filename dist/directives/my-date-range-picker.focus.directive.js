import { Directive, ElementRef, Renderer, Input } from "@angular/core";
export var FocusDirective = (function () {
    function FocusDirective(el, renderer) {
        this.el = el;
        this.renderer = renderer;
    }
    // Focus to element: if value 0 = don't set focus, 1 = set only focus, 2 = set focus and set cursor position
    FocusDirective.prototype.ngAfterViewInit = function () {
        if (this.value === "0") {
            return;
        }
        this.renderer.invokeElementMethod(this.el.nativeElement, "focus", []);
        // Set cursor position at the end of text if input element
        if (this.value === "2") {
            var len = this.el.nativeElement.value.length;
            this.el.nativeElement.setSelectionRange(len, len);
        }
    };
    FocusDirective.decorators = [
        { type: Directive, args: [{
                    selector: "[mydrpfocus]"
                },] },
    ];
    /** @nocollapse */
    FocusDirective.ctorParameters = [
        { type: ElementRef, },
        { type: Renderer, },
    ];
    FocusDirective.propDecorators = {
        'value': [{ type: Input, args: ["mydrpfocus",] },],
    };
    return FocusDirective;
}());
//# sourceMappingURL=my-date-range-picker.focus.directive.js.map