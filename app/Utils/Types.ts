export enum PostType {
  ARTICLE = 'ARTICLE',
  VIDEO = 'VIDEO',
}

export interface NewVideo {
  status: boolean
  user_id: any
  title: string
  content_type: PostType
  content: string
}

export interface NewArticle {
  status: boolean
  user_id: any
  title: string
  content_type: PostType
  content: string
  cover: string | null
}

export interface UpdateVideo {
  title: string
  content: string
}

export interface UpdateArticle {
  title: string
  content: string
  cover: string | null
}
