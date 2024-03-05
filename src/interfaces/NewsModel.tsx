export interface NewsModel {
    _id: string;
    title: string;
    content: string;
    imageUrl: string;
    createdAt: string;
    // isLiked: boolean;
    user: {
      firstname: string;
      lastname: string;
    };
    isliked: LikesModel
  }

  export interface AddNewsForm {
    title?: string; 
    content?: string; 
    imageUrl?: string;
  }

  export interface LikesModel {
    _id: string;
    user: UserModel;
    news: NewsModel;
  }

  interface UserModel {
    _id: string;
  }

  