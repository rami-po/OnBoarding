import {RouterModule, Routes} from '@angular/router';
import {AdminFormComponent} from './admin-form/admin-form.component';
import {GithubSlackFormComponent} from "./user-hub/github-slack-form/github-slack-form.component";
import {EmergencyFormComponent} from "./user-hub/emergency-form/emergency-form.component";
import {PersonalFormComponent} from "./user-hub/personal-form/personal-form.component";
import {UserHubComponent} from "./user-hub/user-hub.component";
import {AdminLogInComponent} from "./admin-log-in/admin-log-in.component";
import {NotFoundComponent} from "./not-found/not-found.component";
import {AdminFormAuthGuard} from "./admin-form/admin-form.auth.guard";
import {UserHubAuthGuard} from "./user-hub/user-hub.auth.guard";
import {UserLogInComponent} from "./user-log-in/user-log-in.component";
import {MedicalFormComponent} from "./user-hub/medical-form/medical-form.component";
import {DentalFormComponent} from "./user-hub/dental-form/dental-form.component";
import {AdminConsoleComponent} from "./admin-console/admin-console.component";
import {AdminEmployeesComponent} from "./admin-employees/admin-employees.component";
import {WelcomeLetterComponent} from "./admin-form/welcome-letter/welcome-letter.component";
/**
 * Created by Rami Khadder on 7/17/2017.
 */
const APP_ROUTES: Routes = [
  {
    path: '',
    redirectTo: '/user/home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: UserLogInComponent
  },
  {
    path: 'admin',
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: AdminLogInComponent
      },
      {
        canActivate: [AdminFormAuthGuard],
        path: 'create',
        component: AdminFormComponent
      },
      {
        canActivate: [AdminFormAuthGuard],
        path: 'console',
        component: AdminConsoleComponent
      },
      {
        canActivate: [AdminFormAuthGuard],
        path: 'employees',
        component: AdminEmployeesComponent
      },
      {
        canActivate: [AdminFormAuthGuard],
        path: 'letter',
        component: WelcomeLetterComponent
      }
    ]
  },
  {
    path: 'user',
    children: [
      {
        path: '',
        component: UserHubComponent,
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: UserHubComponent
      },
      {
        canActivate: [UserHubAuthGuard],
        path: 'emergency',
        component: EmergencyFormComponent
      },
      {
        canActivate: [UserHubAuthGuard],
        path: 'personal',
        component: PersonalFormComponent
      },
      {
        canActivate: [UserHubAuthGuard],
        path: 'medical',
        component: MedicalFormComponent
      },
      {
        canActivate: [UserHubAuthGuard],
        path: 'dental',
        component: DentalFormComponent
      },
      {
        canActivate: [UserHubAuthGuard],
        path: 'join',
        children: [
          {
            path: '',
            redirectTo: 'github',
            pathMatch: 'full'
          },
          {
            path: 'github',
            component: GithubSlackFormComponent
          }
        ]
      }
    ]
  }
  ,
  {
    path: '404',
    component: NotFoundComponent
  },
  {
    path: '**',
    redirectTo: '/404'
  }
];

export const routing = RouterModule.forRoot(APP_ROUTES);
