// import {hasMany, model, property} from '@loopback/repository'
import { hasMany, model, property } from '@loopback/repository'
import {SoftDeleteEntity} from '../mixins'
import {PictureAnswer} from './picture-answer.model'

@model()
export class UserAnswer extends SoftDeleteEntity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number

  @property({
    type: 'number',
  })
  farmer_to_company_id?: number

  @property({
    type: 'number',
    required: true,
  })
  field_crop_id?: number

  @property({
    type: 'string',
  })
  farmer_id?: string

  @property({
    type: 'array',
    itemType: 'number',
  })
  answer_id?: number[]

  @property({
    type: 'number',
  })
  question_id?: number

  @property({
    type: 'number',
  })
  activity_id?: number

  @property({
    type: 'string',
  })
  answer?: string

  @property({
    type: 'string',
  })
  hash?: string

  @property({type: 'array', itemType: 'string'})
  picture_answer_keys?: string[]

  @hasMany(() => PictureAnswer, {keyTo: 'user_answer_id'})
  pictureAnswers?: PictureAnswer[]

  constructor(data?: Partial<UserAnswer>) {
    super(data)
  }
}

export interface UserAnswerRelations {
  // describe navigational properties here
}

export type UserAnswerWithRelations = UserAnswer & UserAnswerRelations
