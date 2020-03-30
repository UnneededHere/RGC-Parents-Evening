import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from "../global.service";

@Component({
  selector: 'app-mobile-user',
  templateUrl: './mobile-user.page.html',
  styleUrls: ['./mobile-user.page.scss'],
})
export class MobileUserPage implements OnInit {

  films: Observable<any>;
  username: string;

  teachers = [];

  getTeachers() {
    this.films = this.httpClient.get('http://35.204.222.250/api/v2/db/_table/appointments?filter=pupilUser%20=%20%22'+this.username+'%22&api_key=ee4d30beaa7c590c551d364b26c7656c3e547717d7eaf3b035917b9d31faa472');
    this.films.subscribe(data => {
      for(var i = 0; i < data.resource.length; i++) {
        this.teachers.push([data.resource[i].teacherUser])
      }
      this.getTeacherInfo(this.teachers)
    })
  }

  getTeacherInfo(inputSet) {
    var tempTeachers = inputSet;
    for(let j = 0; j < tempTeachers.length; j++) {
      this.films = this.httpClient.get('http://35.204.222.250/api/v2/db/_table/teachers?filter=teacherUser%20=%20%22'+tempTeachers[j][0]+'%22&api_key=ee4d30beaa7c590c551d364b26c7656c3e547717d7eaf3b035917b9d31faa472');
      this.films.subscribe(data => {
        this.teachers[j].push(data.resource[0].place, data.resource[0].pupilInterest, data.resource[0].teacherName, data.resource[0]._id)
        this.teachers.sort(function(a, b) {
          return a[2] - b[2];
        });
      })
    }
  }

  constructor(public httpClient: HttpClient, private route: ActivatedRoute, public singleton:GlobalService) { 
    this.username = this.route.snapshot.paramMap.get('id');
    if(this.singleton.queueState == undefined) {
      console.log("No queue")
      this.singleton.queueState = [false, ""]
    }
    console.log(this.singleton.queueState)
    this.getTeachers();
  }

  doRefresh(event) {
    console.log(this.teachers)
    for(var i = 0; i < this.teachers.length; i++) {
      this.teachers[i].splice(1, 4)
    }
    this.getTeacherInfo(this.teachers);
    event.target.complete();
  }

  noQueue(teacher) {
    this.singleton.queueState = [false, ""]
    var theIndex = 0
    for(var i = 0; i < this.teachers.length; i++) {
      if(this.teachers[i][4] == teacher) {
        theIndex = i
      }
    }
    this.teachers[theIndex][2] -= 1
    let currentInterest = 0;
    this.films = this.httpClient.get('http://35.204.222.250/api/v2/db/_table/teachers?filter=_id='+teacher+'&api_key=ee4d30beaa7c590c551d364b26c7656c3e547717d7eaf3b035917b9d31faa472')
    this.films.subscribe(data => {
        currentInterest = data.resource[0].pupilInterest
        console.log(currentInterest)
        this.removeFromQueue(currentInterest, teacher)
      })
  }
  
  checkQueue(teacher) {
    this.singleton.queueState = [true, teacher]
    var theIndex = 0
    for(var i = 0; i < this.teachers.length; i++) {
      if(this.teachers[i][4] == teacher) {
        theIndex = i
      }
    }
    this.teachers[theIndex][2] += 1
    let currentInterest = 0;
    this.films = this.httpClient.get('http://35.204.222.250/api/v2/db/_table/teachers?filter=_id='+teacher+'&api_key=ee4d30beaa7c590c551d364b26c7656c3e547717d7eaf3b035917b9d31faa472')
    this.films.subscribe(data => {
        currentInterest = data.resource[0].pupilInterest
        console.log(currentInterest)
        this.addToQueue(currentInterest, teacher)
      })
  }

  addToQueue(currentQueue, teacher) {
    console.log(currentQueue, teacher)
    currentQueue = currentQueue + 1;
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    })
    let bodyData = {
      "resource": [
        {
          "_id": teacher,
          "pupilInterest": currentQueue
        }
      ],
      "ids": [
        teacher
      ],
      "filter": "string",
      "params": [
        "string"
      ]
    }
    this.httpClient
      .patch('http://35.204.222.250/api/v2/db/_table/teachers?api_key=ee4d30beaa7c590c551d364b26c7656c3e547717d7eaf3b035917b9d31faa472', bodyData, {headers: headers})
      .subscribe((s) => {
        console.log(s);
      });
  }
  removeFromQueue(currentQueue, teacher) {
    console.log(currentQueue, teacher)
    currentQueue = currentQueue - 1;
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    })
    let bodyData = {
      "resource": [
        {
          "_id": teacher,
          "pupilInterest": currentQueue
        }
      ],
      "ids": [
        teacher
      ],
      "filter": "string",
      "params": [
        "string"
      ]
    }
    this.httpClient
      .patch('http://35.204.222.250/api/v2/db/_table/teachers?api_key=ee4d30beaa7c590c551d364b26c7656c3e547717d7eaf3b035917b9d31faa472', bodyData, {headers: headers})
      .subscribe((s) => {
        console.log(s);
      });
  }

  ngOnInit() {
  }

}
