import { Injectable } from '@angular/core';
import { AmplifyService } from 'aws-amplify-angular';
import { Subject } from 'rxjs';
import { Hub } from 'aws-amplify';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public isLoggedin: boolean = false;
  public loggedInStatusChange: Subject<boolean> = new Subject<boolean>();
  public userDetails = null;


  constructor(private amplify: AmplifyService) {
    this.getUserDetails();
    this.loggedInStatusChange.subscribe((value) => {
      this.isLoggedin = value
    });


    Hub.listen('auth', (data) => {
      const { payload } = data;
      console.log('A new auth event has happened: ', data.payload.data.username + ' has ' + data.payload.event);
      this.onAuthEvent(payload);
    })

  }
  onAuthEvent(payload) {
    console.log("payload", payload);
    if (payload.event == "signIn") {
      this.getUserDetails();
    } else if (payload.event == "signOut") {
      this.loggedInStatusChange.next(false);
    }

  }
  private getUserDetails() {
    this.amplify.auth().currentAuthenticatedUser().then((user) => {
      this.userDetails = user;
      this.loggedInStatusChange.next(true);
    }).catch(e => {
      console.log(e);
      this.loggedInStatusChange.next(false);
    })
  }


  public isLoggedIn(){
    console.log(this.isLoggedin,"this.isLoggedIn");
    
    return this.isLoggedin;
  }

}
