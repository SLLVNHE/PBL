import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {LoginComponent} from './views/login/login.component'
import {RegisterComponent}  from './views/register/register.component'
import {ResetPasswordComponent} from "./views/reset-password/reset-password.component"
import { Code404Component} from './shared/code404/code404.component'
import {AuthGuardService} from './services/auth-guard.service'
import {LayoutComponent} from './views/layout/layout.component'
import {CoursesComponent} from './views/courses/courses.component'
import {UserComponent} from './views/user/user.component'
import {SidebarComponent} from './shared/sidebar/sidebar.component'


import { UserInfoComponent } from './views/user/user-info/user-info.component'
import { UserAvatarComponent } from './views/user/user-avatar/user-avatar.component'
import { UserPasswordComponent } from './views/user/user-password/user-password.component'
import { UserRealnameComponent } from './views/user/user-realname/user-realname.component'
import { UserHomeComponent } from './views/user/user-home/user-home.component'
import {CoursesListComponent} from './views/courses/courses-list/courses-list.component'
import { UncoursesListComponent } from './views/courses/uncourses-list/uncourses-list.component'
import {StudentComponent} from './views/student/student.component'
import { CDetailsComponent } from './views/student/c-details/c-details.component'
import { CMemberComponent } from './views/student/c-member/c-member.component'
import { CPjListComponent } from './views/student/c-pj-list/c-pj-list.component'
import { CMylistComponent } from './views/student/c-mylist/c-mylist.component'
import { ProjectComponent } from './views/student/project/project.component'
import { PMemberComponent } from './views/student/project/p-member/p-member.component'
import { PDetailsComponent } from './views/student/project/p-details/p-details.component'
import { PGradesComponent } from './views/student/project/p-grades/p-grades.component'
import { PFilesComponent} from './views/student/project/p-files/p-files.component'
import { PDiscussionBoardComponent } from './views/student/project/p-discussion-board/p-discussion-board.component'
import { PMessageInboxComponent } from './views/student/project/p-message-inbox/p-message-inbox.component'
import { PAlltaskListComponent } from './views/student/project/p-alltask-list/p-alltask-list.component'
import { PMytaskListComponent } from './views/student/project/p-mytask-list/p-mytask-list.component'
import { PSeeTasksComponent } from './views/student/project/p-see-tasks/p-see-tasks.component'
import {TeacherComponent} from "./views/teacher/teacher.component"
import { TcoursesComponent } from "./views/teacher/tcourses/tcourses.component"
import { CreateCourseComponent } from "./views/teacher/create-course/create-course.component"
import {TincourseComponent} from "./views/teacher/tincourse/tincourse.component"
import { TcoursesListComponent } from "./views/courses/tcourses-list/tcourses-list.component"
import { TpjlistComponent } from "./views/teacher/tpjlist/tpjlist.component"
import { TcreatePjComponent } from "./views/teacher/tcreate-pj/tcreate-pj.component"
import { TinpjComponent } from "./views/teacher/tinpj/tinpj.component"
import { TselectLeaderComponent } from "./views/teacher/tselect-leader/tselect-leader.component"
import { TscoreComponent } from "./views/teacher/tscore/tscore.component"
import {IsmessageComponent} from "./views/student/project/ismessage/ismessage.component"
import {SeeMessageComponent} from "./views/student/project/see-message/see-message.component"
import { PScoreComponent } from "./views/student/project/p-score/p-score.component"
import {AdminComponent} from "./views/admin/admin.component"
import { ManageComponent } from "./views/admin/manage/manage.component"
import { ACreateComponent } from "./views/admin/a-create/a-create.component"
import { AListComponent} from "./views/admin/a-list/a-list.component"
import {AModifyComponent } from "./views/admin/a-modify/a-modify.component"
import {ASeemComponent } from "./views/admin/a-seem/a-seem.component"
import { PCompleteTaskComponent } from "./views/student/project/p-complete-task/p-complete-task.component"










