import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-teacher-user',
  templateUrl: './teacher-user.page.html',
  styleUrls: ['./teacher-user.page.scss'],
})
export class TeacherUserPage implements OnInit {

  username: string;
  pupils = []
  films: Observable<any>

  constructor(public httpClient: HttpClient, private route: ActivatedRoute) {
    this.username = this.route.snapshot.paramMap.get('id');
    this.films = this.httpClient.get('http://35.204.222.250/api/v2/db/_table/appointments?filter=(teacherUser%20=%20%22' + this.username + '%22)&api_key=ee4d30beaa7c590c551d364b26c7656c3e547717d7eaf3b035917b9d31faa472');
    this.films.subscribe(data => {
      for (var i = 0; i < data.resource.length; i++) {
        this.pupils.push([data.resource[i].pupilName, data.resource[i]._id])
      }
    })
  }

  ngOnInit() {
  }

  removeFirstPupil(pupilID) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    })
    let bodyData = {
      "resource": [
        {
          "_id": pupilID[1],
        }
      ],
      "ids": [
        pupilID[1]
      ],
      "filter": "string",
      "params": [
        "string"
      ]
    }
    this.httpClient
      .request('delete', 'http://35.204.222.250/api/v2/db/_table/appointments?api_key=ee4d30beaa7c590c551d364b26c7656c3e547717d7eaf3b035917b9d31faa472', {
        body: bodyData,
        headers: headers
      })
      .subscribe((s) => {
        console.log(s);
      });
    console.log("Removing");
    this.pupils.splice(this.pupils.indexOf(pupilID), 1);
  }
}
