import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogComponent } from 'src/app/share/dialog/dialog.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  menu = { main: false, child: false }
  userData;
  constructor(
    private router: Router,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  mainOver(){
    this.menu.main = true;
    //console.log('mainOver', this.menu);
  }
  mainOut(){
    this.menu.main = false;
    //console.log('mainOut', this.menu);
  }
  childOver(){
    this.menu.main = false;
    this.menu.child = true;
    //console.log('childOver', this.menu);
  }
  childOut(){
    this.menu.child = false;
    //console.log('childOut', this.menu);
  }

  openDialog(_html) {
    let dialogRef = this.dialog.open(DialogComponent, {
        data: {
          html: _html,
        }
    });
    setTimeout(() => {
      dialogRef.close();
    }, 2000);
  }
  logout(){
    sessionStorage.removeItem("user-data");
    let _html=`
      <div class="c-red">
        <div class="material-icons">task_alt</div>
        <h1>Logout Success!</h1>
      </div>`;
    this.openDialog(_html);
    this.router.navigate(["home"]);
  }

  get user(){
    if(sessionStorage.getItem("user-data")){
      this.userData = JSON.parse(sessionStorage.getItem("user-data"));
    }
    return this.userData? this.userData: false;
  }


}
