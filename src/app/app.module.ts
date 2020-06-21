import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { DropdownModule } from 'primeng/dropdown';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './views/login/login.component';
import { ButtonModule } from 'primeng/button';
import { RegisterComponent } from './views/register/register.component';
import { ResetPasswordComponent } from './views/reset-password/reset-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {HttpRequestService} from './services/http-request.service'
import { StorageService} from './services/storage.service';
import { AuthInterceptorService} from './services/auth-interceptor.service';


import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { SlideMenuModule } from 'primeng/slidemenu';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FileUploadModule } from 'primeng/fileupload';
import { MessageService } from 'primeng/api';
import { ProgressBarModule } from 'primeng/progressbar';
import { CardModule } from 'primeng/card';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { RatingModule } from 'primeng/rating';
import { MultiSelectModule } from 'primeng/multiselect';
import { SliderModule } from 'primeng/slider';
import { DialogModule } from 'primeng/dialog';
import { FullCalendarModule } from 'primeng/fullcalendar';


import { Code404Component } from './shared/code404/code404.component';

import { NavbarComponent } from './shared/navbar/navbar.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { LayoutComponent } from './views/layout/layout.component';
import { CoursesComponent } from './views/courses/courses.component';
import { CoursesListComponent } from './views/courses/courses-list/courses-list.component';
import { UserComponent } from './views/user/user.component';
import { UserInfoComponent } from './views/user/user-info/user-info.component';
import { UserAvatarComponent } from './views/user/user-avatar/user-avatar.component';
import { UserPasswordComponent } from './views/user/user-password/user-password.component';
import { UserRealnameComponent } from './views/user/user-realname/user-realname.component';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
// import { SafeUrlPipe } from './pipes/safe-url.pipe';
import { UserHomeComponent } from './views/user/user-home/user-home.component';
import { UncoursesListComponent } from './views/courses/uncourses-list/uncourses-list.component';
import { StudentComponent } from './views/student/student.component';
import { CDetailsComponent } from './views/student/c-details/c-details.component';
import { CMemberComponent } from './views/student/c-member/c-member.component';
import { CPjListComponent } from './views/student/c-pj-list/c-pj-list.component';
import { CMylistComponent } from './views/student/c-mylist/c-mylist.component';
import { ProjectComponent } from './views/student/project/project.component';
import { PDetailsComponent } from './views/student/project/p-details/p-details.component';
import { PMemberComponent } from './views/student/project/p-member/p-member.component';
import { PGradesComponent } from './views/student/project/p-grades/p-grades.component';
import { PDiscussionBoardComponent } from './views/student/project/p-discussion-board/p-discussion-board.component';
import { PFilesComponent } from './views/student/project/p-files/p-files.component';
import { PAlltaskListComponent } from './views/student/project/p-alltask-list/p-alltask-list.component';
import { PMytaskListComponent } from './views/student/project/p-mytask-list/p-mytask-list.component';
import { PMessageInboxComponent } from './views/student/project/p-message-inbox/p-message-inbox.component';
import { PSeeTasksComponent } from './views/student/project/p-see-tasks/p-see-tasks.component';
import { TeacherComponent } from './views/teacher/teacher.component';
import { TnavberComponent } from './views/teacher/tnavber/tnavber.component';
import { TcoursesComponent } from './views/teacher/tcourses/tcourses.component';
import { TcoursesListComponent } from './views/courses/tcourses-list/tcourses-list.component';
import { CreateCourseComponent } from './views/teacher/create-course/create-course.component';
import { TincourseComponent } from './views/teacher/tincourse/tincourse.component';
import { TpjlistComponent } from './views/teacher/tpjlist/tpjlist.component';
import { TcreatePjComponent } from './views/teacher/tcreate-pj/tcreate-pj.component';
import { TinpjComponent } from './views/teacher/tinpj/tinpj.component';
import { TselectLeaderComponent } from './views/teacher/tselect-leader/tselect-leader.component';
import { TscoreComponent } from './views/teacher/tscore/tscore.component';
import { IsmessageComponent } from './views/student/project/ismessage/ismessage.component';
import { SeeMessageComponent } from './views/student/project/see-message/see-message.component';
import { PScoreComponent } from './views/student/project/p-score/p-score.component';
import { AdminComponent } from './views/admin/admin.component';
import { AnavbarComponent } from './views/admin/anavbar/anavbar.component';
import { ManageComponent } from './views/admin/manage/manage.component';
import { ACreateComponent } from './views/admin/a-create/a-create.component';
import { AListComponent } from './views/admin/a-list/a-list.component';
import { ASeemComponent } from './views/admin/a-seem/a-seem.component';
import { AModifyComponent } from './views/admin/a-modify/a-modify.component';
import { PCompleteTaskComponent } from './views/student/project/p-complete-task/p-complete-task.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ResetPasswordComponent,
    Code404Component,
    NavbarComponent,
    SidebarComponent,
    LayoutComponent,
    CoursesComponent,
    CoursesListComponent,
    UserComponent,
    UserInfoComponent,
    UserAvatarComponent,
    UserPasswordComponent,
    UserRealnameComponent,
    // SafeUrlPipe,
    UserHomeComponent,
    UncoursesListComponent,
    StudentComponent,
    CDetailsComponent,
    CMemberComponent,
    CPjListComponent,
    CMylistComponent,
    ProjectComponent,
    PDetailsComponent,
    PMemberComponent,
    PGradesComponent,
    PDiscussionBoardComponent,
    PFilesComponent,
    PAlltaskListComponent,
    PMytaskListComponent,
    PMessageInboxComponent,
    PSeeTasksComponent,
    TeacherComponent,
    TnavberComponent,
    TcoursesComponent,
    TcoursesListComponent,
    CreateCourseComponent,
    TincourseComponent,
    TpjlistComponent,
    TcreatePjComponent,
    TinpjComponent,
    TselectLeaderComponent,
    TscoreComponent,
    IsmessageComponent,
    SeeMessageComponent,
    PScoreComponent,
    AdminComponent,
    AnavbarComponent,
    ManageComponent,
    ACreateComponent,
    AListComponent,
    ASeemComponent,
    AModifyComponent,
    PCompleteTaskComponent,
   
   
   
  
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DropdownModule,
    FormsModule,
    BrowserAnimationsModule,
    ButtonModule,
    ReactiveFormsModule,
    HttpClientModule,
    ConfirmDialogModule,
    MenubarModule,
    SlideMenuModule,
    CalendarModule,
    InputTextareaModule,
    RadioButtonModule,
    FileUploadModule,
    CardModule,
    PaginatorModule,
    TableModule,
    RatingModule,
    MultiSelectModule,
    SliderModule,
    DialogModule,
    FullCalendarModule
   
  ],
  providers: [
    HttpRequestService,
    StorageService,
    ConfirmationService,
    MessageService,
    { provide: LocationStrategy, useClass: HashLocationStrategy, },
   
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
