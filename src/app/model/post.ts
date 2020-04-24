export class Post {
    constructor(public idPost: number, public message: string, public createdAt: Date, public idUser: number ) {
    }

    static fromJson(json): Post {
      return new Post(json.idPost, json.message, json.createdAt, json.idUser
    );
  }
}
