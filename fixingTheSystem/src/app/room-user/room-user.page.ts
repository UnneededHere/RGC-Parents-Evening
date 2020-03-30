import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-room-user',
  templateUrl: './room-user.page.html',
  styleUrls: ['./room-user.page.scss'],
})
export class RoomUserPage implements OnInit {

  thisRoom = "W1-1"
  teachers = []
  films: Observable<any>;

  constructor(public httpClient: HttpClient) { 
  }

  ngOnInit() {
  }

}
