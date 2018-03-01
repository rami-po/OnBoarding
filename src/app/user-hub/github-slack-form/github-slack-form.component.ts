import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AdminFormService} from "../../admin-form/admin-form.service";
import {User} from '../../admin-form/user.model';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {GithubSlackFormService} from "./github-slack-form.service";
import {StatusMessageDialogComponent} from "../../status-message/status-message.component";
import {MatDialog} from "@angular/material";

@Component({
  selector: 'app-github-slack-form',
  templateUrl: './github-slack-form.component.html',
  styleUrls: ['./github-slack-form.component.scss'],
  providers: [GithubSlackFormService]
})
export class GithubSlackFormComponent implements OnInit {
  public githubForm: FormGroup;
  public slackForm: FormGroup;
  private username: string;
  public hasGithub: boolean;
  public hasSlack: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private githubSlackFormService: GithubSlackFormService,
    private dialog: MatDialog) { }

    onSubmitGithub(){
      if (this.githubForm.valid){
        this.username = this.githubForm.value.username;
        this.githubSlackFormService.sendGithubInvite(this.username)
          .subscribe(
            function(response){
              this.openDialog(true, response.title, response.message);
              localStorage.setItem('github', '{"created":"true"}');
              this.router.navigate(['user']);
            }.bind(this),
            function(err){
              this.openDialog(false, err.title, err.message);
            }.bind(this)
          );
      }
    }

  onSubmitSlack(){
      console.log("TEST");

    if (this.slackForm.valid){
      this.username = this.slackForm.value.username;
      console.log(this.username);
      /*
            this.githubSlackFormService.sendGithubInvite(this.username)
              .subscribe(
                function(res){

                },
                function(err){

          }
        );*/
    }
  }

  openDialog(isSuccessful, title, message){
    const dialog = this.dialog.open(StatusMessageDialogComponent);
    if (isSuccessful){
      dialog.componentInstance.title = 'Success!';
      dialog.componentInstance.success = true;
    } else {
      dialog.componentInstance.title = 'Error!';
      dialog.componentInstance.error = true;
    }
    dialog.componentInstance.messages = [title, message];
  }

    ngOnInit() {
      if (!JSON.parse(localStorage.getItem('userData')).hasGithub){
        this.router.navigate(['/404']);
      }


      this.githubForm = new FormGroup({
        username: new FormControl(null, Validators.required)
      });

      this.slackForm = new FormGroup({
        username: new FormControl(null, Validators.required)
      });

    }

}
