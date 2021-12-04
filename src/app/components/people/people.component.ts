import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Insan } from 'src/app/models/insan';
import { PeopleService } from 'src/app/services/people.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {
  displayedColumns : string[] = ["id","ad","soyad","tel","sehir","medeniDurum","yas","action"];
  dataSource;
  people:Insan[];
  constructor(private peopleService: PeopleService) { }
  
  ngOnInit(): void {
    this.peopleService.getPeople().subscribe(response => {
      this.people = response;
      this.dataSource = new MatTableDataSource<Insan>(response);
    });
  }

  deletePerson(id:number){
    this.peopleService.deletePeople(id).subscribe(response=>{
      let person = this.people.filter(x=>x.id === id)[0];
      let index = this.people.indexOf(person);
      this.people.splice(index,1);

      this.dataSource = new MatTableDataSource<Insan>(this.people);
    })
  }
}
