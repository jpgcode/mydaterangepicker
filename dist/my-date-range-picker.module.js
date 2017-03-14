import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MyDateRangePicker } from "./my-date-range-picker.component";
import { FocusDirective } from "./directives/my-date-range-picker.focus.directive";
export var MyDateRangePickerModule = (function () {
    function MyDateRangePickerModule() {
    }
    MyDateRangePickerModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule],
                    declarations: [MyDateRangePicker, FocusDirective],
                    exports: [MyDateRangePicker, FocusDirective]
                },] },
    ];
    /** @nocollapse */
    MyDateRangePickerModule.ctorParameters = [];
    return MyDateRangePickerModule;
}());
//# sourceMappingURL=my-date-range-picker.module.js.map