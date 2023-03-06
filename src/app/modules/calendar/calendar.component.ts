import { Day, Month, MonthDays } from './interfaces';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { CalendarService } from '../calendar.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit{

  //@Output() tabSelectionChangeEvent = new EventEmitter<string>();

  public months: Month[] = [
    { name: 'Janeiro',    id: 0  , abbreviation: 'Jan' },
    { name: 'Fevereiro',  id: 1  , abbreviation: 'Fev' },
    { name: 'Março',      id: 2  , abbreviation: 'Mar' },
    { name: 'Abril',      id: 3  , abbreviation: 'Abr' },
    { name: 'Maio',       id: 4  , abbreviation: 'Mai' },
    { name: 'Junho',      id: 5  , abbreviation: 'Jun' },
    { name: 'Julho',      id: 6  , abbreviation: 'Jul' },
    { name: 'Agosto',     id: 7  , abbreviation: 'Ago' },
    { name: 'Setembro',   id: 8  , abbreviation: 'Set' },
    { name: 'Outubro',    id: 9  , abbreviation: 'Out' },
    { name: 'Novembro',   id: 10 , abbreviation: 'Nov' },
    { name: 'Dezembro',   id: 11 , abbreviation: 'Dez' }
  ]

  public days: Day[] = [
    { name: 'Domingo',  id: 0, abbreviation: 'Dom'  },
    { name: 'Segunda',  id: 1, abbreviation: 'Seg'  },
    { name: 'Terça',    id: 2, abbreviation: 'Ter'  },
    { name: 'Quarta',   id: 3, abbreviation: 'Qua'  },
    { name: 'Quinta',   id: 4, abbreviation: 'Qui'  },
    { name: 'Sexta',    id: 5, abbreviation: 'Sex'  },
    { name: 'Sábado',   id: 6, abbreviation: 'Sab'  }
  ]

  public years: number[] = [];
  public selectedYear: number = 0;
  public dateIsToday: boolean = false;
  public selectedMonth: number = 0;
  public selectedDate: number = 1;
  public totalMonthDays: number = 0;
  public firstDayOfMonth: number = 0;
  public monthDaysArray: MonthDays[] = [];
  public monthDaysGroup: any[] = [];

  constructor(
    private calendarService: CalendarService
  ) {

  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.init();

  }

  init() {
    this.generateYears();
    let today = new Date();
    this.selectedYear =  today.getFullYear();
    this.selectedMonth =  today.getMonth();
    this.selectedDate = today.getDate();
    this.getTotalMonthDays();
    this.getfirstDayOfMonth();
    this.selectToday();
    this.generateDays();
  }

  generateYears(){
    const startYear: number = 1923;
    const endYear: number = 2123;
    for (let i = startYear; i <= endYear; i++) {
      this.years.push(i);
    }
  }

  generateDays(){
    this.monthDaysArray = [];
    const firstDay: number = 1;
    const lastDay: number = this.totalMonthDays;
    console.log("totalMonthDays : " , this.totalMonthDays);

    for (let i = firstDay; i <= lastDay; i++) {
      let day: MonthDays = {
        date: i,
        month: this.selectedMonth,
        year: this.selectedYear
      }
      this.monthDaysArray.push(day);
    }
    this.groupColumns();
  }

  groupColumns(){
    this.monthDaysGroup  = [];
    // this.monthDaysArray
    for (let i = 0; i < this.monthDaysArray.length; i+=7) {
      this.monthDaysGroup.push(this.monthDaysArray.slice(i, i + 7));
    }
    console.log("monthDaysGroup :", this.monthDaysGroup);

  }

  populateMonths(){

  }



  getSelectedYear(year: number){
    this.selectedYear = year;
    //console.log("selected year", this.selectedYear);
    this.getSelectedMonth(this.selectedMonth);
  }

  getSelectedMonth(month: number){
    this.selectedMonth = month;
    this.getTotalMonthDays();
    this.getfirstDayOfMonth();
    this.generateDays();
    //console.log("selected Month", this.selectedMonth);
  }

  getTotalMonthDays(){
   this.totalMonthDays = new Date( this.selectedYear, this.selectedMonth + 1 , 0 ).getDate();
   //console.log("total Month Days ", this.totalMonthDays );
  }

  getfirstDayOfMonth(){
    this.firstDayOfMonth = new Date( this.selectedYear, this.selectedMonth, 1 ).getDay();
    //console.log("first Day Of Month", this.firstDayOfMonth );
  }

  selectToday(){


    console.log("[selectedYear, selectedMonth, selectedDate, totalMonthDays, firstDayOfMonth]",
                 [this.selectedYear, this.selectedMonth, this.selectedDate, this.totalMonthDays, this.firstDayOfMonth]);
  };

  isToday(date: MonthDays){
    this.dateIsToday = false;

    let today = new Date();
    let todayDate = today.getDate();
    let todayMonth =  today.getMonth();
    let todayYear =  today.getFullYear();

    if(date.date === todayDate && date.month === todayMonth && date.year === todayYear){
      this.dateIsToday = true;
    }

    return this.dateIsToday;

  };

  getSelectedTabInfos(event: MatTabChangeEvent){

    //this.tabSelectionChangeEvent.emit("Tab changed!");
    console.log("SelectedTabInfos", event);
    let monthName: string  = event.tab.textLabel;
    let selectedMonth: Month | number | undefined  = this.months.find(m => m.name === monthName);
    selectedMonth = selectedMonth ? selectedMonth.id : 0;

    this.getSelectedMonth(selectedMonth);

    this.generateDays();

    this.calendarService.emitTabChangeEvent();

  }

  populateMonth(){

  }

}


