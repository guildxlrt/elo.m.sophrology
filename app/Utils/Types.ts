import { DateTime } from 'luxon'

export enum PostType {
  ARTICLE = 'ARTICLE',
  VIDEO = 'VIDEO',
}

export enum PostDateType {
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
}

export interface NewVideo {
  status: boolean
  user_id: any
  title: string
  content_type: PostType
  content: string
  updatedAt: null
}

export interface NewArticle {
  status: boolean
  user_id: any
  title: string
  content_type: PostType
  content: string
  cover: string | null
  updatedAt: null
}

export interface UpdateVideo {
  title: string
  content: string
  updatedAt: DateTime
}

export interface UpdateArticle {
  title: string
  content: string
  cover: string | null
  updatedAt: DateTime
}
