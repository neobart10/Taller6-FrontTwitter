
export class User {
    constructor(public idUser: number, public username: string, public pass: string, public creation_date: Date ) {
    }

    static fromJson(json): User {
      return new User(json.idUser, json.username, json.pass, new Date(json.creation_date)
    );
  }
}
