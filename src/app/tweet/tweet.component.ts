import { Component, OnInit } from '@angular/core';
import {Tweet} from '../models/tweet.model';
import * as moment from 'moment';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css']
})
export class TweetComponent implements OnInit {

  listTweets = [];
  author: string;
  user: string;
  tweetText: string;

  constructor() {
    this.author = 'Dixon Medina';
    this.user = 'neobart10';
  }

  ngOnInit(): void {
  }

  addTweet(){
     console.log(this.user);
     this.listTweets.push(new Tweet(this.tweetText, this.author, this.user));
     console.log(this.listTweets);
     this.tweetText = '';
  }

  getTimeNow(createdDate){
    const now = new Date();
    return moment(createdDate, 'YYYYMMDD').fromNow();
  }
}
