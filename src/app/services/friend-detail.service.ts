import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable()
export class FriendDetailService {

  friend:any;
  constructor() {

  }

  public pushFriend(friend){
    this.friend=friend;
  }

  public getFriend(){
    return this.friend;
  }
}
