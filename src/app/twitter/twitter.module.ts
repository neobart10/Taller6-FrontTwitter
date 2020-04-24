import { NgModule } from '@angular/core';
import { TwitterComponent } from './twitter/twitter.component';
import {RouterModule, Routes} from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import {HttpClientModule} from '@angular/common/http';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import { HomeComponent } from './home/home.component';
import {TweetComponent} from './tweet/tweet.component';
import { MytweetsComponent } from './mytweets/mytweets.component';
import {BrowserModule} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import { FollowersComponent } from './followers/followers.component';
import { ProfileComponent } from './profile/profile.component';
import { MyProfileComponent } from './my-profile/my-profile.component';

const routes: Routes = [
  {path: '' ,  component: TwitterComponent,
   children : [
     {path: '', redirectTo: 'home', pathMatch: 'prefix'},
     {path: 'home', component: HomeComponent, pathMatch: 'full'},
     { path: 'tweet/:id', component: TweetComponent, pathMatch: 'full'},
     { path: 'mytweets/:id', component: MytweetsComponent, pathMatch: 'full'},
     { path: 'followers/:id', component: FollowersComponent, pathMatch: 'full'},
     { path: 'profile', component: ProfileComponent, pathMatch: 'full'},
     { path: 'my-profile/:id', component: MyProfileComponent, pathMatch: 'full'},
  ]}
];


@NgModule({
  declarations: [TwitterComponent, HomeComponent, MytweetsComponent, TweetComponent, FollowersComponent, ProfileComponent, MyProfileComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatIconModule,
    MatDividerModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TwitterModule { }
