import {model, property} from '@loopback/repository'
import {SoftDeleteEntity} from '../mixins'

export enum EvaluationGradeResult {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
  None = 'None',
}
@model()
export class Timeline extends SoftDeleteEntity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number

  @property({
    type: 'number',
  })
  activity_id?: number

  @property({
    type: 'string',
    jsonSchema: {nullable: true},
  })
  farmer_id?: string | null

  @property({
    type: 'boolean',
    default: false,
  })
  is_answer?: boolean

  @property({
    type: 'number',
    jsonSchema: {nullable: true},
  })
  activity_filter_id?: number | null

  @property({
    type: 'number',
  })
  farmer_to_company_id?: number

  @property({
    type: 'number',
  })
  field_crop_id?: number

  @property({
    type: 'array',
    itemType: 'number',
  })
  user_answer_ids?: number[]

  @property({
    type: 'date',
    jsonSchema: {nullable: true},
  })
  max_date?: string | null

  @property({
    type: 'date',
    jsonSchema: {nullable: true},
  })
  best_date?: string | null

  @property({
    type: 'number',
  })
  coop_branch_id?: number

  @property({
    type: 'string',
    jsonSchema: {enum: Object.values(EvaluationGradeResult)},
  })
  evaluation_grade_result?: EvaluationGradeResult | null

  @property({
    type: 'number',
  })
  activity_group_id?: number

  constructor(data?: Partial<Timeline>) {
    super(data)
  }
}

export interface TimelineRelations {
  // describe navigational properties here
}

export type TimelineWithRelations = Timeline & TimelineRelations
