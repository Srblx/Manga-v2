export interface NewsModel {
    _id: string;
    title: string;
    content: string;
    imageUrl: string;
    createdAt: string;
    user: {
      firstname: string;
      lastname: string;
    };
  }

  export interface AddNewsForm {
    title?: string; 
    content?: string; 
    imageUrl?: string;
  }