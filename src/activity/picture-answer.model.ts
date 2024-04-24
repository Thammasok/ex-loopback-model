import { belongsTo, model, property } from '@loopback/repository'
import { SoftDeleteEntity } from '../mixins'
import { UserAnswer } from './user-answer.model'

@model()
export class PictureAnswer extends SoftDeleteEntity {
  @property({
    type: 'number',
    id: true,
    generated: true
  })
  id?: number

  @property({
    type: 'number'
  })
  field_crop_id?: number

  @property({
    type: 'number'
  })
  farmer_to_company_id?: number

  @property({
    type: 'string'
  })
  farmer_id?: string

  @property({
    type: 'string'
  })
  picture_key?: string

  @belongsTo(() => UserAnswer, { name: 'userAnswer' })
  user_answer_id?: number

  constructor(data?: Partial<PictureAnswer>) {
    super(data)
  }
}

export interface PictureAnswerRelations {
  // describe navigational properties here
}

export type PictureAnswerWithRelations = PictureAnswer & PictureAnswerRelations
