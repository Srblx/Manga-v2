export interface NewsModel {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  createdAt: string;
  user: {
    firstname: string;
    lastname: string;
  };
  isliked: LikesModel;
}

export interface AddNewsForm {
  title?: string;
  content?: string;
  imageUrl?: string;
}

export interface LikesModel {
  id: string;
  user: UserModel;
  news: NewsModel;
}

interface UserModel {
  id: string;
}

export interface UpdateNewsForm {
  title?: string;
  content?: string;
  imageUrl?: string;
  updatedAt?: Date;
}
