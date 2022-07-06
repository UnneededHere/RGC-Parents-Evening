import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'mobile-user', loadChildren: './mobile-user/mobile-user.module#MobileUserPageModule' },
  { path: 'mobile-user/:id', loadChildren: './mobile-user/mobile-user.module#MobileUserPageModule' },
  { path: 'room-user', loadChildren: './room-user/room-user.module#RoomUserPageModule' },
  { path: 'teacher-user', loadChildren: './teacher-user/teacher-user.module#TeacherUserPageModule' },
  { path: 'teacher-user/:id', loadChildren: './teacher-user/teacher-user.module#TeacherUserPageModule' },
  { path: 'info', loadChildren: './info/info.module#InfoPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
