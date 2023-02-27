export enum PostType {
  ARTICLE = 'ARTICLE',
  VIDEO = 'VIDEO',
}

export interface NewPost {
  status: boolean
  user_id: any
  title: string
  content_type: PostType
  content: string
}

export interface UpdateVideo {
  title: string
  content: string
}
