import { Component, Input, OnInit } from '@angular/core';
import { CalendarService } from '../../calendar.service';
import { Day, Month } from '../interfaces';

@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.scss']
})
export class MonthComponent implements OnInit{

  @Input() actualMonth: number = 0;
  @Input() totalMonthDays: number = 0;
  @Input() firstDayOfMonth: number = 0;


  public days: Day[] = [
    { name: 'Domingo',  id: 0, abbreviation: 'Dom'  },
    { name: 'Segunda',  id: 1, abbreviation: 'Seg'  },
    { name: 'Terça',    id: 2, abbreviation: 'Ter'  },
    { name: 'Quarta',   id: 3, abbreviation: 'Qua'  },
    { name: 'Quinta',   id: 4, abbreviation: 'Qui'  },
    { name: 'Sexta',    id: 5, abbreviation: 'Sex'  },
    { name: 'Sábado',   id: 6, abbreviation: 'Sab'  }
  ]

  public actualYear: number = 0;
  public actualDate: number = 0;
  public monthDaysArray: number[] = [];
  public subscription: any;

  constructor(
    private calendarService: CalendarService
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.subscription = this.calendarService.getTabChangeEmitter()
      .subscribe(msg => this.initialize(msg));

    this.init();
  }

  init(){
    this.generateDays();
    console.log("[actualMonth, totalMonthDays, firstDayOfMonth] : ", [this.actualMonth, this.totalMonthDays, this.firstDayOfMonth])
  }

  generateDays(){
    this.monthDaysArray = [];
    const firstDay: number = 1;
    const lastDay: number = this.totalMonthDays;
    //console.log("totalMonthDays : " , this.totalMonthDays);
    for (let i = firstDay; i <= lastDay; i++) {
      this.monthDaysArray.push(i);
    }
  }


  getTodayInfo(){
    const today = new Date();

    this.actualYear = today.getFullYear();
    this.actualDate = today.getDate();

  }

  initialize(message: string){
    console.log("emitiu : " , message);
   this.ngOnInit();

  }

}
