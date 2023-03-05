import { DateTime } from 'luxon'

export enum PostType {
  ARTICLE = 'ARTICLE',
  VIDEO = 'VIDEO',
}

export enum PostDateType {
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
}
export interface NewArticle {
  title: string
  content_type: PostType
  content: string
  cover: string | null
  status: boolean
  url_path: string | { error: { field: string; message: string }[] }
  user_id: any
  updatedAt: null
}

export interface UpdateArticle {
  title: string
  content: string
  cover: string | null
  updatedAt: DateTime
  url_path: string | { error: { field: string; message: string }[] }
}

export interface NewVideo {
  title: string
  content_type: PostType
  content: string
  status: boolean
  url_path: string | { error: { field: string; message: string }[] }
  user_id: any
  updatedAt: null
}

export interface UpdateVideo {
  title: string
  content: string
  updatedAt: DateTime
  url_path: string | { error: { field: string; message: string }[] }
}
