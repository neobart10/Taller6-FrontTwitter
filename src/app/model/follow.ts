
export class Follow {
    constructor(public id: number, public idUser: number, public idFollow: number, public createdAt: Date) {
    }

    static fromJson(json): Follow {
      return new Follow(json.id, json.idUser, json.idFollow, json.createdAt);
    }
}