const routes: Routes = [
  {
    path:'login',
    component: LoginComponent
  },
  // {
  //   path: 'scourses',
  //   component: LayoutComponent,
  //   canActivate: [AuthGuardService],
  //   children:[
  //     {
  //       path: '',
  //       component: CoursesComponent
  //     },
  //   ]

  // },
  {
    path: 'test',
    component: SidebarComponent
  },
  {
    path:"adminhome",
    component: AdminComponent,
    canActivate: [AuthGuardService],
    children:[
      {
        path:"",
        component: ManageComponent,
      },{
        path: "manage",
        component: ManageComponent,
        children:[
          {
            path:"",
            component: AListComponent
          }, {
            path: "alist",
            component: AListComponent
          }, {
            path: "acreate",
            component: ACreateComponent
          }, {
            path: "amodify",
            component: AModifyComponent
          }, {
            path: "aseem",
            component: ASeemComponent
          },
        ]
      }
    ]
  },
  {
    path: 'teacherhome',
    component: TeacherComponent,
    canActivate: [AuthGuardService],
    children:[
      {
        path:"tcourses",
        component: TcoursesComponent,
        children: [
          {
            path: "",
            component: TcoursesListComponent
          },
          {
            path: "courselist",
            component: TcoursesListComponent
          },
          {
            path:"creatc",
            component: CreateCourseComponent
          }

        ]

      },
      {
        path: 'teacherc',
        component: TincourseComponent,
        children: [
          {
            path: "",
            component: CDetailsComponent
          },
          {
            path: "details",
            component: CDetailsComponent
          },
          {
            path: "member",
            component: CMemberComponent
          },
          {
            path: "createpj",
            component: TcreatePjComponent
          },
          {
            path: "mypjlist",
            component: TpjlistComponent
          }

        ]
      }, {
        path: 'teacherp',
        component: TinpjComponent,
        children: [
          {
            path: "",
            component: PDetailsComponent
          },
          {
            path: "details",
            component: PDetailsComponent
          },
          {
            path: "member",
            component: TselectLeaderComponent
          },
          {
            path: "pjlist",
            component: PAlltaskListComponent
          },
          {
            path: "mypjlist",
            component: PMytaskListComponent
          },
          {
            path: "grades",
            component: TscoreComponent
          },
          {
            path: "files",
            component: PFilesComponent
          },
          {
            path: "board",
            component: PDiscussionBoardComponent
          },
          {
            path: "messagebox",
            component: PMessageInboxComponent
          },
          {
            path: "seetasks",
            component: PSeeTasksComponent
          }

        ]
      },
    ]
  },
  {
    path:'pblshome',
    component:LayoutComponent,
    canActivate:[AuthGuardService],
           children:[
            {
              path: '',
              component:CoursesComponent
            },
             {
               path: 'studentp',
               component: ProjectComponent,
               children: [
                 {
                   path: "",
                   component: PDetailsComponent
                 },
                 {
                   path: "details",
                   component: PDetailsComponent
                 },
                 {
                   path: "member",
                   component: PMemberComponent
                 },
                 {
                   path: "pjlist",
                   component: PAlltaskListComponent
                 },
                 {
                   path: "mypjlist",
                   component: PMytaskListComponent
                 },
                 {
                   path: "grades",
                   component: PGradesComponent
                 },
                 {
                   path: "files",
                   component: PFilesComponent
                 },
                 {
                   path: "board",
                   component: PDiscussionBoardComponent
                 },
                 {
                   path: "messagebox",
                   component: PMessageInboxComponent
                 },
                 {
                   path: "seetasks",
                   component: PSeeTasksComponent
                 }, {
                   path: "score",
                   component: PScoreComponent
                 },{
                   path:"complete",
                   component: PCompleteTaskComponent
                 }

               ]
             },
            {
              path: 'studentc',
              component: StudentComponent,
                  children: [
                    {
                      path: "",
                      component: CDetailsComponent
                    },
                    {
                      path: "details",
                      component: CDetailsComponent
                    },
                    {
                      path: "member",
                      component: CMemberComponent
                    },
                    {
                      path: "pjlist",
                      component: CPjListComponent
                    },
                    {
                      path: "mypjlist",
                      component: CMylistComponent
                    }

                  ]
            },
            {
              path:'scourses',
              component:CoursesComponent,
              children:[
               {
                 path:"",
                  component: UncoursesListComponent
               },
               {
                 path: "uncourselist",
                 component: UncoursesListComponent
               },
               {
                 path:"courselist",
                 component: CoursesListComponent
               }

              ]
          
            },
             {
               path: "messagebox",
               component: PMessageInboxComponent,
               children:[
                 {
                   path:'',
                   component: IsmessageComponent,
                 },
                 {
                   path: 'noread',
                   component: IsmessageComponent,
                 },
                 {
                   path:"seemessage",
                   component: SeeMessageComponent,
                 }
               ]
               
             },
            {
              path:'user',
              component:UserComponent,
                      children:[
                        {
                          path:'',
                          component: UserHomeComponent

                        },
                        {
                          path: 'userhome',
                          component: UserHomeComponent
                        },
                        {
                          path:'info',
                          component:UserInfoComponent
                        },
                        {
                          path: 'avatar',
                          component: UserAvatarComponent
                        },
                        {
                          path: 'psd',
                          component: UserPasswordComponent
                        },
                        {
                          path: 'real',
                          component: UserRealnameComponent
                        },

                      ]
            }
    ]
  }, 
  
  {
    path: 'register',
    component: RegisterComponent,
    // canActivate:[AuthGuardService],
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent
  },
  {
    path:'',
    redirectTo:'/login',
    pathMatch:'full'
  },
  { path: '**', component: Code404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuardService]
})
export class AppRoutingModule { }
