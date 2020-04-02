export class Tweet{
  id: number;
  text: string;
  author: string;
  username: string;
  createdDate: Date;

  constructor(text: string, author: string, username: string){
    this.text = text;
    this.author = author;
    this.username = username;
    this.createdDate = new Date();
  }
}


