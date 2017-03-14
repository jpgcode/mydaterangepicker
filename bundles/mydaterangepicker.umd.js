(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/forms'), require('@angular/common')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/forms', '@angular/common'], factory) :
	(factory((global.mydaterangepicker = global.mydaterangepicker || {}),global.ng.core,global.ng.forms,global.ng.common));
}(this, (function (exports,_angular_core,_angular_forms,_angular_common) { 'use strict';

var DateRangeUtilService = (function () {
    function DateRangeUtilService() {
    }
    DateRangeUtilService.prototype.isDateRangeValid = function (daterange, dateFormat, minYear, maxYear, disableUntil, disableSince, monthLabels) {
        var invalidDateRange = {
            beginDate: { day: 0, month: 0, year: 0 },
            endDate: { day: 0, month: 0, year: 0 }
        };
        var isMonthStr = dateFormat.indexOf("mmm") !== -1;
        if (daterange.length !== 23 && !isMonthStr || daterange.length !== 25 && isMonthStr) {
            return invalidDateRange;
        }
        var dates = daterange.split(" - ");
        if (dates.length !== 2) {
            return invalidDateRange;
        }
        var validDates = [];
        var notSetDate = { day: 0, month: 0, year: 0 };
        for (var i in dates) {
            var date = this.isDateValid(dates[i], dateFormat, minYear, maxYear, monthLabels, isMonthStr);
            if (date.day === 0 && date.month === 0 && date.year === 0) {
                return invalidDateRange;
            }
            if (this.isDisabledDay(date, disableUntil, disableSince, notSetDate, notSetDate)) {
                return invalidDateRange;
            }
            validDates.push(date);
        }
        if (this.getTimeInMilliseconds(validDates[1]) < this.getTimeInMilliseconds(validDates[0])) {
            return invalidDateRange;
        }
        // Valid date range
        return {
            beginDate: { day: validDates[0].day, month: validDates[0].month, year: validDates[0].year },
            endDate: { day: validDates[1].day, month: validDates[1].month, year: validDates[1].year }
        };
    };
    DateRangeUtilService.prototype.isMonthLabelValid = function (monthLabel, monthLabels) {
        for (var key = 1; key <= 12; key++) {
            if (monthLabel.toLowerCase() === monthLabels[key].toLowerCase()) {
                return key;
            }
        }
        return -1;
    };
    DateRangeUtilService.prototype.isYearLabelValid = function (yearLabel, minYear, maxYear) {
        if (yearLabel >= minYear && yearLabel <= maxYear) {
            return yearLabel;
        }
        return -1;
    };
    DateRangeUtilService.prototype.parseDatePartNumber = function (dateFormat, dateString, datePart) {
        var pos = dateFormat.indexOf(datePart);
        if (pos !== -1) {
            var value = dateString.substring(pos, pos + datePart.length);
            if (!/^\d+$/.test(value)) {
                return -1;
            }
            return parseInt(value);
        }
        return -1;
    };
    DateRangeUtilService.prototype.parseDatePartMonthName = function (dateFormat, dateString, datePart, monthLabels) {
        var pos = dateFormat.indexOf(datePart);
        if (pos !== -1) {
            return this.isMonthLabelValid(dateString.substring(pos, pos + datePart.length), monthLabels);
        }
        return -1;
    };
    DateRangeUtilService.prototype.parseDefaultMonth = function (monthString) {
        var month = { monthTxt: "", monthNbr: 0, year: 0 };
        if (monthString !== "") {
            var split = monthString.split(monthString.match(/[^0-9]/)[0]);
            month.monthNbr = split[0].length === 2 ? parseInt(split[0]) : parseInt(split[1]);
            month.year = split[0].length === 2 ? parseInt(split[1]) : parseInt(split[0]);
        }
        return month;
    };
    DateRangeUtilService.prototype.isDisabledDay = function (date, disableUntil, disableSince, preventBefore, preventAfter) {
        var givenDate = this.getTimeInMilliseconds(date);
        if (this.isInitializedDate(disableUntil) && givenDate <= this.getTimeInMilliseconds(disableUntil)) {
            return true;
        }
        if (this.isInitializedDate(disableSince) && givenDate >= this.getTimeInMilliseconds(disableSince)) {
            return true;
        }
        if (this.isInitializedDate(preventBefore) && givenDate <= this.getTimeInMilliseconds(preventBefore)) {
            return true;
        }
        if (this.isInitializedDate(preventAfter) && givenDate >= this.getTimeInMilliseconds(preventAfter)) {
            return true;
        }
        return false;
    };
    DateRangeUtilService.prototype.isMonthDisabledByDisableUntil = function (date, disableUntil) {
        return this.isInitializedDate(disableUntil) && this.getTimeInMilliseconds(date) <= this.getTimeInMilliseconds(disableUntil);
    };
    DateRangeUtilService.prototype.isMonthDisabledByDisableSince = function (date, disableSince) {
        return this.isInitializedDate(disableSince) && this.getTimeInMilliseconds(date) >= this.getTimeInMilliseconds(disableSince);
    };
    DateRangeUtilService.prototype.isInitializedDate = function (date) {
        return date.year !== 0 && date.month !== 0 && date.day !== 0;
    };
    DateRangeUtilService.prototype.getTimeInMilliseconds = function (date) {
        return new Date(date.year, date.month - 1, date.day, 0, 0, 0, 0).getTime();
    };
    DateRangeUtilService.prototype.getWeekNumber = function (date) {
        var d = new Date(date.year, date.month - 1, date.day, 0, 0, 0, 0);
        d.setDate(d.getDate() + (d.getDay() === 0 ? -3 : 4 - d.getDay()));
        return Math.round(((d.getTime() - new Date(d.getFullYear(), 0, 4).getTime()) / 86400000) / 7) + 1;
    };
    DateRangeUtilService.prototype.isDateValid = function (date, dateFormat, minYear, maxYear, monthLabels, isMonthStr) {
        var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        var invalidDate = { day: 0, month: 0, year: 0 };
        if (date.length !== 10 && !isMonthStr || date.length !== 11 && isMonthStr) {
            return invalidDate;
        }
        var separator = dateFormat.replace(/[dmy]/g, "")[0];
        var parts = date.split(separator);
        if (parts.length !== 3) {
            return invalidDate;
        }
        var day = this.parseDatePartNumber(dateFormat, date, "dd");
        var month = isMonthStr ? this.parseDatePartMonthName(dateFormat, date, "mmm", monthLabels) : this.parseDatePartNumber(dateFormat, date, "mm");
        var year = this.parseDatePartNumber(dateFormat, date, "yyyy");
        if (day !== -1 && month !== -1 && year !== -1) {
            if (year < minYear || year > maxYear || month < 1 || month > 12) {
                return invalidDate;
            }
            if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) {
                daysInMonth[1] = 29;
            }
            if (day < 1 || day > daysInMonth[month - 1]) {
                return invalidDate;
            }
            // Valid date
            return { day: day, month: month, year: year };
        }
        return invalidDate;
    };
    DateRangeUtilService.decorators = [
        { type: _angular_core.Injectable },
    ];
    /** @nocollapse */
    DateRangeUtilService.ctorParameters = [];
    return DateRangeUtilService;
}());

var FocusDirective = (function () {
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
        { type: _angular_core.Directive, args: [{
                    selector: "[mydrpfocus]"
                },] },
    ];
    /** @nocollapse */
    FocusDirective.ctorParameters = [
        { type: _angular_core.ElementRef, },
        { type: _angular_core.Renderer, },
    ];
    FocusDirective.propDecorators = {
        'value': [{ type: _angular_core.Input, args: ["mydrpfocus",] },],
    };
    return FocusDirective;
}());

/*
declare var require: any;
const myDrpStyles: string = require("./my-date-range-picker.component.css");
const myDrpTemplate: string = require("./my-date-range-picker.component.html");
*/
var MYDRP_VALUE_ACCESSOR = {
    provide: _angular_forms.NG_VALUE_ACCESSOR,
    useExisting: _angular_core.forwardRef(function () { return MyDateRangePicker; }),
    multi: true
};
var MyDateRangePicker = (function () {
    function MyDateRangePicker(elem, renderer, drus) {
        var _this = this;
        this.elem = elem;
        this.renderer = renderer;
        this.drus = drus;
        this.dateRangeChanged = new _angular_core.EventEmitter();
        this.inputFieldChanged = new _angular_core.EventEmitter();
        this.calendarViewChanged = new _angular_core.EventEmitter();
        this.dateSelected = new _angular_core.EventEmitter();
        this.onChangeCb = function () { };
        this.onTouchedCb = function () { };
        this.showSelector = false;
        this.visibleMonth = { monthTxt: "", monthNbr: 0, year: 0 };
        this.selectedMonth = { monthTxt: "", monthNbr: 0, year: 0 };
        this.weekDays = [];
        this.dates = [];
        this.selectionDayTxt = "";
        this.invalidDateRange = false;
        this.dateRangeFormat = "";
        this.dayIdx = 0;
        this.weekDayOpts = ["su", "mo", "tu", "we", "th", "fr", "sa"];
        this.editMonth = false;
        this.invalidMonth = false;
        this.editYear = false;
        this.invalidYear = false;
        this.prevMonthDisabled = false;
        this.nextMonthDisabled = false;
        this.prevYearDisabled = false;
        this.nextYearDisabled = false;
        this.PREV_MONTH = 1;
        this.CURR_MONTH = 2;
        this.NEXT_MONTH = 3;
        this.MIN_YEAR = 1000;
        this.MAX_YEAR = 9999;
        this.isBeginDate = true;
        this.beginDate = { year: 0, month: 0, day: 0 };
        this.endDate = { year: 0, month: 0, day: 0 };
        this.preventBefore = { year: 0, month: 0, day: 0 };
        this.preventAfter = { year: 0, month: 0, day: 0 };
        this.titleAreaTextBegin = "";
        this.titleAreaTextEnd = "";
        // Default options
        this.opts = {
            dayLabels: { su: "Sun", mo: "Mon", tu: "Tue", we: "Wed", th: "Thu", fr: "Fri", sa: "Sat" },
            monthLabels: { 1: "Jan", 2: "Feb", 3: "Mar", 4: "Apr", 5: "May", 6: "Jun", 7: "Jul", 8: "Aug", 9: "Sep", 10: "Oct", 11: "Nov", 12: "Dec" },
            dateFormat: "yyyy-mm-dd",
            showClearBtn: true,
            clearBtnTxt: "Clear",
            beginDateBtnTxt: "Begin Date",
            endDateBtnTxt: "End Date",
            acceptBtnTxt: "Accept",
            showSelectDateText: true,
            selectBeginDateTxt: "Select Begin Date",
            selectEndDateTxt: "Select End Date",
            firstDayOfWeek: "mo",
            sunHighlight: true,
            markCurrentDay: true,
            height: "34px",
            width: "262px",
            inline: false,
            showClearDateRangeBtn: true,
            selectionTxtFontSize: "16px",
            alignSelectorRight: false,
            indicateInvalidDateRange: true,
            editableDateRangeField: true,
            editableMonthAndYear: true,
            disableHeaderButtons: true,
            showWeekNumbers: false,
            minYear: this.MIN_YEAR,
            maxYear: this.MAX_YEAR,
            disableUntil: { year: 0, month: 0, day: 0 },
            disableSince: { year: 0, month: 0, day: 0 },
            componentDisabled: false,
            inputValueRequired: false,
            showSelectorArrow: true,
            quickRangeSelect: true
        };
        renderer.listenGlobal("document", "click", function (event) {
            if (_this.showSelector && event.target && _this.elem.nativeElement !== event.target && !_this.elem.nativeElement.contains(event.target)) {
                _this.showSelector = false;
            }
            if (_this.opts.editableMonthAndYear && event.target && _this.elem.nativeElement.contains(event.target)) {
                _this.resetMonthYearEdit();
            }
        });
    }
    MyDateRangePicker.prototype.resetMonthYearEdit = function () {
        this.editMonth = false;
        this.editYear = false;
        this.invalidMonth = false;
        this.invalidYear = false;
    };
    MyDateRangePicker.prototype.editMonthClicked = function (event) {
        event.stopPropagation();
        if (this.opts.editableMonthAndYear) {
            this.editMonth = true;
        }
    };
    MyDateRangePicker.prototype.editYearClicked = function (event) {
        event.stopPropagation();
        if (this.opts.editableMonthAndYear) {
            this.editYear = true;
        }
    };
    MyDateRangePicker.prototype.userDateRangeInput = function (event) {
        this.invalidDateRange = false;
        if (event.target.value.length === 0) {
            this.clearDateRange();
        }
        else {
            var daterange = this.drus.isDateRangeValid(event.target.value, this.opts.dateFormat, this.opts.minYear, this.opts.maxYear, this.opts.disableUntil, this.opts.disableSince, this.opts.monthLabels);
            if (daterange.beginDate.day !== 0 && daterange.beginDate.month !== 0 && daterange.beginDate.year !== 0 && daterange.endDate.day !== 0 && daterange.endDate.month !== 0 && daterange.endDate.year !== 0) {
                this.beginDate = daterange.beginDate;
                this.endDate = daterange.endDate;
                this.rangeSelected();
            }
            else {
                this.invalidDateRange = true;
                this.onChangeCb("");
                this.onTouchedCb();
            }
        }
        if (this.invalidDateRange) {
            this.inputFieldChanged.emit({ value: event.target.value, dateRangeFormat: this.dateRangeFormat, valid: !(event.target.value.length === 0 || this.invalidDateRange) });
        }
    };
    MyDateRangePicker.prototype.lostFocusInput = function (event) {
        this.selectionDayTxt = event.target.value;
        this.onTouchedCb();
    };
    MyDateRangePicker.prototype.userMonthInput = function (event) {
        if (event.keyCode === 13 || event.keyCode === 37 || event.keyCode === 39) {
            return;
        }
        this.invalidMonth = false;
        var m = this.drus.isMonthLabelValid(event.target.value, this.opts.monthLabels);
        if (m !== -1) {
            this.editMonth = false;
            var viewChange = m !== this.visibleMonth.monthNbr;
            this.visibleMonth = { monthTxt: this.monthText(m), monthNbr: m, year: this.visibleMonth.year };
            this.generateCalendar(m, this.visibleMonth.year, viewChange);
        }
        else {
            this.invalidMonth = true;
        }
    };
    MyDateRangePicker.prototype.userYearInput = function (event) {
        if (event.keyCode === 13 || event.keyCode === 37 || event.keyCode === 39) {
            return;
        }
        this.invalidYear = false;
        var y = this.drus.isYearLabelValid(Number(event.target.value), this.opts.minYear, this.opts.maxYear);
        if (y !== -1) {
            this.editYear = false;
            var viewChange = y !== this.visibleMonth.year;
            this.visibleMonth = { monthTxt: this.visibleMonth.monthTxt, monthNbr: this.visibleMonth.monthNbr, year: y };
            this.generateCalendar(this.visibleMonth.monthNbr, y, viewChange);
        }
        else {
            this.invalidYear = true;
        }
    };
    MyDateRangePicker.prototype.parseOptions = function () {
        var _this = this;
        if (this.options !== undefined) {
            Object.keys(this.options).forEach(function (k) {
                _this.opts[k] = _this.options[k];
            });
        }
        if (this.opts.minYear < this.MIN_YEAR) {
            this.opts.minYear = this.MIN_YEAR;
        }
        if (this.opts.maxYear > this.MAX_YEAR) {
            this.opts.maxYear = this.MAX_YEAR;
        }
        this.dateRangeFormat = this.opts.dateFormat + " - " + this.opts.dateFormat;
        this.dayIdx = this.weekDayOpts.indexOf(this.opts.firstDayOfWeek);
        if (this.dayIdx !== -1) {
            var idx = this.dayIdx;
            for (var i = 0; i < this.weekDayOpts.length; i++) {
                this.weekDays.push(this.opts.dayLabels[this.weekDayOpts[idx]]);
                idx = this.weekDayOpts[idx] === "sa" ? 0 : idx + 1;
            }
        }
    };
    MyDateRangePicker.prototype.writeValue = function (value) {
        if (value && value["beginDate"] && value["endDate"]) {
            this.beginDate = this.parseSelectedDate(value["beginDate"]);
            this.endDate = this.parseSelectedDate(value["endDate"]);
            var begin = this.formatDate(this.beginDate);
            var end = this.formatDate(this.endDate);
            this.titleAreaTextBegin = begin;
            this.titleAreaTextEnd = end;
            this.selectionDayTxt = begin + " - " + end;
            this.inputFieldChanged.emit({ value: this.selectionDayTxt, dateRangeFormat: this.dateRangeFormat, valid: true });
        }
        else if (value === "") {
            this.clearBtnClicked();
            this.inputFieldChanged.emit({ value: "", dateRangeFormat: this.dateRangeFormat, valid: false });
        }
        this.invalidDateRange = false;
    };
    MyDateRangePicker.prototype.registerOnChange = function (fn) {
        this.onChangeCb = fn;
    };
    MyDateRangePicker.prototype.registerOnTouched = function (fn) {
        this.onTouchedCb = fn;
    };
    MyDateRangePicker.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (changes.hasOwnProperty("placeholder")) {
            this.placeholder = changes["placeholder"].currentValue;
        }
        if (changes.hasOwnProperty("options")) {
            this.options = changes["options"].currentValue;
            this.weekDays.length = 0;
            this.parseOptions();
        }
        if (changes.hasOwnProperty("defaultMonth")) {
            var dm = changes["defaultMonth"].currentValue;
            if (dm !== null && dm !== undefined && dm !== "") {
                this.selectedMonth = this.parseSelectedMonth(dm);
            }
            else {
                this.selectedMonth = { monthTxt: "", monthNbr: 0, year: 0 };
            }
        }
        if (changes.hasOwnProperty("selDateRange")) {
            var sdr = changes["selDateRange"];
            if (sdr.currentValue !== null && sdr.currentValue !== undefined && sdr.currentValue !== "") {
                if (typeof sdr.currentValue === "string") {
                    var split = sdr.currentValue.split(" - ");
                    this.beginDate = this.parseSelectedDate(split[0]);
                    this.endDate = this.parseSelectedDate(split[1]);
                    this.selectionDayTxt = sdr.currentValue;
                }
                else if (typeof sdr.currentValue === "object") {
                    this.beginDate = this.parseSelectedDate(sdr.currentValue["beginDate"]);
                    this.endDate = this.parseSelectedDate(sdr.currentValue["endDate"]);
                    this.selectionDayTxt = this.formatDate(this.beginDate) + " - " + this.formatDate(this.endDate);
                }
                this.titleAreaTextBegin = this.formatDate(this.beginDate);
                this.titleAreaTextEnd = this.formatDate(this.endDate);
                setTimeout(function () {
                    _this.onChangeCb(_this.getDateRangeModel(_this.beginDate, _this.endDate));
                });
                this.toBeginDate();
            }
            else {
                // Do not clear on init
                if (!sdr.isFirstChange()) {
                    this.clearDateRange();
                }
            }
        }
        if (this.opts.inline) {
            this.setVisibleMonth();
        }
    };
    MyDateRangePicker.prototype.removeBtnClicked = function () {
        this.clearDateRange();
    };
    MyDateRangePicker.prototype.openBtnClicked = function () {
        this.showSelector = !this.showSelector;
        if (this.showSelector) {
            this.setVisibleMonth();
        }
    };
    MyDateRangePicker.prototype.setVisibleMonth = function () {
        this.isBeginDate = true;
        if (this.drus.isInitializedDate(this.beginDate)) {
            this.toBeginDate();
        }
        else {
            var y = 0, m = 0;
            if (this.selectedMonth.year === 0 && this.selectedMonth.monthNbr === 0) {
                var today = this.getToday();
                y = today.year;
                m = today.month;
            }
            else {
                y = this.selectedMonth.year;
                m = this.selectedMonth.monthNbr;
            }
            this.visibleMonth = { monthTxt: this.opts.monthLabels[m], monthNbr: m, year: y };
            this.generateCalendar(m, y, true);
        }
    };
    MyDateRangePicker.prototype.prevMonth = function () {
        var d = this.getDate({ year: this.visibleMonth.year, month: this.visibleMonth.monthNbr, day: 1 });
        d.setMonth(d.getMonth() - 1);
        var y = d.getFullYear();
        var m = d.getMonth() + 1;
        this.visibleMonth = { monthTxt: this.monthText(m), monthNbr: m, year: y };
        this.generateCalendar(m, y, true);
    };
    MyDateRangePicker.prototype.nextMonth = function () {
        var d = this.getDate({ year: this.visibleMonth.year, month: this.visibleMonth.monthNbr, day: 1 });
        d.setMonth(d.getMonth() + 1);
        var y = d.getFullYear();
        var m = d.getMonth() + 1;
        this.visibleMonth = { monthTxt: this.monthText(m), monthNbr: m, year: y };
        this.generateCalendar(m, y, true);
    };
    MyDateRangePicker.prototype.prevYear = function () {
        if (this.visibleMonth.year - 1 < this.opts.minYear) {
            return;
        }
        this.visibleMonth.year--;
        this.generateCalendar(this.visibleMonth.monthNbr, this.visibleMonth.year, true);
    };
    MyDateRangePicker.prototype.nextYear = function () {
        if (this.visibleMonth.year + 1 > this.opts.maxYear) {
            return;
        }
        this.visibleMonth.year++;
        this.generateCalendar(this.visibleMonth.monthNbr, this.visibleMonth.year, true);
    };
    MyDateRangePicker.prototype.clearBtnClicked = function () {
        // Clear button selected
        this.isBeginDate = true;
        this.selectionDayTxt = "";
        this.beginDate = { year: 0, month: 0, day: 0 };
        this.endDate = { year: 0, month: 0, day: 0 };
        this.titleAreaTextBegin = "";
        this.titleAreaTextEnd = "";
        this.preventAfter = { year: 0, month: 0, day: 0 };
        this.preventBefore = { year: 0, month: 0, day: 0 };
        this.generateCalendar(this.visibleMonth.monthNbr, this.visibleMonth.year, false);
    };
    MyDateRangePicker.prototype.cellClicked = function (cell) {
        // Cell clicked in the selector
        var bi = this.drus.isInitializedDate(this.beginDate);
        var ei = this.drus.isInitializedDate(this.endDate);
        if (this.opts.quickRangeSelect && !ei) {
            if (!bi || bi && this.drus.getTimeInMilliseconds(cell.dateObj) < this.drus.getTimeInMilliseconds(this.beginDate)) {
                this.selectBeginDate(cell.dateObj);
            }
            else if (this.drus.getTimeInMilliseconds(cell.dateObj) >= this.drus.getTimeInMilliseconds(this.beginDate)) {
                this.selectEndDate(cell.dateObj);
                this.toEndDate();
            }
        }
        else if (this.isBeginDate) {
            this.selectBeginDate(cell.dateObj);
        }
        else {
            this.selectEndDate(cell.dateObj);
        }
    };
    MyDateRangePicker.prototype.selectBeginDate = function (date) {
        this.beginDate = date;
        this.titleAreaTextBegin = this.formatDate(date);
        this.titleAreaTextEnd = this.endDate.year === 0 ? this.opts.selectEndDateTxt : this.formatDate(this.endDate);
        this.dateSelected.emit({ type: 1, date: date, formatted: this.titleAreaTextBegin, jsdate: this.getDate(date) });
    };
    MyDateRangePicker.prototype.selectEndDate = function (date) {
        this.endDate = date;
        this.titleAreaTextEnd = this.formatDate(date);
        this.dateSelected.emit({ type: 2, date: date, formatted: this.titleAreaTextEnd, jsdate: this.getDate(date) });
    };
    MyDateRangePicker.prototype.cellKeyDown = function (event, cell) {
        if ((event.keyCode === 13 || event.keyCode === 32) && !cell.disabled) {
            event.preventDefault();
            this.cellClicked(cell);
        }
    };
    MyDateRangePicker.prototype.cellMouseEnter = function (cell) {
        if (this.drus.isInitializedDate(this.beginDate) && !this.drus.isInitializedDate(this.endDate)) {
            for (var _i = 0, _a = this.dates; _i < _a.length; _i++) {
                var w = _a[_i];
                for (var _b = 0, _c = w.week; _b < _c.length; _b++) {
                    var day = _c[_b];
                    day.range = this.drus.getTimeInMilliseconds(day.dateObj) >= this.drus.getTimeInMilliseconds(this.beginDate)
                        && this.drus.getTimeInMilliseconds(day.dateObj) <= this.drus.getTimeInMilliseconds(cell.dateObj);
                }
            }
        }
    };
    MyDateRangePicker.prototype.cellMouseLeave = function () {
        for (var _i = 0, _a = this.dates; _i < _a.length; _i++) {
            var w = _a[_i];
            for (var _b = 0, _c = w.week; _b < _c.length; _b++) {
                var day = _c[_b];
                day.range = false;
            }
        }
    };
    MyDateRangePicker.prototype.toEndDate = function () {
        // To end date clicked
        this.isBeginDate = false;
        this.preventAfter = { year: 0, month: 0, day: 0 };
        this.preventBefore = this.getPreviousDate(this.beginDate);
        if (this.endDate.year === 0 && this.endDate.month === 0 && this.endDate.day === 0) {
            this.visibleMonth = { monthTxt: this.monthText(this.beginDate.month), monthNbr: this.beginDate.month, year: this.beginDate.year };
            this.generateCalendar(this.beginDate.month, this.beginDate.year, false);
        }
        else {
            var viewChange = this.endDate.year !== this.visibleMonth.year || this.endDate.month !== this.visibleMonth.monthNbr;
            this.visibleMonth = { monthTxt: this.monthText(this.endDate.month), monthNbr: this.endDate.month, year: this.endDate.year };
            this.generateCalendar(this.endDate.month, this.endDate.year, viewChange);
        }
    };
    MyDateRangePicker.prototype.toBeginDate = function () {
        // To begin date clicked
        this.isBeginDate = true;
        this.preventBefore = { year: 0, month: 0, day: 0 };
        if (this.endDate.year !== 0 && this.endDate.month !== 0 && this.endDate.day !== 0) {
            this.preventAfter = this.getNextDate(this.endDate);
        }
        var viewChange = this.beginDate.year !== this.visibleMonth.year || this.beginDate.month !== this.visibleMonth.monthNbr;
        this.visibleMonth = { monthTxt: this.monthText(this.beginDate.month), monthNbr: this.beginDate.month, year: this.beginDate.year };
        this.generateCalendar(this.beginDate.month, this.beginDate.year, viewChange);
    };
    MyDateRangePicker.prototype.titleAreaKeyDown = function (event, title) {
        if (event.keyCode === 13 || event.keyCode === 32) {
            event.preventDefault();
            title === 1 ? this.toBeginDate() : this.toEndDate();
        }
    };
    MyDateRangePicker.prototype.clearDateRange = function () {
        this.clearBtnClicked();
        this.dateRangeChanged.emit({ beginDate: { year: 0, month: 0, day: 0 }, beginJsDate: null, endDate: { year: 0, month: 0, day: 0 }, endJsDate: null, formatted: "", beginEpoc: 0, endEpoc: 0 });
        this.inputFieldChanged.emit({ value: "", dateRangeFormat: this.dateRangeFormat, valid: false });
        this.onChangeCb("");
        this.onTouchedCb();
    };
    MyDateRangePicker.prototype.rangeSelected = function () {
        // Accept button clicked
        var dateRangeModel = this.getDateRangeModel(this.beginDate, this.endDate);
        this.selectionDayTxt = this.formatDate(this.beginDate) + " - " + this.formatDate(this.endDate);
        this.showSelector = false;
        this.dateRangeChanged.emit(dateRangeModel);
        this.inputFieldChanged.emit({ value: this.selectionDayTxt, dateRangeFormat: this.dateRangeFormat, valid: true });
        this.onChangeCb(dateRangeModel);
        this.onTouchedCb();
        this.invalidDateRange = false;
    };
    MyDateRangePicker.prototype.getDateRangeModel = function (beginDate, endDate) {
        // Creates a date range model object from the given parameters
        var bEpoc = this.drus.getTimeInMilliseconds(beginDate) / 1000.0;
        var eEpoc = this.drus.getTimeInMilliseconds(endDate) / 1000.0;
        return { beginDate: beginDate, beginJsDate: this.getDate(beginDate), endDate: endDate, endJsDate: this.getDate(endDate), formatted: this.formatDate(beginDate) + " - " + this.formatDate(endDate), beginEpoc: bEpoc, endEpoc: eEpoc };
    };
    MyDateRangePicker.prototype.isInRange = function (val) {
        // Check is input date in range between the beginDate and the endDate
        if (!this.drus.isInitializedDate(this.beginDate) || !this.drus.isInitializedDate(this.endDate)) {
            return false;
        }
        var input = this.drus.getTimeInMilliseconds(val.dateObj);
        if (input >= this.drus.getTimeInMilliseconds(this.beginDate) && input <= this.drus.getTimeInMilliseconds(this.endDate)) {
            return true;
        }
        return false;
    };
    MyDateRangePicker.prototype.isRangeSelected = function () {
        // Check is both beginDate and the endDate selected
        if (this.drus.isInitializedDate(this.beginDate) && this.drus.isInitializedDate(this.endDate)) {
            return true;
        }
        return false;
    };
    MyDateRangePicker.prototype.preZero = function (val) {
        // Prepend zero if smaller than 10
        return parseInt(val) < 10 ? "0" + val : val;
    };
    MyDateRangePicker.prototype.formatDate = function (val) {
        // Returns formatted date string, if mmm is part of dateFormat returns month as a string
        var formatted = this.opts.dateFormat.replace("yyyy", val.year).replace("dd", this.preZero(val.day));
        return this.opts.dateFormat.indexOf("mmm") !== -1 ? formatted.replace("mmm", this.monthText(val.month)) : formatted.replace("mm", this.preZero(val.month));
    };
    MyDateRangePicker.prototype.monthText = function (m) {
        // Returns month as a text
        return this.opts.monthLabels[m];
    };
    MyDateRangePicker.prototype.monthStartIdx = function (y, m) {
        // Month start index
        var d = new Date();
        d.setDate(1);
        d.setMonth(m - 1);
        d.setFullYear(y);
        var idx = d.getDay() + this.sundayIdx();
        return idx >= 7 ? idx - 7 : idx;
    };
    MyDateRangePicker.prototype.daysInMonth = function (m, y) {
        // Return number of days of current month
        return new Date(y, m, 0).getDate();
    };
    MyDateRangePicker.prototype.daysInPrevMonth = function (m, y) {
        var d = this.getDate({ year: y, month: m, day: 1 });
        d.setMonth(d.getMonth() - 1);
        return this.daysInMonth(d.getMonth() + 1, d.getFullYear());
    };
    MyDateRangePicker.prototype.isCurrDay = function (d, m, y, cmo, today) {
        // Check is a given date the current date
        return d === today.day && m === today.month && y === today.year && cmo === this.CURR_MONTH;
    };
    MyDateRangePicker.prototype.getPreviousDate = function (date) {
        // Get previous date from the given date
        var d = this.getDate(date);
        d.setDate(d.getDate() - 1);
        return { year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate() };
    };
    MyDateRangePicker.prototype.getNextDate = function (date) {
        // Get next date from the given date
        var d = this.getDate(date);
        d.setDate(d.getDate() + 1);
        return { year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate() };
    };
    MyDateRangePicker.prototype.getDayNumber = function (date) {
        // Get day number: sun=0, mon=1, tue=2, wed=3 ...
        var d = this.getDate(date);
        return d.getDay();
    };
    MyDateRangePicker.prototype.getWeekday = function (date) {
        // Get weekday: su, mo, tu, we ...
        return this.weekDayOpts[this.getDayNumber(date)];
    };
    MyDateRangePicker.prototype.getDate = function (date) {
        return new Date(date.year, date.month - 1, date.day, 0, 0, 0, 0);
    };
    MyDateRangePicker.prototype.getToday = function () {
        var date = new Date();
        return { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() };
    };
    MyDateRangePicker.prototype.sundayIdx = function () {
        // Index of Sunday day
        return this.dayIdx > 0 ? 7 - this.dayIdx : 0;
    };
    MyDateRangePicker.prototype.generateCalendar = function (m, y, viewChange) {
        this.dates.length = 0;
        var today = this.getToday();
        var monthStart = this.monthStartIdx(y, m);
        var dInThisM = this.daysInMonth(m, y);
        var dInPrevM = this.daysInPrevMonth(m, y);
        this.setHeaderBtnDisabledState(m, y);
        var dayNbr = 1;
        var cmo = this.PREV_MONTH;
        for (var i = 1; i < 7; i++) {
            var week = [];
            if (i === 1) {
                // First week
                var pm = dInPrevM - monthStart + 1;
                // Previous month
                for (var j = pm; j <= dInPrevM; j++) {
                    var date = { year: m === 1 ? y - 1 : y, month: m === 1 ? 12 : m - 1, day: j };
                    week.push({ dateObj: date, cmo: cmo, currDay: this.isCurrDay(j, m, y, cmo, today), dayNbr: this.getDayNumber(date), disabled: this.drus.isDisabledDay(date, this.opts.disableUntil, this.opts.disableSince, this.preventBefore, this.preventAfter), range: false });
                }
                cmo = this.CURR_MONTH;
                // Current month
                var daysLeft = 7 - week.length;
                for (var j = 0; j < daysLeft; j++) {
                    var date = { year: y, month: m, day: dayNbr };
                    week.push({ dateObj: date, cmo: cmo, currDay: this.isCurrDay(dayNbr, m, y, cmo, today), dayNbr: this.getDayNumber(date), disabled: this.drus.isDisabledDay(date, this.opts.disableUntil, this.opts.disableSince, this.preventBefore, this.preventAfter), range: false });
                    dayNbr++;
                }
            }
            else {
                // Rest of the weeks
                for (var j = 1; j < 8; j++) {
                    if (dayNbr > dInThisM) {
                        // Next month
                        dayNbr = 1;
                        cmo = this.NEXT_MONTH;
                        if (m === 12) {
                            y++;
                            m = 1;
                        }
                        else {
                            m++;
                        }
                    }
                    var date = { year: y, month: m, day: dayNbr };
                    week.push({ dateObj: date, cmo: cmo, currDay: this.isCurrDay(dayNbr, m, y, cmo, today), dayNbr: this.getDayNumber(date), disabled: this.drus.isDisabledDay(date, this.opts.disableUntil, this.opts.disableSince, this.preventBefore, this.preventAfter), range: false });
                    dayNbr++;
                }
            }
            var weekNbr = this.opts.showWeekNumbers && this.opts.firstDayOfWeek === "mo" ? this.drus.getWeekNumber(week[0].dateObj) : 0;
            this.dates.push({ week: week, weekNbr: weekNbr });
        }
        if (viewChange) {
            // Notify parent
            this.calendarViewChanged.emit({ year: y, month: m, first: { number: 1, weekday: this.getWeekday({ year: y, month: m, day: 1 }) }, last: { number: dInThisM, weekday: this.getWeekday({ year: y, month: m, day: dInThisM }) } });
        }
    };
    MyDateRangePicker.prototype.setHeaderBtnDisabledState = function (m, y) {
        var dpm = false;
        var dpy = false;
        var dnm = false;
        var dny = false;
        if (this.opts.disableHeaderButtons) {
            dpm = this.drus.isMonthDisabledByDisableUntil({ year: m === 1 ? y - 1 : y, month: m === 1 ? 12 : m - 1, day: this.daysInMonth(m === 1 ? 12 : m - 1, m === 1 ? y - 1 : y) }, this.opts.disableUntil);
            dpy = this.drus.isMonthDisabledByDisableUntil({ year: y - 1, month: m, day: this.daysInMonth(m, y - 1) }, this.opts.disableUntil);
            dnm = this.drus.isMonthDisabledByDisableSince({ year: m === 12 ? y + 1 : y, month: m === 12 ? 1 : m + 1, day: 1 }, this.opts.disableSince);
            dny = this.drus.isMonthDisabledByDisableSince({ year: y + 1, month: m, day: 1 }, this.opts.disableSince);
        }
        this.prevMonthDisabled = m === 1 && y === this.opts.minYear || dpm;
        this.prevYearDisabled = y - 1 < this.opts.minYear || dpy;
        this.nextMonthDisabled = m === 12 && y === this.opts.maxYear || dnm;
        this.nextYearDisabled = y + 1 > this.opts.maxYear || dny;
    };
    MyDateRangePicker.prototype.parseSelectedDate = function (selDate) {
        // Parse selDate value - it can be string or IMyDate object
        var date = { day: 0, month: 0, year: 0 };
        if (typeof selDate === "string") {
            var sd = selDate;
            date.day = this.drus.parseDatePartNumber(this.opts.dateFormat, sd, "dd");
            date.month = this.opts.dateFormat.indexOf("mmm") !== -1
                ? this.drus.parseDatePartMonthName(this.opts.dateFormat, sd, "mmm", this.opts.monthLabels)
                : this.drus.parseDatePartNumber(this.opts.dateFormat, sd, "mm");
            date.year = this.drus.parseDatePartNumber(this.opts.dateFormat, sd, "yyyy");
        }
        else if (typeof selDate === "object") {
            date = selDate;
        }
        return date;
    };
    MyDateRangePicker.prototype.parseSelectedMonth = function (ms) {
        return this.drus.parseDefaultMonth(ms);
    };
    MyDateRangePicker.decorators = [
        { type: _angular_core.Component, args: [{
                    selector: "my-date-range-picker",
                    styles: [".mydrp .headerclearbtn,.mydrp .selection,.mydrp .weekdaytitle{overflow:hidden;white-space:nowrap}.mydrp{min-width:100px;border-radius:2px;line-height:1;display:inline-block;position:relative}.mydrp *{-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box;font-family:Arial,Helvetica,sans-serif;padding:0;margin:0}.mydrp .selector{margin-top:2px;margin-left:-1px;position:absolute;width:252px;padding:0;border:1px solid #CCC;border-radius:2px;z-index:100;animation:selectorfadein 60ms}.mydrp .selector:focus{border:1px solid #ADD8E6;outline:0}@keyframes selectorfadein{from{opacity:0}to{opacity:1}}.mydrp .selectorarrow{background:#FFF;border:1px solid #CCC;margin-top:12px;padding:0}.mydrp .selectorarrow:after,.mydrp .selectorarrow:before{bottom:100%;border:solid transparent;content:\" \";height:0;width:0;position:absolute}.mydrp .selectorarrow:after{border-color:rgba(250,250,250,0);border-bottom-color:#FFF;border-width:10px;margin-left:-10px}.mydrp .selectorarrow:before{border-color:rgba(204,204,204,0);border-bottom-color:#CCC;border-width:11px;margin-left:-11px}.mydrp .selectorarrow:focus:before{border-bottom-color:#ADD8E6}.mydrp .selectorarrowleft:after,.mydrp .selectorarrowleft:before{left:24px}.mydrp .selectorarrowright:after,.mydrp .selectorarrowright:before{left:224px}.mydrp .alignselectorright{right:-1px}.mydrp .selectiongroup{position:relative;display:table;border:none;border-spacing:0;background-color:#FFF}.mydrp .selection{outline:0;background-color:#FFF;display:table-cell;position:absolute;width:100%;font-size:14px;padding:0 64px 0 4px;text-overflow:ellipsis;text-align:center}.mydrp .invaliddaterange,.mydrp .invalidmonth,.mydrp .invalidyear{background-color:#F1DEDE}.mydrp ::-ms-clear{display:none}.mydrp .selbtngroup{position:relative;vertical-align:middle;white-space:nowrap;width:1%;display:table-cell;font-size:0}.mydrp .btnclear,.mydrp .btnpicker{height:100%;width:30px;border:none;border-left:1px solid #CCC;padding:0;outline:0;font:inherit;-moz-user-select:none}.mydrp .btnclearenabled,.mydrp .btnpickerenabled,.mydrp .headerbtnenabled{cursor:pointer}.mydrp .btncleardisabled,.mydrp .btnpickerdisabled,.mydrp .headerbtndisabled{cursor:not-allowed}.mydrp .headerbtndisabled{opacity:.4}.mydrp .btnclear,.mydrp .btnpicker,.mydrp .footerbtn,.mydrp .headerclearbtn{background:#FFF}.mydrp .header{width:100%;height:30px;background-color:#FFF}.mydrp .header td{vertical-align:middle;border:none;line-height:0}.mydrp .header td:nth-child(1){padding-left:4px}.mydrp .header td:nth-child(2){text-align:center}.mydrp .header td:nth-child(3){padding-right:4px}.mydrp .titlearea{text-align:center;background-color:#FFF}.mydrp .titleareatxt{display:table;border-spacing:0;width:100%;height:26px;line-height:26px;font-size:12px}.mydrp .titleareafull{border-bottom:1px solid #CCC}.mydrp .titlearealeft,.mydrp .titlearearight{display:table-cell;width:50%}.mydrp .titlearealeftenabled{background-color:#FFF;border-right:1px solid transparent}.mydrp .titlearearightenabled{background-color:#FFF;border-left:1px solid transparent}.mydrp .titlearealeftdisabled{border-bottom:1px solid #CCC;border-right:1px solid #CCC;border-bottom-right-radius:4px}.mydrp .titlearearightdisabled{border-bottom:1px solid #CCC;border-left:1px solid #CCC;border-bottom-left-radius:4px}.mydrp .titleareatxtlink:hover{text-decoration:underline;color:#8BDAF4;cursor:pointer}.mydrp .inline{position:relative;margin-top:-1px}.mydrp .caltable{table-layout:fixed;width:100%;background-color:#FFF;font-size:14px}.mydrp .caltable,.mydrp .daycell,.mydrp .weekdaytitle{border-collapse:collapse;color:#036;line-height:1.1}.mydrp .daycell,.mydrp .weekdaytitle{padding:5px;text-align:center}.mydrp .weekdaytitle{background-color:#DDD;font-size:12px;font-weight:700;vertical-align:middle;max-width:36px}.mydrp .weekdaytitleweeknbr{width:20px;border-right:1px solid #BBB}.mydrp .daycell{cursor:pointer;height:30px}.mydrp .daycellweeknbr{font-size:10px;border-right:1px solid #CCC;cursor:default;color:#000}.mydrp .nextmonth,.mydrp .prevmonth{color:#444}.mydrp .disabled{cursor:default!important;color:#444!important;background:#FBEFEF!important}.mydrp .sunday{color:#C30000}.mydrp .sundayDim{opacity:.5}.mydrp .currmonth{background-color:#F6F6F6;font-weight:700}.mydrp .range{background:#D9F2E6}.mydrp .currday{text-decoration:underline}.mydrp .selectedday{border:1px solid #004198;background-color:#8EBFFF!important;border-radius:2px}.mydrp .selecteddaygreen{background-color:#28A828!important}.mydrp .headerbtncell{background-color:#FFF;cursor:pointer;display:table-cell;vertical-align:middle}.mydrp .headerbtn,.mydrp .headerlabelbtn{background:#FFF;border:none;height:22px}.mydrp .headerbtn{width:16px}.mydrp .headerlabelbtn{font-size:14px}.mydrp,.mydrp .footerbtn,.mydrp .headerclearbtn,.mydrp .monthinput,.mydrp .yearinput{border:1px solid #CCC}.mydrp .btnclear,.mydrp .btnpicker,.mydrp .footerbtn,.mydrp .headerbtn,.mydrp .headerclearbtn,.mydrp .headermonthtxt,.mydrp .headeryeartxt,.mydrp .monthinput,.mydrp .selection,.mydrp .yearinput{color:#000}.mydrp .footerbtn,.mydrp .headerclearbtn{border-radius:2px;cursor:pointer;font-size:11px;height:22px}.mydrp .headerclearbtn{min-width:60px;max-width:70px;padding:0 4px}.mydrp .footerbtn{min-width:80px}.mydrp .btndisable{cursor:default;opacity:.5}.mydrp .footerarea{border-top:1px solid #CCC;padding:3px;text-align:center;background-color:#FFF}.mydrp button::-moz-focus-inner{border:0}.mydrp .headermonthtxt,.mydrp .headeryeartxt{text-align:center;display:table-cell;vertical-align:middle;font-size:14px;height:26px;width:40px;max-width:40px;overflow:hidden;white-space:nowrap}.mydrp .btnclear:focus,.mydrp .btnpicker:focus,.mydrp .footerbtn:focus,.mydrp .headerclearbtn:focus{background:#ADD8E6}.mydrp .headerbtn:focus,.mydrp .monthlabel:focus,.mydrp .yearlabel:focus{color:#ADD8E6;outline:0}.mydrp .titlearealeft:focus,.mydrp .titlearearight:focus{text-decoration:underline;outline:0}.mydrp .daycell:focus{outline:#CCC solid 1px}.mydrp .icon-calendar,.mydrp .icon-cross{font-size:16px}.mydrp .icon-left,.mydrp .icon-right{color:#222;font-size:20px}.mydrp table{display:table;border-spacing:0}.mydrp table td{padding:0}.mydrp table,.mydrp td,.mydrp th{border:none}.mydrp .btnclearenabled:hover,.mydrp .btnpickerenabled:hover,.mydrp .daycell:hover,.mydrp .footerbtnenabled:hover,.mydrp .headerclearbtnenabled:hover{background-color:#8BDAF4}.mydrp .monthlabel,.mydrp .yearlabel{cursor:pointer}.mydrp .monthinput,.mydrp .yearinput{width:40px;height:22px;text-align:center;font-weight:700;outline:0;border-radius:2px}.mydrp .headerbtnenabled:hover,.mydrp .monthlabel:hover,.mydrp .yearlabel:hover{color:#8BDAF4}@font-face{font-family:mydaterangepicker;src:url(data:application/octet-stream;base64,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sAQlYGQjsAMlYGRQWCEbIyFZIyAgsAQmI0ZhOFktsDcssAAWICAgsAUmIC5HI0cjYSM8OC2wOCywABYgsAgjQiAgIEYjR7ABKyNhOC2wOSywABawAyWwAiVHI0cjYbAAVFguIDwjIRuwAiWwAiVHI0cjYSCwBSWwBCVHI0cjYbAGJbAFJUmwAiVhuQgACABjYyMgWGIbIVljuAQAYiCwAFBYsEBgWWawAWNgIy4jICA8ijgjIVktsDossAAWILAIQyAuRyNHI2EgYLAgYGawAmIgsABQWLBAYFlmsAFjIyAgPIo4LbA7LCMgLkawAiVGUlggPFkusSsBFCstsDwsIyAuRrACJUZQWCA8WS6xKwEUKy2wPSwjIC5GsAIlRlJYIDxZIyAuRrACJUZQWCA8WS6xKwEUKy2wPiywNSsjIC5GsAIlRlJYIDxZLrErARQrLbA/LLA2K4ogIDywBCNCijgjIC5GsAIlRlJYIDxZLrErARQrsARDLrArKy2wQCywABawBCWwBCYgLkcjRyNhsAlDKyMgPCAuIzixKwEUKy2wQSyxCAQlQrAAFrAEJbAEJSAuRyNHI2EgsAQjQrAJQysgsGBQWCCwQFFYswIgAyAbswImAxpZQkIjIEewBEOwAmIgsABQWLBAYFlmsAFjYCCwASsgiophILACQ2BkI7ADQ2FkUFiwAkNhG7ADQ2BZsAMlsAJiILAAUFiwQGBZZrABY2GwAiVGYTgjIDwjOBshICBGI0ewASsjYTghWbErARQrLbBCLLA1Ky6xKwEUKy2wQyywNishIyAgPLAEI0IjOLErARQrsARDLrArKy2wRCywABUgR7AAI0KyAAEBFRQTLrAxKi2wRSywABUgR7AAI0KyAAEBFRQTLrAxKi2wRiyxAAEUE7AyKi2wRyywNCotsEgssAAWRSMgLiBGiiNhOLErARQrLbBJLLAII0KwSCstsEossgAAQSstsEsssgABQSstsEwssgEAQSstsE0ssgEBQSstsE4ssgAAQistsE8ssgABQistsFAssgEAQistsFEssgEBQistsFIssgAAPistsFMssgABPistsFQssgEAPistsFUssgEBPistsFYssgAAQCstsFcssgABQCstsFgssgEAQCstsFkssgEBQCstsFossgAAQystsFsssgABQystsFwssgEAQystsF0ssgEBQystsF4ssgAAPystsF8ssgABPystsGAssgEAPystsGEssgEBPystsGIssDcrLrErARQrLbBjLLA3K7A7Ky2wZCywNyuwPCstsGUssAAWsDcrsD0rLbBmLLA4Ky6xKwEUKy2wZyywOCuwOystsGgssDgrsDwrLbBpLLA4K7A9Ky2waiywOSsusSsBFCstsGsssDkrsDsrLbBsLLA5K7A8Ky2wbSywOSuwPSstsG4ssDorLrErARQrLbBvLLA6K7A7Ky2wcCywOiuwPCstsHEssDorsD0rLbByLLMJBAIDRVghGyMhWUIrsAhlsAMkUHiwARUwLQBLuADIUlixAQGOWbABuQgACABjcLEABUKyAAEAKrEABUKzCgIBCCqxAAVCsw4AAQgqsQAGQroCwAABAAkqsQAHQroAQAABAAkqsQMARLEkAYhRWLBAiFixA2REsSYBiFFYugiAAAEEQIhjVFixAwBEWVlZWbMMAgEMKrgB/4WwBI2xAgBEAAA=) format('truetype');font-weight:400;font-style:normal}.mydrp .icon{font-family:mydaterangepicker;font-style:normal;font-weight:400;font-variant:normal;text-transform:none;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.mydrp .icon-right:before{content:\"\\e800\"}.mydrp .icon-left:before{content:\"\\e801\"}.mydrp .icon-calendar:before{content:\"\\e802\"}.mydrp .icon-cross:before{content:\"\\e805\"}"],
                    template: "<div class=\"mydrp\" [ngStyle]=\"{'width': opts.width, 'border': opts.inline ? 'none' : null}\"><div class=\"selectiongroup\" *ngIf=\"!opts.inline\"><input type=\"text\" class=\"selection\" aria-label=\"Date range input field\" [attr.maxlength]=\"dateRangeFormat.length\" [ngClass]=\"{'invaliddaterange': invalidDateRange&&opts.indicateInvalidDateRange}\" placeholder=\"{{placeholder}}\" [ngStyle]=\"{'height': opts.height, 'line-height': height, 'font-size': opts.selectionTxtFontSize, 'border': 'none', 'padding-right': selectionDayTxt.length>0&&opts.showClearDateRangeBtn ? '60px' : '30px'}\" (keyup)=\"userDateRangeInput($event)\" (blur)=\"lostFocusInput($event)\" [value]=\"selectionDayTxt\" [disabled]=\"opts.componentDisabled\" [readonly]=\"!opts.editableDateRangeField\" [required]=\"opts.inputValueRequired\"> <span class=\"selbtngroup\" [style.height]=\"opts.height\"><button type=\"button\" class=\"btnclear\" aria-label=\"Clear date range\" *ngIf=\"selectionDayTxt.length>0&&opts.showClearDateRangeBtn\" (click)=\"removeBtnClicked()\" [ngClass]=\"{'btnclearenabled': !opts.componentDisabled, 'btncleardisabled': opts.componentDisabled}\" [disabled]=\"opts.componentDisabled\"><span class=\"icon icon-cross\" [ngStyle]=\"{'line-height': opts.height}\"></span></button> <button type=\"button\" class=\"btnpicker\" aria-label=\"Open calendar\" (click)=\"openBtnClicked()\" [ngClass]=\"{'btnpickerenabled': !opts.componentDisabled, 'btnpickerdisabled': opts.componentDisabled}\" [disabled]=\"opts.componentDisabled\"><span class=\"icon icon-calendar\" [ngStyle]=\"{'line-height': opts.height}\"></span></button></span></div><div class=\"selector\" *ngIf=\"showSelector||opts.inline\" [mydrpfocus]=\"opts.inline?'0':'1'\" [ngClass]=\"{'inline': opts.inline, 'alignselectorright': opts.alignSelectorRight, 'selectorarrow': opts.showSelectorArrow&&!opts.inline, 'selectorarrowleft': opts.showSelectorArrow&&!opts.alignSelectorRight&&!opts.inline, 'selectorarrowright': opts.showSelectorArrow&&opts.alignSelectorRight&&!opts.inline}\" tabindex=\"0\"><div class=\"titlearea\" *ngIf=\"opts.showSelectDateText\"><div class=\"titleareatxt\"><div class=\"titleareafull\" *ngIf=\"titleAreaTextBegin.length===0&&titleAreaTextEnd.length===0\">{{opts.selectBeginDateTxt}}</div><div class=\"titlearealeft\" *ngIf=\"titleAreaTextBegin.length!==0||titleAreaTextEnd.length!==0\" [ngClass]=\"{'titlearealeftenabled': isBeginDate, 'titlearealeftdisabled': !isBeginDate, 'titleareatxtlink': !isBeginDate}\" (click)=\"toBeginDate()\" (keydown)=\"titleAreaKeyDown($event, 1)\" tabindex=\"{{!isBeginDate?'0':'-1'}}\">{{titleAreaTextBegin}}</div><div class=\"titlearearight\" *ngIf=\"titleAreaTextBegin.length!==0||titleAreaTextEnd.length!==0\" [ngClass]=\"{'titlearearightenabled': !isBeginDate, 'titlearearightdisabled': isBeginDate, 'titleareatxtlink': isBeginDate}\" (click)=\"toEndDate()\" (keydown)=\"titleAreaKeyDown($event, 2)\" tabindex=\"{{isBeginDate?'0':'-1'}}\">{{titleAreaTextEnd}}</div></div></div><table class=\"header\"><tr><td><div style=\"float:left\"><div class=\"headerbtncell\"><button type=\"button\" class=\"headerbtn icon icon-left\" aria-label=\"Previous month\" (click)=\"prevMonth()\" [disabled]=\"prevMonthDisabled\" [ngClass]=\"{'headerbtnenabled': !prevMonthDisabled, 'headerbtndisabled': prevMonthDisabled}\"></button></div><div class=\"headermonthtxt\"><input type=\"text\" *ngIf=\"editMonth\" class=\"monthinput\" maxlength=\"12\" [mydrpfocus]=\"2\" [value]=\"visibleMonth.monthTxt\" (keyup)=\"userMonthInput($event)\" (click)=\"$event.stopPropagation()\" [ngClass]=\"{'invalidmonth': invalidMonth}\"> <button class=\"headerlabelbtn\" type=\"button\" [ngClass]=\"{'monthlabel': opts.editableMonthAndYear}\" *ngIf=\"!editMonth\" (click)=\"opts.editableMonthAndYear&&editMonthClicked($event)\" tabindex=\"{{opts.editableMonthAndYear?'0':'-1'}}\">{{visibleMonth.monthTxt}}</button></div><div class=\"headerbtncell\"><button type=\"button\" class=\"headerbtn icon icon-right\" aria-label=\"Next month\" (click)=\"nextMonth()\" [disabled]=\"nextMonthDisabled\" [ngClass]=\"{'headerbtnenabled': !nextMonthDisabled, 'headerbtndisabled': nextMonthDisabled}\"></button></div></div></td><td *ngIf=\"opts.showClearBtn\"><button type=\"button\" class=\"headerclearbtn\" [disabled]=\"beginDate.year===0&&endDate.year===0\" [ngClass]=\"{'btndisable':beginDate.year===0&&endDate.year===0, 'headerclearbtnenabled':beginDate.year!==0||endDate.year!==0}\" (click)=\"clearBtnClicked()\">{{opts.clearBtnTxt}}</button></td><td><div style=\"float:right\"><div class=\"headerbtncell\"><button type=\"button\" class=\"headerbtn icon icon-left\" aria-label=\"Previous year\" (click)=\"prevYear()\" [disabled]=\"prevYearDisabled\" [ngClass]=\"{'headerbtnenabled': !prevYearDisabled, 'headerbtndisabled': prevYearDisabled}\"></button></div><div class=\"headeryeartxt\"><input type=\"text\" *ngIf=\"editYear\" class=\"yearinput\" maxlength=\"4\" [mydrpfocus]=\"2\" [value]=\"visibleMonth.year\" (keyup)=\"userYearInput($event)\" (click)=\"$event.stopPropagation()\" [ngClass]=\"{'invalidyear': invalidYear}\"> <button class=\"headerlabelbtn\" type=\"button\" [ngClass]=\"{'yearlabel': opts.editableMonthAndYear}\" *ngIf=\"!editYear\" (click)=\"opts.editableMonthAndYear&&editYearClicked($event)\" tabindex=\"{{opts.editableMonthAndYear?'0':'-1'}}\">{{visibleMonth.year}}</button></div><div class=\"headerbtncell\"><button type=\"button\" class=\"headerbtn icon icon-right\" aria-label=\"Next year\" (click)=\"nextYear()\" [disabled]=\"nextYearDisabled\" [ngClass]=\"{'headerbtnenabled': !nextYearDisabled, 'headerbtndisabled': nextYearDisabled}\"></button></div></div></td></tr></table><table class=\"caltable\"><thead><tr><th class=\"weekdaytitle weekdaytitleweeknbr\" *ngIf=\"opts.showWeekNumbers&&opts.firstDayOfWeek==='mo'\">#</th><th class=\"weekdaytitle\" scope=\"col\" *ngFor=\"let d of weekDays\">{{d}}</th></tr></thead><tbody><tr *ngFor=\"let w of dates\"><td class=\"daycell daycellweeknbr\" *ngIf=\"opts.showWeekNumbers&&opts.firstDayOfWeek==='mo'\">{{w.weekNbr}}</td><td class=\"daycell\" *ngFor=\"let d of w.week\" [ngClass]=\"{'currmonth':d.cmo===CURR_MONTH&&!d.disabled, 'range': isInRange(d)||d.range, 'disabled': d.disabled}\" (click)=\"!d.disabled && cellClicked(d);$event.stopPropagation()\" (keydown)=\"cellKeyDown($event, d)\" (mouseenter)=\"opts.quickRangeSelect&&cellMouseEnter(d)\" (mouseleave)=\"opts.quickRangeSelect&&cellMouseLeave()\" tabindex=\"0\"><div style=\"background-color:inherit\" [ngClass]=\"{'prevmonth':d.cmo===PREV_MONTH, 'selectedday':beginDate.day===d.dateObj.day&&beginDate.month===d.dateObj.month&&beginDate.year===d.dateObj.year||endDate.day===d.dateObj.day&&endDate.month===d.dateObj.month&&endDate.year===d.dateObj.year, 'currmonth':d.cmo===CURR_MONTH, 'nextmonth':d.cmo===NEXT_MONTH, 'selecteddaygreen':beginDate.day===d.dateObj.day&&beginDate.month===d.dateObj.month&&beginDate.year===d.dateObj.year&&isBeginDate&&isRangeSelected()||endDate.day===d.dateObj.day&&endDate.month===d.dateObj.month&&endDate.year===d.dateObj.year&&!isBeginDate&&isRangeSelected(), 'sunday':d.dayNbr===0&&opts.sunHighlight}\"><span [ngClass]=\"{'currday':d.currDay&&opts.markCurrentDay, 'sundayDim': opts.sunHighlight && d.dayNbr === 0 && (d.cmo===PREV_MONTH || d.cmo===NEXT_MONTH || d.disabled)}\">{{d.dateObj.day}}</span></div></td></tr></tbody></table><div class=\"footerarea\"><button type=\"button\" class=\"footerbtn\" *ngIf=\"!opts.quickRangeSelect\" [disabled]=\"beginDate&&beginDate.year===0\" [ngClass]=\"{'btndisable':beginDate.year===0,'footerbtnenabled': beginDate.year!==0||!isBeginDate}\" (click)=\"$event.stopPropagation();isBeginDate?toEndDate():toBeginDate()\">{{isBeginDate?opts.endDateBtnTxt:opts.beginDateBtnTxt}}</button> <button type=\"button\" class=\"footerbtn\" *ngIf=\"!isBeginDate||endDate.year!==0||opts.quickRangeSelect\" [disabled]=\"endDate.year===0\" [ngClass]=\"{'btndisable':endDate.year===0, 'footerbtnenabled': endDate.year!==0}\" (click)=\"$event.stopPropagation();rangeSelected()\">{{opts.acceptBtnTxt}}</button></div></div></div>",
                    providers: [DateRangeUtilService, MYDRP_VALUE_ACCESSOR],
                    encapsulation: _angular_core.ViewEncapsulation.None
                },] },
    ];
    /** @nocollapse */
    MyDateRangePicker.ctorParameters = [
        { type: _angular_core.ElementRef, },
        { type: _angular_core.Renderer, },
        { type: DateRangeUtilService, },
    ];
    MyDateRangePicker.propDecorators = {
        'options': [{ type: _angular_core.Input },],
        'defaultMonth': [{ type: _angular_core.Input },],
        'selDateRange': [{ type: _angular_core.Input },],
        'placeholder': [{ type: _angular_core.Input },],
        'dateRangeChanged': [{ type: _angular_core.Output },],
        'inputFieldChanged': [{ type: _angular_core.Output },],
        'calendarViewChanged': [{ type: _angular_core.Output },],
        'dateSelected': [{ type: _angular_core.Output },],
    };
    return MyDateRangePicker;
}());

var MyDateRangePickerModule = (function () {
    function MyDateRangePickerModule() {
    }
    MyDateRangePickerModule.decorators = [
        { type: _angular_core.NgModule, args: [{
                    imports: [_angular_common.CommonModule],
                    declarations: [MyDateRangePicker, FocusDirective],
                    exports: [MyDateRangePicker, FocusDirective]
                },] },
    ];
    /** @nocollapse */
    MyDateRangePickerModule.ctorParameters = [];
    return MyDateRangePickerModule;
}());

exports.DateRangeUtilService = DateRangeUtilService;
exports.FocusDirective = FocusDirective;
exports.MYDRP_VALUE_ACCESSOR = MYDRP_VALUE_ACCESSOR;
exports.MyDateRangePicker = MyDateRangePicker;
exports.MyDateRangePickerModule = MyDateRangePickerModule;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=mydaterangepicker.umd.js.map
