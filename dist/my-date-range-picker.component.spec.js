///<reference path="../../node_modules/@types/jasmine/index.d.ts"/>
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MyDateRangePicker } from './my-date-range-picker.component';
import { FocusDirective } from './directives/my-date-range-picker.focus.directive';
var comp;
var fixture;
var de;
var el;
var PREVMONTH = '.header tr td:first-child div .headerbtncell:first-child .headerbtn';
var NEXTMONTH = '.header tr td:first-child div .headerbtncell:last-child .headerbtn';
var PREVYEAR = '.header tr td:last-child div .headerbtncell:first-child .headerbtn';
var NEXTYEAR = '.header tr td:last-child div .headerbtncell:last-child .headerbtn';
function getDateString(date) {
    return date.getFullYear() + '-' + (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
}
function getElement(id) {
    return de.query(By.css(id));
}
function getElements(id) {
    return de.queryAll(By.css(id));
}
describe('MyDateRangePicker', function () {
    beforeEach(function () {
        TestBed.configureTestingModule({
            declarations: [MyDateRangePicker, FocusDirective],
        });
        fixture = TestBed.createComponent(MyDateRangePicker);
        comp = fixture.componentInstance;
        de = fixture.debugElement.query(By.css('.mydrp'));
        el = de.nativeElement;
    });
    it('set valid date range', function () {
        comp.selectionDayTxt = '2016-08-22 - 2016-08-23';
        fixture.detectChanges();
        var selection = getElement('.selection');
        expect(selection.nativeElement.value).toContain('2016-08-22 - 2016-08-23');
    });
    it('open/close selector', function () {
        fixture.detectChanges();
        var btnpicker = getElement('.btnpicker');
        var selector = getElement('.selector');
        expect(selector).toBe(null);
        btnpicker.nativeElement.click();
        fixture.detectChanges();
        selector = getElement('.selector');
        expect(selector).not.toBe(null);
        btnpicker.nativeElement.click();
        fixture.detectChanges();
        selector = getElement('.selector');
        expect(selector).toBe(null);
    });
    it('select first and last dates to date range and clear', function () {
        comp.selectedMonth = { monthTxt: '', monthNbr: 11, year: 2016 };
        comp.options = {
            quickRangeSelect: false
        };
        comp.parseOptions();
        fixture.detectChanges();
        var btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();
        fixture.detectChanges();
        var selector = getElement('.selector');
        expect(selector).not.toBe(null);
        fixture.detectChanges();
        var currmonth = getElements('.caltable tbody tr td');
        expect(currmonth).not.toBe(null);
        expect(currmonth.length).toBe(42);
        var first = currmonth[1];
        expect(first.nativeElement.textContent.trim()).toBe('1');
        expect(currmonth[30].nativeElement.textContent.trim()).toBe('30');
        fixture.detectChanges();
        first.nativeElement.click();
        fixture.detectChanges();
        var selectedday = getElement('.selectedday');
        expect(selectedday).not.toBe(null);
        fixture.detectChanges();
        var enddatebtn = getElement('.footerarea button:first-child');
        expect(enddatebtn).not.toBe(null);
        expect(enddatebtn.nativeElement.textContent.trim()).toBe('End Date');
        enddatebtn.nativeElement.click();
        fixture.detectChanges();
        currmonth = getElements('.caltable tbody tr td');
        currmonth[30].nativeElement.click();
        fixture.detectChanges();
        var selecteddaygreen = getElement('.selecteddaygreen');
        expect(selecteddaygreen).not.toBe(null);
        fixture.detectChanges();
        var range = getElements('.caltable .range');
        expect(range).not.toBe(null);
        expect(range.length).toBe(30);
        fixture.detectChanges();
        var okbtn = getElement('.footerarea button:last-child');
        expect(okbtn).not.toBe(null);
        expect(okbtn.nativeElement.textContent.trim()).toBe('Accept');
        okbtn.nativeElement.click();
        fixture.detectChanges();
        var selection = getElement('.selection');
        expect(selection.nativeElement.value).toContain('2016-11-01 - 2016-11-30');
        fixture.detectChanges();
        var btnclear = getElement('.btnclear');
        btnclear.nativeElement.click();
        fixture.detectChanges();
        selection = getElement('.selection');
        expect(selection.nativeElement.value).toEqual('');
    });
    it('select clear button', function () {
        comp.selectedMonth = { monthTxt: '', monthNbr: 11, year: 2016 };
        comp.options = {
            quickRangeSelect: false
        };
        comp.parseOptions();
        fixture.detectChanges();
        var btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();
        fixture.detectChanges();
        var selector = getElement('.selector');
        expect(selector).not.toBe(null);
        fixture.detectChanges();
        var currmonth = getElements('.caltable tbody tr td');
        expect(currmonth).not.toBe(null);
        expect(currmonth.length).toBe(42);
        var first = currmonth[1];
        expect(first.nativeElement.textContent.trim()).toBe('1');
        expect(currmonth[30].nativeElement.textContent.trim()).toBe('30');
        fixture.detectChanges();
        first.nativeElement.click();
        fixture.detectChanges();
        var selectedday = getElement('.selectedday');
        expect(selectedday).not.toBe(null);
        fixture.detectChanges();
        var enddatebtn = getElement('.footerarea button:first-child');
        expect(enddatebtn).not.toBe(null);
        expect(enddatebtn.nativeElement.textContent.trim()).toBe('End Date');
        enddatebtn.nativeElement.click();
        fixture.detectChanges();
        currmonth = getElements('.caltable tbody tr td');
        currmonth[30].nativeElement.click();
        fixture.detectChanges();
        var selecteddaygreen = getElement('.selecteddaygreen');
        expect(selecteddaygreen).not.toBe(null);
        fixture.detectChanges();
        var range = getElements('.caltable .range');
        expect(range).not.toBe(null);
        expect(range.length).toBe(30);
        fixture.detectChanges();
        var headerclearbtn = getElement('.headerclearbtn');
        expect(headerclearbtn).not.toBe(null);
        expect(headerclearbtn.properties['disabled']).toBe(false);
        headerclearbtn.nativeElement.click();
        fixture.detectChanges();
        selectedday = getElement('.selectedday');
        expect(selectedday).toBe(null);
        selecteddaygreen = getElement('.selecteddaygreen');
        expect(selecteddaygreen).toBe(null);
        range = getElements('.caltable .range');
        expect(range.length).toBe(0);
        headerclearbtn = getElement('.headerclearbtn');
        expect(headerclearbtn.properties['disabled']).toBe(true);
    });
    it('select previous month', function () {
        comp.selectedMonth = { monthTxt: '', monthNbr: 11, year: 2016 };
        comp.parseOptions();
        fixture.detectChanges();
        var btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();
        fixture.detectChanges();
        var monthlabel = getElement('.monthlabel');
        expect(monthlabel).not.toBe(null);
        expect(monthlabel.nativeElement.textContent.trim()).toBe('Nov');
        fixture.detectChanges();
        var prevmonth = getElement(PREVMONTH);
        expect(prevmonth).not.toBe(null);
        fixture.detectChanges();
        prevmonth.nativeElement.click();
        expect(comp.visibleMonth.monthTxt).toBe('Oct');
        expect(comp.visibleMonth.monthNbr).toBe(10);
        expect(comp.visibleMonth.year).toBe(2016);
        fixture.detectChanges();
        monthlabel = getElement('.monthlabel');
        expect(monthlabel).not.toBe(null);
        expect(monthlabel.nativeElement.textContent.trim()).toBe('Oct');
    });
    it('select next month', function () {
        comp.selectedMonth = { monthTxt: '', monthNbr: 11, year: 2016 };
        comp.parseOptions();
        fixture.detectChanges();
        var btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();
        fixture.detectChanges();
        var monthlabel = getElement('.monthlabel');
        expect(monthlabel).not.toBe(null);
        expect(monthlabel.nativeElement.textContent.trim()).toBe('Nov');
        fixture.detectChanges();
        var nextmonth = getElement(NEXTMONTH);
        expect(nextmonth).not.toBe(null);
        fixture.detectChanges();
        nextmonth.nativeElement.click();
        expect(comp.visibleMonth.monthTxt).toBe('Dec');
        expect(comp.visibleMonth.monthNbr).toBe(12);
        expect(comp.visibleMonth.year).toBe(2016);
        fixture.detectChanges();
        monthlabel = getElement('.monthlabel');
        expect(monthlabel).not.toBe(null);
        expect(monthlabel.nativeElement.textContent.trim()).toBe('Dec');
    });
    it('select previous month january change year', function () {
        comp.selectedMonth = { monthTxt: '', monthNbr: 1, year: 2016 };
        comp.parseOptions();
        fixture.detectChanges();
        var btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();
        fixture.detectChanges();
        var monthlabel = getElement('.monthlabel');
        expect(monthlabel).not.toBe(null);
        expect(monthlabel.nativeElement.textContent.trim()).toBe('Jan');
        fixture.detectChanges();
        var prevmonth = getElement(PREVMONTH);
        expect(prevmonth).not.toBe(null);
        fixture.detectChanges();
        prevmonth.nativeElement.click();
        expect(comp.visibleMonth.monthNbr).toBe(12);
        expect(comp.visibleMonth.year).toBe(2015);
        fixture.detectChanges();
        monthlabel = getElement('.monthlabel');
        expect(monthlabel).not.toBe(null);
        expect(monthlabel.nativeElement.textContent.trim()).toBe('Dec');
        fixture.detectChanges();
        var yearlabel = getElement('.yearlabel');
        expect(yearlabel).not.toBe(null);
        expect(yearlabel.nativeElement.textContent.trim()).toBe('2015');
    });
    it('select next month december change year', function () {
        comp.selectedMonth = { monthTxt: '', monthNbr: 12, year: 2015 };
        comp.parseOptions();
        fixture.detectChanges();
        var btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();
        fixture.detectChanges();
        var monthlabel = getElement('.monthlabel');
        expect(monthlabel).not.toBe(null);
        expect(monthlabel.nativeElement.textContent.trim()).toBe('Dec');
        fixture.detectChanges();
        var nextmonth = getElement(NEXTMONTH);
        expect(nextmonth).not.toBe(null);
        fixture.detectChanges();
        nextmonth.nativeElement.click();
        expect(comp.visibleMonth.monthNbr).toBe(1);
        expect(comp.visibleMonth.year).toBe(2016);
        fixture.detectChanges();
        monthlabel = getElement('.monthlabel');
        expect(monthlabel).not.toBe(null);
        expect(monthlabel.nativeElement.textContent.trim()).toBe('Jan');
        fixture.detectChanges();
        var yearlabel = getElement('.yearlabel');
        expect(yearlabel).not.toBe(null);
        expect(yearlabel.nativeElement.textContent.trim()).toBe('2016');
    });
    it('select previous and next month from selector', function () {
        comp.selectedMonth = { monthTxt: '', monthNbr: 11, year: 2016 };
        comp.options = {
            quickRangeSelect: false
        };
        comp.parseOptions();
        fixture.detectChanges();
        var btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();
        fixture.detectChanges();
        var monthlabel = getElement('.monthlabel');
        expect(monthlabel).not.toBe(null);
        expect(monthlabel.nativeElement.textContent.trim()).toBe('Nov');
        fixture.detectChanges();
        var currmonth = getElements('.caltable tbody tr td');
        expect(currmonth).not.toBe(null);
        expect(currmonth.length).toBe(42);
        fixture.detectChanges();
        currmonth[0].nativeElement.click();
        expect(comp.visibleMonth.monthNbr).toBe(11);
        expect(comp.visibleMonth.monthTxt).toBe('Nov');
        fixture.detectChanges();
        monthlabel = getElement('.monthlabel');
        expect(monthlabel).not.toBe(null);
        expect(monthlabel.nativeElement.textContent.trim()).toBe('Nov');
        fixture.detectChanges();
        currmonth[41].nativeElement.click();
        expect(comp.visibleMonth.monthNbr).toBe(11);
        expect(comp.visibleMonth.monthTxt).toBe('Nov');
        fixture.detectChanges();
        monthlabel = getElement('.monthlabel');
        expect(monthlabel).not.toBe(null);
        expect(monthlabel.nativeElement.textContent.trim()).toBe('Nov');
    });
    it('select previous year', function () {
        comp.selectedMonth = { monthTxt: '', monthNbr: 5, year: 2016 };
        comp.parseOptions();
        fixture.detectChanges();
        var btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();
        fixture.detectChanges();
        var prevyear = getElement(PREVYEAR);
        expect(prevyear).not.toBe(null);
        fixture.detectChanges();
        prevyear.nativeElement.click();
        expect(comp.visibleMonth.monthNbr).toBe(5);
        expect(comp.visibleMonth.monthTxt).toBe('May');
        expect(comp.visibleMonth.year).toBe(2015);
        fixture.detectChanges();
        var yearLabel = getElement('.yearlabel');
        expect(yearLabel).not.toBe(null);
        expect(yearLabel.nativeElement.textContent).toBe('2015');
        fixture.detectChanges();
        var monthlabel = getElement('.monthlabel');
        expect(monthlabel).not.toBe(null);
        expect(monthlabel.nativeElement.textContent).toBe('May');
    });
    it('select next year', function () {
        comp.selectedMonth = { monthTxt: '', monthNbr: 5, year: 2016 };
        comp.parseOptions();
        fixture.detectChanges();
        var btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();
        fixture.detectChanges();
        var nextyear = getElement(NEXTYEAR);
        expect(nextyear).not.toBe(null);
        fixture.detectChanges();
        nextyear.nativeElement.click();
        expect(comp.visibleMonth.monthNbr).toBe(5);
        expect(comp.visibleMonth.monthTxt).toBe('May');
        expect(comp.visibleMonth.year).toBe(2017);
        fixture.detectChanges();
        var yearLabel = getElement('.yearlabel');
        expect(yearLabel).not.toBe(null);
        expect(yearLabel.nativeElement.textContent).toBe('2017');
        fixture.detectChanges();
        var monthlabel = getElement('.monthlabel');
        expect(monthlabel).not.toBe(null);
        expect(monthlabel.nativeElement.textContent).toBe('May');
    });
    it('select end date, begin date and ok buttons', function () {
        comp.selectedMonth = { monthTxt: '', monthNbr: 11, year: 2016 };
        comp.options = {
            quickRangeSelect: false
        };
        comp.parseOptions();
        fixture.detectChanges();
        var btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();
        fixture.detectChanges();
        var selector = getElement('.selector');
        expect(selector).not.toBe(null);
        fixture.detectChanges();
        var enddatebtn = getElement('.footerarea button:first-child');
        expect(enddatebtn).not.toBe(null);
        expect(enddatebtn.nativeElement.textContent.trim()).toBe('End Date');
        expect(enddatebtn.properties['disabled']).toBe(true);
        fixture.detectChanges();
        var currmonth = getElements('.caltable tbody tr td');
        expect(currmonth).not.toBe(null);
        fixture.detectChanges();
        currmonth[1].nativeElement.click();
        fixture.detectChanges();
        enddatebtn = getElement('.footerarea button:first-child');
        expect(enddatebtn).not.toBe(null);
        expect(enddatebtn.properties['disabled']).toBe(false);
        // Click to end date button
        fixture.detectChanges();
        enddatebtn.nativeElement.click();
        fixture.detectChanges();
        var disabled = getElements('.disabled');
        expect(disabled).not.toBe(null);
        expect(disabled.length).toBe(1);
        fixture.detectChanges();
        var begindatebtn = getElement('.footerarea button:first-child');
        expect(begindatebtn).not.toBe(null);
        expect(begindatebtn.nativeElement.textContent.trim()).toBe('Begin Date');
        fixture.detectChanges();
        var okbtn = getElement('.footerarea button:last-child');
        expect(okbtn).not.toBe(null);
        expect(okbtn.nativeElement.textContent.trim()).toBe('Accept');
        expect(okbtn.properties['disabled']).toBe(true);
        // Click to begin date button
        fixture.detectChanges();
        begindatebtn = getElement('.footerarea button:first-child');
        begindatebtn.nativeElement.click();
        fixture.detectChanges();
        disabled = getElements('.disabled');
        expect(disabled).not.toBe(null);
        expect(disabled.length).toBe(0);
        fixture.detectChanges();
        var selectedday = getElement('.selectedday');
        expect(selectedday).not.toBe(null);
        // Click to end date button
        fixture.detectChanges();
        enddatebtn = getElement('.footerarea button:first-child');
        enddatebtn.nativeElement.click();
        fixture.detectChanges();
        currmonth = getElements('.caltable tbody tr td');
        currmonth[30].nativeElement.click();
        fixture.detectChanges();
        okbtn = getElement('.footerarea button:last-child');
        expect(okbtn).not.toBe(null);
        expect(okbtn.properties['disabled']).toBe(false);
        // Click to begin date button
        fixture.detectChanges();
        begindatebtn = getElement('.footerarea button:first-child');
        expect(begindatebtn).not.toBe(null);
        begindatebtn.nativeElement.click();
        fixture.detectChanges();
        disabled = getElements('.disabled');
        expect(disabled).not.toBe(null);
        expect(disabled.length).toBe(11);
        // Click to end date button
        fixture.detectChanges();
        enddatebtn = getElement('.footerarea button:first-child');
        enddatebtn.nativeElement.click();
        // Click to ok button
        fixture.detectChanges();
        okbtn = getElement('.footerarea button:last-child');
        okbtn.nativeElement.click();
        fixture.detectChanges();
        var selection = getElement('.selection');
        expect(selection.nativeElement.value).toContain('2016-11-01 - 2016-11-30');
    });
    it('popup title text and title text click', function () {
        comp.selectedMonth = { monthTxt: '', monthNbr: 11, year: 2016 };
        comp.parseOptions();
        fixture.detectChanges();
        var btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();
        fixture.detectChanges();
        var selector = getElement('.selector');
        expect(selector).not.toBe(null);
        fixture.detectChanges();
        var titleareafull = getElement('.titleareafull');
        expect(titleareafull).not.toBe(null);
        expect(titleareafull.nativeElement.textContent).toBe('Select Begin Date');
        fixture.detectChanges();
        var currmonth = getElements('.caltable tbody tr td');
        expect(currmonth).not.toBe(null);
        fixture.detectChanges();
        currmonth[1].nativeElement.click();
        fixture.detectChanges();
        var titlearealeft = getElement('.titlearealeft');
        expect(titlearealeft).not.toBe(null);
        expect(titlearealeft.nativeElement.textContent).toBe('2016-11-01');
        fixture.detectChanges();
        var titlearearight = getElement('.titlearearight');
        expect(titlearearight).not.toBe(null);
        expect(titlearearight.nativeElement.textContent).toBe('Select End Date');
        fixture.detectChanges();
        var enddatebtn = getElement('.footerarea button:first-child');
        expect(enddatebtn).not.toBe(null);
        enddatebtn.nativeElement.click();
        fixture.detectChanges();
        currmonth = getElements('.caltable tbody tr td');
        expect(currmonth).not.toBe(null);
        fixture.detectChanges();
        currmonth[2].nativeElement.click();
        fixture.detectChanges();
        titlearealeft = getElement('.titlearealeft');
        expect(titlearealeft).not.toBe(null);
        expect(titlearealeft.nativeElement.textContent).toBe('2016-11-01');
        fixture.detectChanges();
        titlearearight = getElement('.titlearearight');
        expect(titlearearight).not.toBe(null);
        expect(titlearearight.nativeElement.textContent).toBe('2016-11-02');
        fixture.detectChanges();
        var selecteddaygreen = getElement('.selecteddaygreen');
        expect(selecteddaygreen).not.toBe(null);
        expect(selecteddaygreen.nativeElement.textContent.trim()).toBe('2');
        // Title text click
        fixture.detectChanges();
        titlearealeft.nativeElement.click();
        fixture.detectChanges();
        selecteddaygreen = getElement('.selecteddaygreen');
        expect(selecteddaygreen).not.toBe(null);
        expect(selecteddaygreen.nativeElement.textContent.trim()).toBe('1');
        fixture.detectChanges();
        titlearearight.nativeElement.click();
        fixture.detectChanges();
        selecteddaygreen = getElement('.selecteddaygreen');
        expect(selecteddaygreen).not.toBe(null);
        expect(selecteddaygreen.nativeElement.textContent.trim()).toBe('2');
    });
    it('test calendar year 2016 month one by one - next month button', function () {
        comp.selectedMonth = { monthTxt: '', monthNbr: 1, year: 2016 };
        comp.options = { firstDayOfWeek: 'mo' };
        comp.parseOptions();
        fixture.detectChanges();
        var btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();
        fixture.detectChanges();
        var monthlabel = getElement('.monthlabel');
        expect(monthlabel).not.toBe(null);
        expect(monthlabel.nativeElement.textContent.trim()).toBe('Jan');
        fixture.detectChanges();
        var yearlabel = getElement('.yearlabel');
        expect(yearlabel).not.toBe(null);
        expect(yearlabel.nativeElement.textContent.trim()).toBe('2016');
        comp.generateCalendar(1, 2016, false);
        var beginDate = ['28', '1', '29', '28', '25', '30', '27', '1', '29', '26', '31', '28'];
        var endDate = ['7', '13', '10', '8', '5', '10', '7', '11', '9', '6', '11', '8'];
        var i = 0;
        do {
            fixture.detectChanges();
            var currmonth = getElements('.caltable tbody tr td');
            expect(currmonth).not.toBe(null);
            expect(currmonth.length).toBe(42);
            expect(currmonth[0]).not.toBe(null);
            expect(currmonth[0].nativeElement.textContent.trim()).toBe(beginDate[i]);
            expect(currmonth[41]).not.toBe(null);
            expect(currmonth[41].nativeElement.textContent.trim()).toBe(endDate[i]);
            comp.nextMonth();
            i++;
        } while (i < 12);
    });
    it('test calendar year 2016 month one by one - previous month button', function () {
        comp.selectedMonth = { monthTxt: '', monthNbr: 12, year: 2016 };
        comp.options = { firstDayOfWeek: 'mo' };
        comp.parseOptions();
        fixture.detectChanges();
        var btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();
        fixture.detectChanges();
        var monthlabel = getElement('.monthlabel');
        expect(monthlabel).not.toBe(null);
        expect(monthlabel.nativeElement.textContent.trim()).toBe('Dec');
        fixture.detectChanges();
        var yearlabel = getElement('.yearlabel');
        expect(yearlabel).not.toBe(null);
        expect(yearlabel.nativeElement.textContent.trim()).toBe('2016');
        comp.generateCalendar(12, 2016, false);
        var beginDate = ['28', '1', '29', '28', '25', '30', '27', '1', '29', '26', '31', '28'];
        var endDate = ['7', '13', '10', '8', '5', '10', '7', '11', '9', '6', '11', '8'];
        var i = 11;
        do {
            fixture.detectChanges();
            var currmonth = getElements('.caltable tbody tr td');
            expect(currmonth).not.toBe(null);
            expect(currmonth.length).toBe(42);
            expect(currmonth[0]).not.toBe(null);
            expect(currmonth[0].nativeElement.textContent.trim()).toBe(beginDate[i]);
            expect(currmonth[41]).not.toBe(null);
            expect(currmonth[41].nativeElement.textContent.trim()).toBe(endDate[i]);
            comp.prevMonth();
            i--;
        } while (i >= 0);
    });
    // options
    it('options - dayLabels', function () {
        comp.selectedMonth = { monthTxt: '', monthNbr: 11, year: 2016 };
        comp.options = {
            dayLabels: { su: '1', mo: '2', tu: '3', we: '4', th: '5', fr: '6', sa: '7' },
            firstDayOfWeek: 'su'
        };
        comp.parseOptions();
        fixture.detectChanges();
        var btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();
        fixture.detectChanges();
        var ths = getElements('.caltable thead tr th');
        expect(ths.length).toBe(7);
        for (var i in ths) {
            var el_1 = ths[i];
            expect(parseInt(el_1.nativeElement.textContent)).toBe(parseInt(i) + 1);
        }
    });
    it('options - monthLabels', function () {
        comp.selectedMonth = { monthTxt: '', monthNbr: 1, year: 2016 };
        comp.options = {
            monthLabels: { 1: '1', 2: '2', 3: '3', 4: '4', 5: '5', 6: '6', 7: '7', 8: '8', 9: '9', 10: '10', 11: '11', 12: '12' }
        };
        comp.parseOptions();
        fixture.detectChanges();
        var btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();
        fixture.detectChanges();
        var nextmonth = getElement(NEXTMONTH);
        expect(nextmonth).not.toBe(null);
        for (var i = 1; i <= 12; i++) {
            fixture.detectChanges();
            var monthLabel = getElement('.headermonthtxt .headerlabelbtn');
            expect(parseInt(monthLabel.nativeElement.textContent)).toBe(i);
            nextmonth.nativeElement.click();
        }
    });
    it('options - date format', function () {
        comp.options = {
            dateFormat: 'dd.mm.yyyy',
            indicateInvalidDate: true
        };
        comp.parseOptions();
        fixture.detectChanges();
        var value = { target: { value: '2016-08-22 - 2016-08-24' } };
        comp.userDateRangeInput(value);
        expect(comp.invalidDateRange).toBe(true);
        fixture.detectChanges();
        var invaliddaterange = getElement('.invaliddaterange');
        expect(invaliddaterange).not.toBe(null);
        value = { target: { value: '2016-08-22 - 2016-08-2' } };
        comp.userDateRangeInput(value);
        expect(comp.invalidDateRange).toBe(true);
        value = { target: { value: '2016/08-22 - 2016-08/24' } };
        comp.userDateRangeInput(value);
        expect(comp.invalidDateRange).toBe(true);
        value = { target: { value: '2016-08-22 - 2016-08-xx' } };
        comp.userDateRangeInput(value);
        expect(comp.invalidDateRange).toBe(true);
        value = { target: { value: '22.08.2016 - 24.08.206' } };
        comp.userDateRangeInput(value);
        expect(comp.invalidDateRange).toBe(true);
        value = { target: { value: '22.08.2016 - 24.08.20111' } };
        comp.userDateRangeInput(value);
        expect(comp.invalidDateRange).toBe(true);
        value = { target: { value: '22.08.2016 - 24.08.2016' } };
        comp.userDateRangeInput(value);
        expect(comp.invalidDateRange).toBe(false);
        comp.options = { dateFormat: 'dd mmm yyyy', indicateInvalidDate: true };
        comp.parseOptions();
        value = { target: { value: '2016-08-22 - 2016-08-24' } };
        comp.userDateRangeInput(value);
        expect(comp.invalidDateRange).toBe(true);
        value = { target: { value: '22 Aug 2016 - 22 Sep 2016' } };
        comp.userDateRangeInput(value);
        expect(comp.invalidDateRange).toBe(false);
    });
    it('options - show clear button', function () {
        comp.selectedMonth = { monthTxt: '', monthNbr: 1, year: 2016 };
        comp.parseOptions();
        fixture.detectChanges();
        var btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();
        fixture.detectChanges();
        var headerclearbtn = getElement('.headerclearbtn');
        expect(headerclearbtn).not.toBe(null);
        btnpicker.nativeElement.click();
        comp.options = { showClearBtn: false };
        comp.parseOptions();
        fixture.detectChanges();
        btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();
        fixture.detectChanges();
        headerclearbtn = getElement('.headerclearbtn');
        expect(headerclearbtn).toBe(null);
        btnpicker.nativeElement.click();
        comp.options = { showClearBtn: true };
        comp.parseOptions();
        fixture.detectChanges();
        btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();
        fixture.detectChanges();
        headerclearbtn = getElement('.headerclearbtn');
        expect(headerclearbtn).not.toBe(null);
    });
    it('options - clear button text', function () {
        comp.selectedMonth = { monthTxt: '', monthNbr: 1, year: 2016 };
        comp.options = {
            clearBtnTxt: 'test text'
        };
        comp.parseOptions();
        fixture.detectChanges();
        var btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();
        fixture.detectChanges();
        var headerclearbtn = getElement('.headerclearbtn');
        expect(headerclearbtn).not.toBe(null);
        expect(headerclearbtn.nativeElement.textContent).toBe('test text');
    });
    it('options - begin date button text', function () {
        comp.selectedMonth = { monthTxt: '', monthNbr: 1, year: 2016 };
        comp.options = {
            beginDateBtnTxt: 'test text',
            quickRangeSelect: false
        };
        comp.parseOptions();
        fixture.detectChanges();
        var btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();
        fixture.detectChanges();
        var currmonth = getElements('.caltable tbody tr td');
        expect(currmonth).not.toBe(null);
        expect(currmonth.length).toBe(42);
        fixture.detectChanges();
        currmonth[1].nativeElement.click();
        fixture.detectChanges();
        var enddatebtn = getElement('.footerarea button:first-child');
        expect(enddatebtn).not.toBe(null);
        fixture.detectChanges();
        enddatebtn.nativeElement.click();
        fixture.detectChanges();
        var begindatebtn = getElement('.footerarea button:first-child');
        expect(begindatebtn).not.toBe(null);
        expect(begindatebtn.nativeElement.textContent.trim()).toBe('test text');
    });
    it('options - end date button text', function () {
        comp.selectedMonth = { monthTxt: '', monthNbr: 1, year: 2016 };
        comp.options = {
            endDateBtnTxt: 'test text',
            quickRangeSelect: false
        };
        comp.parseOptions();
        fixture.detectChanges();
        var btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();
        fixture.detectChanges();
        var currmonth = getElements('.caltable tbody tr td');
        expect(currmonth).not.toBe(null);
        expect(currmonth.length).toBe(42);
        fixture.detectChanges();
        currmonth[1].nativeElement.click();
        fixture.detectChanges();
        var enddatebtn = getElement('.footerarea button:first-child');
        expect(enddatebtn).not.toBe(null);
        expect(enddatebtn.nativeElement.textContent.trim()).toBe('test text');
    });
    it('options - accept date range button text', function () {
        comp.selectedMonth = { monthTxt: '', monthNbr: 1, year: 2016 };
        comp.options = {
            acceptBtnTxt: 'test text'
        };
        comp.parseOptions();
        fixture.detectChanges();
        var btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();
        fixture.detectChanges();
        var currmonth = getElements('.caltable tbody tr td');
        expect(currmonth).not.toBe(null);
        expect(currmonth.length).toBe(42);
        fixture.detectChanges();
        currmonth[1].nativeElement.click();
        fixture.detectChanges();
        var enddatebtn = getElement('.footerarea button:first-child');
        expect(enddatebtn).not.toBe(null);
        fixture.detectChanges();
        enddatebtn.nativeElement.click();
        fixture.detectChanges();
        var acceptbtn = getElement('.footerarea button:last-child');
        expect(acceptbtn).not.toBe(null);
        expect(acceptbtn.nativeElement.textContent.trim()).toBe('test text');
    });
    it('options - show select date text', function () {
        comp.selectedMonth = { monthTxt: '', monthNbr: 1, year: 2016 };
        comp.options = {
            showSelectDateText: false
        };
        comp.parseOptions();
        fixture.detectChanges();
        var btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();
        fixture.detectChanges();
        var titlearea = getElement('.titlearea');
        expect(titlearea).toBe(null);
        btnpicker.nativeElement.click();
        comp.options = {
            showSelectDateText: true
        };
        comp.parseOptions();
        btnpicker.nativeElement.click();
        fixture.detectChanges();
        titlearea = getElement('.titlearea');
        expect(titlearea).not.toBe(null);
    });
    it('options - select begin date text', function () {
        comp.selectedMonth = { monthTxt: '', monthNbr: 1, year: 2016 };
        comp.options = {
            selectBeginDateTxt: 'test text'
        };
        comp.parseOptions();
        fixture.detectChanges();
        var btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();
        fixture.detectChanges();
        var titleareatxt = getElement('.titleareatxt');
        expect(titleareatxt).not.toBe(null);
        expect(titleareatxt.nativeElement.textContent.trim()).toBe('test text');
    });
    it('options - select end date text', function () {
        comp.selectedMonth = { monthTxt: '', monthNbr: 1, year: 2016 };
        comp.options = {
            selectEndDateTxt: 'test text'
        };
        comp.parseOptions();
        fixture.detectChanges();
        var btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();
        fixture.detectChanges();
        var currmonth = getElements('.caltable tbody tr td');
        expect(currmonth).not.toBe(null);
        expect(currmonth.length).toBe(42);
        fixture.detectChanges();
        currmonth[1].nativeElement.click();
        fixture.detectChanges();
        var enddatebtn = getElement('.footerarea button:first-child');
        expect(enddatebtn).not.toBe(null);
        fixture.detectChanges();
        enddatebtn.nativeElement.click();
        fixture.detectChanges();
        var titlearearight = getElement('.titlearearight');
        expect(titlearearight).not.toBe(null);
        expect(titlearearight.nativeElement.textContent.trim()).toBe('test text');
    });
    it('options - first day of week', function () {
        comp.selectedMonth = { monthTxt: '', monthNbr: 5, year: 2016 };
        comp.options = {
            firstDayOfWeek: 'tu'
        };
        comp.parseOptions();
        fixture.detectChanges();
        var btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();
        fixture.detectChanges();
        var first = getElement('.caltable thead tr th:first-child');
        expect(first).not.toBe(null);
        expect(first.nativeElement.textContent).toBe('Tue');
        var last = getElement('.caltable thead tr th:last-child');
        expect(last).not.toBe(null);
        expect(last.nativeElement.textContent).toBe('Mon');
    });
    it('options - sunday highlight', function () {
        comp.selectedMonth = { monthTxt: '', monthNbr: 11, year: 2016 };
        comp.options = {
            sunHighlight: true
        };
        comp.parseOptions();
        fixture.detectChanges();
        var btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();
        fixture.detectChanges();
        var sunday = getElements('.sunday');
        expect(sunday).not.toBe(null);
        expect(sunday.length).toBe(6);
        fixture.detectChanges();
        btnpicker.nativeElement.click();
        comp.options = {
            sunHighlight: false
        };
        comp.parseOptions();
        fixture.detectChanges();
        btnpicker.nativeElement.click();
        fixture.detectChanges();
        sunday = getElements('.sunday');
        expect(sunday.length).toBe(0);
    });
    it('options - current day marked', function () {
        comp.options = { markCurrentDay: true };
        comp.parseOptions();
        fixture.detectChanges();
        var btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();
        fixture.detectChanges();
        var currday = getElement('.currday');
        expect(currday).not.toBe(null);
        btnpicker.nativeElement.click();
        comp.options = { markCurrentDay: false };
        comp.parseOptions();
        fixture.detectChanges();
        btnpicker.nativeElement.click();
        comp.parseOptions();
        fixture.detectChanges();
        currday = getElement('.currday');
        expect(currday).toBe(null);
    });
    it('options - editable month and year', function () {
        comp.selectedMonth = { monthTxt: '', monthNbr: 11, year: 2016 };
        comp.options = {
            editableMonthAndYear: true
        };
        comp.parseOptions();
        fixture.detectChanges();
        var btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();
        fixture.detectChanges();
        var montlabel = getElement('.headermonthtxt .headerlabelbtn');
        expect(montlabel).not.toBe(null);
        montlabel.nativeElement.click();
        // Month input
        fixture.detectChanges();
        var monthinput = getElement('.monthinput');
        expect(monthinput).not.toBe(null);
        comp.userMonthInput({ target: { value: 'jan' } });
        fixture.detectChanges();
        montlabel = getElement('.headermonthtxt .headerlabelbtn');
        expect(montlabel).not.toBe(null);
        expect(montlabel.nativeElement.textContent).toBe('Jan');
        // Invalid month
        montlabel.nativeElement.click();
        fixture.detectChanges();
        monthinput = getElement('.monthinput');
        expect(monthinput).not.toBe(null);
        comp.userMonthInput({ target: { value: 'ja' } });
        fixture.detectChanges();
        montlabel = getElement('.invalidmonth');
        expect(montlabel).not.toBe(null);
        // Year input
        fixture.detectChanges();
        var yearlabel = getElement('.headeryeartxt .headerlabelbtn');
        expect(yearlabel).not.toBe(null);
        yearlabel.nativeElement.click();
        fixture.detectChanges();
        var yearinput = getElement('.yearinput');
        expect(yearinput).not.toBe(null);
        comp.userYearInput({ target: { value: '2019' } });
        fixture.detectChanges();
        yearlabel = getElement('.headeryeartxt .headerlabelbtn');
        expect(yearlabel).not.toBe(null);
        expect(yearlabel.nativeElement.textContent).toBe('2019');
        // Invalid year
        yearlabel.nativeElement.click();
        fixture.detectChanges();
        yearinput = getElement('.yearinput');
        expect(yearinput).not.toBe(null);
        comp.userYearInput({ target: { value: '999' } });
        fixture.detectChanges();
        yearlabel = getElement('.invalidyear');
        expect(yearlabel).not.toBe(null);
    });
    it('options - disable header buttons', function () {
        comp.selectedMonth = { monthTxt: '', monthNbr: 5, year: 2016 };
        comp.options = {
            disableHeaderButtons: true,
            disableUntil: { year: 2016, month: 4, day: 10 }
        };
        comp.parseOptions();
        fixture.detectChanges();
        var btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();
        fixture.detectChanges();
        var montlabel = getElement('.headermonthtxt .headerlabelbtn');
        expect(montlabel).not.toBe(null);
        expect(montlabel.nativeElement.textContent).toBe('May');
        fixture.detectChanges();
        var prevmonth = getElement(PREVMONTH);
        expect(prevmonth).not.toBe(null);
        prevmonth.nativeElement.click();
        fixture.detectChanges();
        montlabel = getElement('.headermonthtxt .headerlabelbtn');
        expect(montlabel).not.toBe(null);
        expect(montlabel.nativeElement.textContent).toBe('Apr');
        fixture.detectChanges();
        var headerbtndisabled = getElements('.headerbtndisabled');
        expect(headerbtndisabled).not.toBe(null);
        expect(headerbtndisabled.length).toBe(2);
        prevmonth.nativeElement.click();
        fixture.detectChanges();
        montlabel = getElement('.headermonthtxt .headerlabelbtn');
        expect(montlabel).not.toBe(null);
        expect(montlabel.nativeElement.textContent).toBe('Apr');
        fixture.detectChanges();
        var prevyear = getElement(PREVYEAR);
        expect(prevyear).not.toBe(null);
        prevyear.nativeElement.click();
        fixture.detectChanges();
        var yearlabel = getElement('.headeryeartxt .headerlabelbtn');
        expect(yearlabel).not.toBe(null);
        expect(yearlabel.nativeElement.textContent).toBe('2016');
        btnpicker.nativeElement.click();
        comp.options = {
            disableHeaderButtons: true,
            disableSince: { year: 2016, month: 7, day: 10 }
        };
        comp.parseOptions();
        fixture.detectChanges();
        btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();
        fixture.detectChanges();
        montlabel = getElement('.headermonthtxt .headerlabelbtn');
        expect(montlabel).not.toBe(null);
        expect(montlabel.nativeElement.textContent).toBe('May');
        fixture.detectChanges();
        var nextmonth = getElement(NEXTMONTH);
        expect(nextmonth).not.toBe(null);
        nextmonth.nativeElement.click();
        fixture.detectChanges();
        montlabel = getElement('.headermonthtxt .headerlabelbtn');
        expect(montlabel).not.toBe(null);
        expect(montlabel.nativeElement.textContent).toBe('Jun');
        fixture.detectChanges();
        headerbtndisabled = getElements('.headerbtndisabled');
        expect(headerbtndisabled).not.toBe(null);
        expect(headerbtndisabled.length).toBe(2);
        prevmonth.nativeElement.click();
        fixture.detectChanges();
        montlabel = getElement('.headermonthtxt .headerlabelbtn');
        expect(montlabel).not.toBe(null);
        expect(montlabel.nativeElement.textContent).toBe('Jun');
        fixture.detectChanges();
        var nextyear = getElement(NEXTYEAR);
        expect(nextyear).not.toBe(null);
        nextyear.nativeElement.click();
        fixture.detectChanges();
        yearlabel = getElement('.headeryeartxt .headerlabelbtn');
        expect(yearlabel).not.toBe(null);
        expect(yearlabel.nativeElement.textContent).toBe('2016');
    });
    it('options - show week numbers', function () {
        comp.selectedMonth = { monthTxt: '', monthNbr: 1, year: 2017 };
        comp.options = { showWeekNumbers: false };
        comp.parseOptions();
        fixture.detectChanges();
        var btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();
        fixture.detectChanges();
        var weekdaytitleweeknbr = getElement('.weekdaytitleweeknbr');
        expect(weekdaytitleweeknbr).toBe(null);
        fixture.detectChanges();
        var daycellweeknbr = getElements('.daycellweeknbr');
        expect(daycellweeknbr.length).toBe(0);
        btnpicker.nativeElement.click();
        comp.options = { showWeekNumbers: true };
        comp.parseOptions();
        fixture.detectChanges();
        btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();
        fixture.detectChanges();
        weekdaytitleweeknbr = getElement('.weekdaytitleweeknbr');
        expect(weekdaytitleweeknbr).not.toBe(null);
        fixture.detectChanges();
        daycellweeknbr = getElements('.daycellweeknbr');
        expect(daycellweeknbr.length).toBe(6);
        expect(daycellweeknbr[0].nativeElement.textContent.trim()).toBe('52');
        expect(daycellweeknbr[1].nativeElement.textContent.trim()).toBe('1');
        expect(daycellweeknbr[2].nativeElement.textContent.trim()).toBe('2');
        expect(daycellweeknbr[3].nativeElement.textContent.trim()).toBe('3');
        expect(daycellweeknbr[4].nativeElement.textContent.trim()).toBe('4');
        expect(daycellweeknbr[5].nativeElement.textContent.trim()).toBe('5');
        fixture.detectChanges();
        var prevyear = getElement(PREVYEAR);
        expect(prevyear).not.toBe(null);
        prevyear.nativeElement.click();
        fixture.detectChanges();
        daycellweeknbr = getElements('.daycellweeknbr');
        expect(daycellweeknbr.length).toBe(6);
        expect(daycellweeknbr[0].nativeElement.textContent.trim()).toBe('53');
        expect(daycellweeknbr[1].nativeElement.textContent.trim()).toBe('1');
        expect(daycellweeknbr[2].nativeElement.textContent.trim()).toBe('2');
        expect(daycellweeknbr[3].nativeElement.textContent.trim()).toBe('3');
        expect(daycellweeknbr[4].nativeElement.textContent.trim()).toBe('4');
        expect(daycellweeknbr[5].nativeElement.textContent.trim()).toBe('5');
        prevyear.nativeElement.click();
        fixture.detectChanges();
        daycellweeknbr = getElements('.daycellweeknbr');
        expect(daycellweeknbr.length).toBe(6);
        expect(daycellweeknbr[0].nativeElement.textContent.trim()).toBe('1');
        expect(daycellweeknbr[1].nativeElement.textContent.trim()).toBe('2');
        expect(daycellweeknbr[2].nativeElement.textContent.trim()).toBe('3');
        expect(daycellweeknbr[3].nativeElement.textContent.trim()).toBe('4');
        expect(daycellweeknbr[4].nativeElement.textContent.trim()).toBe('5');
        expect(daycellweeknbr[5].nativeElement.textContent.trim()).toBe('6');
    });
    it('options - min year', function () {
        comp.visibleMonth = { monthTxt: 'May', monthNbr: 11, year: 2016 };
        comp.options = {
            minYear: 2000
        };
        comp.parseOptions();
        fixture.detectChanges();
        var btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();
        fixture.detectChanges();
        var yearlabel = getElement('.headeryeartxt .headerlabelbtn');
        expect(yearlabel).not.toBe(null);
        yearlabel.nativeElement.click();
        fixture.detectChanges();
        var yearinput = getElement('.yearinput');
        expect(yearinput).not.toBe(null);
        comp.userYearInput({ target: { value: 1999 } });
        fixture.detectChanges();
        var invalidyear = getElement('.invalidyear');
        expect(invalidyear).not.toBe(null);
        comp.userYearInput({ target: { value: 2000 } });
        fixture.detectChanges();
        yearlabel = getElement('.headeryeartxt .headerlabelbtn');
        expect(yearlabel).not.toBe(null);
        expect(yearlabel.nativeElement.textContent).toBe('2000');
    });
    it('options - max year', function () {
        comp.visibleMonth = { monthTxt: 'May', monthNbr: 11, year: 2016 };
        comp.options = {
            maxYear: 2020
        };
        comp.parseOptions();
        fixture.detectChanges();
        var btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();
        fixture.detectChanges();
        var yearlabel = getElement('.headeryeartxt .headerlabelbtn');
        expect(yearlabel).not.toBe(null);
        yearlabel.nativeElement.click();
        fixture.detectChanges();
        var yearinput = getElement('.yearinput');
        expect(yearinput).not.toBe(null);
        comp.userYearInput({ target: { value: 2021 } });
        fixture.detectChanges();
        var invalidyear = getElement('.invalidyear');
        expect(invalidyear).not.toBe(null);
        comp.userYearInput({ target: { value: 2020 } });
        fixture.detectChanges();
        yearlabel = getElement('.headeryeartxt .headerlabelbtn');
        expect(yearlabel).not.toBe(null);
        expect(yearlabel.nativeElement.textContent).toBe('2020');
    });
    it('options - disable until', function () {
        comp.selectedMonth = { monthTxt: '', monthNbr: 10, year: 2016 };
        comp.options = {
            disableUntil: { year: 2016, month: 10, day: 5 },
            disableHeaderButtons: false
        };
        comp.parseOptions();
        fixture.detectChanges();
        var btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();
        comp.generateCalendar(10, 2016, true);
        fixture.detectChanges();
        var disabled = getElements('tr .disabled');
        expect(disabled).not.toBe(null);
        expect(disabled.length).toBe(10);
        disabled[0].nativeElement.click();
        fixture.detectChanges();
        var selectedday = getElement('.selectedday');
        expect(selectedday).toBe(null);
    });
    it('options - disable since', function () {
        comp.selectedMonth = { monthTxt: '', monthNbr: 10, year: 2016 };
        comp.options = {
            disableSince: { year: 2016, month: 10, day: 30 },
            disableHeaderButtons: false
        };
        comp.parseOptions();
        fixture.detectChanges();
        var btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();
        comp.generateCalendar(10, 2016, true);
        fixture.detectChanges();
        var disabled = getElements('tr .disabled');
        expect(disabled).not.toBe(null);
        expect(disabled.length).toBe(8);
        disabled[0].nativeElement.click();
        fixture.detectChanges();
        var selectedday = getElement('.selectedday');
        expect(selectedday).toBe(null);
    });
    it('options - inline', function () {
        comp.selectedMonth = { monthTxt: '', monthNbr: 11, year: 2016 };
        comp.options = {
            inline: true
        };
        comp.parseOptions();
        fixture.detectChanges();
        var selector = getElement('.selector');
        expect(selector).not.toBe(null);
        fixture.detectChanges();
        var selectiongroup = getElement('.selectiongroup');
        expect(selectiongroup).toBe(null);
    });
    it('options - show clear date button', function () {
        var date = new Date();
        comp.selectedMonth = { monthTxt: '', monthNbr: date.getMonth() + 1, year: date.getFullYear() };
        fixture.detectChanges();
        var btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();
        fixture.detectChanges();
        var currday = getElement('.currday');
        expect(currday).not.toBe(null);
        currday.nativeElement.click();
        fixture.detectChanges();
        var enddatebtn = getElement('.footerarea button:first-child');
        expect(enddatebtn).not.toBe(null);
        fixture.detectChanges();
        enddatebtn.nativeElement.click();
        fixture.detectChanges();
        currday = getElement('.currday');
        expect(currday).not.toBe(null);
        currday.nativeElement.click();
        fixture.detectChanges();
        var acceptbtn = getElement('.footerarea button:last-child');
        expect(acceptbtn).not.toBe(null);
        acceptbtn.nativeElement.click();
        fixture.detectChanges();
        var btnclear = getElement('.btnclear');
        expect(btnclear).not.toBe(null);
        btnclear.nativeElement.click();
        comp.options = { showClearDateRangeBtn: false };
        comp.parseOptions();
        fixture.detectChanges();
        btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();
        fixture.detectChanges();
        currday = getElement('.currday');
        expect(currday).not.toBe(null);
        currday.nativeElement.click();
        fixture.detectChanges();
        enddatebtn = getElement('.footerarea button:first-child');
        expect(enddatebtn).not.toBe(null);
        fixture.detectChanges();
        enddatebtn.nativeElement.click();
        fixture.detectChanges();
        currday = getElement('.currday');
        expect(currday).not.toBe(null);
        currday.nativeElement.click();
        fixture.detectChanges();
        acceptbtn = getElement('.footerarea button:last-child');
        expect(acceptbtn).not.toBe(null);
        acceptbtn.nativeElement.click();
        fixture.detectChanges();
        btnclear = getElement('.btnclear');
        expect(btnclear).toBe(null);
    });
    it('options - height', function () {
        comp.selectedMonth = { monthTxt: '', monthNbr: 11, year: 2016 };
        comp.options = {
            height: '50px'
        };
        comp.parseOptions();
        fixture.detectChanges();
        var selection = getElement('.selection');
        expect(selection).not.toBe(null);
        expect(selection.styles['height']).toBe('50px');
    });
    it('options - width', function () {
        comp.selectedMonth = { monthTxt: '', monthNbr: 11, year: 2016 };
        comp.options = {
            width: '300px'
        };
        comp.parseOptions();
        fixture.detectChanges();
        expect(de).not.toBe(null);
        expect(de.styles['width']).toBe('300px');
        comp.options = { width: '20%' };
        comp.parseOptions();
        fixture.detectChanges();
        expect(de).not.toBe(null);
        expect(de.styles['width']).toBe('20%');
    });
    it('options - selection text font size', function () {
        comp.selectedMonth = { monthTxt: '', monthNbr: 11, year: 2016 };
        comp.options = {
            selectionTxtFontSize: '10px'
        };
        comp.parseOptions();
        fixture.detectChanges();
        var selection = getElement('.selection');
        expect(selection).not.toBe(null);
        expect(selection.styles['font-size']).toBe('10px');
    });
    it('options - align selector right', function () {
        comp.selectedMonth = { monthTxt: '', monthNbr: 11, year: 2016 };
        comp.options = {
            alignSelectorRight: true
        };
        fixture.detectChanges();
        var btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();
        comp.parseOptions();
        fixture.detectChanges();
        var alignselectorright = getElement('.alignselectorright');
        expect(alignselectorright).not.toBe(null);
        comp.options = {
            alignSelectorRight: false
        };
        comp.parseOptions();
        fixture.detectChanges();
        alignselectorright = getElement('.alignselectorright');
        expect(alignselectorright).toBe(null);
    });
    it('options - indicate invalid date range', function () {
        comp.selectedMonth = { monthTxt: '', monthNbr: 11, year: 2016 };
        comp.options = {
            indicateInvalidDate: true,
            dateFormat: 'dd.mm.yyyy'
        };
        comp.parseOptions();
        comp.userDateRangeInput({ target: { value: '2016-08-22 - 2016-08-24' } });
        fixture.detectChanges();
        var invaliddate = getElement('.invaliddaterange');
        expect(invaliddate).not.toBe(null);
        comp.userDateRangeInput({ target: { value: '22.xx.2016 - 24.yy.2016' } });
        fixture.detectChanges();
        invaliddate = getElement('.invaliddaterange');
        expect(invaliddate).not.toBe(null);
        comp.userDateRangeInput({ target: { value: '22.14.2016 - 24.15.2016' } });
        fixture.detectChanges();
        invaliddate = getElement('.invaliddaterange');
        expect(invaliddate).not.toBe(null);
        comp.userDateRangeInput({ target: { value: '10.10.2016 - 11.11.2016' } });
        fixture.detectChanges();
        invaliddate = getElement('.invaliddaterange');
        expect(invaliddate).toBe(null);
    });
    it('options - disable component', function () {
        comp.selectedMonth = { monthTxt: '', monthNbr: 11, year: 2016 };
        comp.options = { componentDisabled: true };
        comp.parseOptions();
        fixture.detectChanges();
        var btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();
        fixture.detectChanges();
        var selector = getElement('.selector');
        expect(selector).toBe(null);
        fixture.detectChanges();
        var selection = getElement('.selection');
        expect(selector).toBe(null);
    });
    it('options - editable date range field', function () {
        comp.selectedMonth = { monthTxt: '', monthNbr: 10, year: 2016 };
        comp.options = { editableDateRangeField: false };
        comp.parseOptions();
        fixture.detectChanges();
        var selection = getElement('.selection');
        selection.nativeElement.value = '2016-11-14 - 2016-12-16';
        fixture.detectChanges();
        expect(selection.nativeElement.value).toContain('');
        comp.options = { editableDateRangeField: true };
        comp.parseOptions();
        fixture.detectChanges();
        selection = getElement('.selection');
        selection.nativeElement.value = '2016-11-14 - 2016-12-18';
        fixture.detectChanges();
        expect(selection.nativeElement.value).toContain('2016-11-14 - 2016-12-18');
    });
    it('options - input field value required', function () {
        comp.selectedMonth = { monthTxt: '', monthNbr: 10, year: 2016 };
        comp.options = {};
        comp.parseOptions();
        fixture.detectChanges();
        var selection = getElement('.selection');
        expect(selection).not.toBe(null);
        expect(selection.properties['required']).toBe(false);
        comp.options = { inputValueRequired: true };
        comp.parseOptions();
        fixture.detectChanges();
        selection = getElement('.selection');
        expect(selection).not.toBe(null);
        expect(selection.properties['required']).toBe(true);
        comp.options = { inputValueRequired: false };
        comp.parseOptions();
        fixture.detectChanges();
        selection = getElement('.selection');
        expect(selection).not.toBe(null);
        expect(selection.properties['required']).toBe(false);
    });
    it('options - show selector arrow', function () {
        comp.selectedMonth = { monthTxt: '', monthNbr: 10, year: 2016 };
        comp.options = {};
        comp.parseOptions();
        fixture.detectChanges();
        var btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();
        fixture.detectChanges();
        var selectorarrow = getElement('.selectorarrow');
        expect(selectorarrow).not.toBe(null);
        btnpicker.nativeElement.click();
        comp.options = { showSelectorArrow: false };
        comp.parseOptions();
        fixture.detectChanges();
        btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();
        fixture.detectChanges();
        selectorarrow = getElement('.selectorarrow');
        expect(selectorarrow).toBe(null);
        btnpicker.nativeElement.click();
        comp.options = { showSelectorArrow: true };
        comp.parseOptions();
        fixture.detectChanges();
        btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();
        fixture.detectChanges();
        selectorarrow = getElement('.selectorarrow');
        expect(selectorarrow).not.toBe(null);
        btnpicker.nativeElement.click();
    });
    it('options - quick date range select', function () {
        comp.selectedMonth = { monthTxt: '', monthNbr: 11, year: 2016 };
        comp.options = {
            quickRangeSelect: true
        };
        comp.parseOptions();
        fixture.detectChanges();
        var btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();
        fixture.detectChanges();
        var selector = getElement('.selector');
        expect(selector).not.toBe(null);
        fixture.detectChanges();
        var currmonth = getElements('.caltable tbody tr td');
        expect(currmonth).not.toBe(null);
        expect(currmonth.length).toBe(42);
        var first = currmonth[1];
        expect(first.nativeElement.textContent.trim()).toBe('1');
        expect(currmonth[30].nativeElement.textContent.trim()).toBe('30');
        fixture.detectChanges();
        first.nativeElement.click();
        fixture.detectChanges();
        var selectedday = getElement('.selectedday');
        expect(selectedday).not.toBe(null);
        fixture.detectChanges();
        currmonth = getElements('.caltable tbody tr td');
        currmonth[30].nativeElement.click();
        fixture.detectChanges();
        var selecteddaygreen = getElement('.selecteddaygreen');
        expect(selecteddaygreen).not.toBe(null);
        fixture.detectChanges();
        var range = getElements('.caltable .range');
        expect(range).not.toBe(null);
        expect(range.length).toBe(30);
        fixture.detectChanges();
        var okbtn = getElement('.footerarea button:first-child');
        expect(okbtn).not.toBe(null);
        expect(okbtn.nativeElement.textContent.trim()).toBe('Accept');
        okbtn.nativeElement.click();
        fixture.detectChanges();
        var selection = getElement('.selection');
        expect(selection.nativeElement.value).toContain('2016-11-01 - 2016-11-30');
        fixture.detectChanges();
        var btnclear = getElement('.btnclear');
        btnclear.nativeElement.click();
        fixture.detectChanges();
        selection = getElement('.selection');
        expect(selection.nativeElement.value).toEqual('');
    });
    // attributes
    it('selDateRange - initially selected date range - month as number', function () {
        comp.selectionDayTxt = '2016-11-04 - 2016-11-18';
        comp.options = {
            dateFormat: 'yyyy-mm-dd',
            quickRangeSelect: false
        };
        comp.parseOptions();
        var splitted = comp.selectionDayTxt.split(' - ');
        comp.beginDate = comp.parseSelectedDate(splitted[0]);
        comp.endDate = comp.parseSelectedDate(splitted[1]);
        fixture.detectChanges();
        var selection = getElement('.selection');
        expect(selection).not.toBe(null);
        expect(selection.nativeElement.value).toContain(comp.selectionDayTxt);
        fixture.detectChanges();
        var btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();
        fixture.detectChanges();
        var selectedday = getElements('.selectedday');
        expect(selectedday).not.toBe(null);
        expect(selectedday[0].nativeElement.textContent.trim()).toBe('4');
        expect(selectedday[1].nativeElement.textContent.trim()).toBe('18');
        fixture.detectChanges();
        var selecteddaygreen = getElement('.selecteddaygreen');
        expect(selecteddaygreen).not.toBe(null);
        expect(selecteddaygreen.nativeElement.textContent.trim()).toBe('4');
        fixture.detectChanges();
        var range = getElements('.caltable .range');
        expect(range).not.toBe(null);
        expect(range.length).toBe(15);
        fixture.detectChanges();
        var disabled = getElements('.disabled');
        expect(disabled).not.toBe(null);
        expect(disabled.length).toBe(23);
        fixture.detectChanges();
        var enddatebtn = getElement('.footerarea button:first-child');
        expect(enddatebtn).not.toBe(null);
        expect(enddatebtn.nativeElement.textContent.trim()).toBe('End Date');
        enddatebtn.nativeElement.click();
        fixture.detectChanges();
        var okbtn = getElement('.footerarea button:last-child');
        expect(okbtn).not.toBe(null);
        expect(okbtn.nativeElement.textContent.trim()).toBe('Accept');
        okbtn.nativeElement.click();
    });
    it('selDateRange - initially selected date range - mont as text', function () {
        comp.selectionDayTxt = '04 Nov 2016 - 18 Nov 2016';
        comp.options = {
            dateFormat: 'dd mmm yyyy',
            quickRangeSelect: false
        };
        comp.parseOptions();
        var splitted = comp.selectionDayTxt.split(' - ');
        comp.beginDate = comp.parseSelectedDate(splitted[0]);
        comp.endDate = comp.parseSelectedDate(splitted[1]);
        fixture.detectChanges();
        var selection = getElement('.selection');
        expect(selection).not.toBe(null);
        expect(selection.nativeElement.value).toContain(comp.selectionDayTxt);
        fixture.detectChanges();
        var btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();
        fixture.detectChanges();
        var selectedday = getElements('.selectedday');
        expect(selectedday).not.toBe(null);
        expect(selectedday[0].nativeElement.textContent.trim()).toBe('4');
        expect(selectedday[1].nativeElement.textContent.trim()).toBe('18');
        fixture.detectChanges();
        var selecteddaygreen = getElement('.selecteddaygreen');
        expect(selecteddaygreen).not.toBe(null);
        expect(selecteddaygreen.nativeElement.textContent.trim()).toBe('4');
        fixture.detectChanges();
        var range = getElements('.caltable .range');
        expect(range).not.toBe(null);
        expect(range.length).toBe(15);
        fixture.detectChanges();
        var disabled = getElements('.disabled');
        expect(disabled).not.toBe(null);
        expect(disabled.length).toBe(23);
        fixture.detectChanges();
        var enddatebtn = getElement('.footerarea button:first-child');
        expect(enddatebtn).not.toBe(null);
        expect(enddatebtn.nativeElement.textContent.trim()).toBe('End Date');
        enddatebtn.nativeElement.click();
        fixture.detectChanges();
        var okbtn = getElement('.footerarea button:last-child');
        expect(okbtn).not.toBe(null);
        expect(okbtn.nativeElement.textContent.trim()).toBe('Accept');
        okbtn.nativeElement.click();
    });
    it('defaultMonth - initially selected month', function () {
        comp.selectedMonth = comp.parseSelectedMonth('08/2019');
        comp.parseOptions();
        fixture.detectChanges();
        var btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();
        fixture.detectChanges();
        var monthLabel = getElement('.headermonthtxt .headerlabelbtn');
        expect(monthLabel).not.toBe(null);
        expect(monthLabel.nativeElement.textContent).toBe('Aug');
        fixture.detectChanges();
        var yearLabel = getElement('.headeryeartxt .headerlabelbtn');
        expect(yearLabel).not.toBe(null);
        expect(yearLabel.nativeElement.textContent).toBe('2019');
    });
    it('placeholder - placeholder text', function () {
        comp.placeholder = '';
        fixture.detectChanges();
        var selection = getElement('.selection');
        expect(selection).not.toBe(null);
        expect(selection.properties['placeholder']).toBe('');
        comp.placeholder = 'Select date range';
        fixture.detectChanges();
        selection = getElement('.selection');
        expect(selection).not.toBe(null);
        expect(selection.properties['placeholder']).toBe(comp.placeholder);
    });
});
//# sourceMappingURL=my-date-range-picker.component.spec.js.map