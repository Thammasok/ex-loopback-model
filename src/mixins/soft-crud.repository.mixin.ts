import {
  DataObject,
  DefaultCrudRepository,
  Entity,
  Filter,
  juggler,
  Options,
  property,
  Where
} from '@loopback/repository'
import { Count } from 'loopback-datasource-juggler'

require('dotenv').config()
const moment = require('moment-timezone')

export class SoftDeleteEntity extends Entity {
  @property({
    type: 'string',
    default: 'system',
    
  })
  create_by?: string
  @property({
    type: 'date'
  })
  created_date?: string
  @property({
    type: 'date'
  })
  updated_date?: string
  @property({
    type: 'boolean',
    default: false
  })
  deleted?: boolean
}

export class SoftCrudRepository<
  T extends SoftDeleteEntity,
  ID,
  Relations extends Object
> extends DefaultCrudRepository<T, ID, Relations> {
  constructor(
    public entityClass: typeof Entity & { prototype: T },
    public dataSource: juggler.DataSource
  ) {
    super(entityClass, dataSource)
  }

  async create(entity: DataObject<T>, options?: Options): Promise<T> {
    const currentDate = moment().utc().format(process.env.GLOBAL_TIMEZONE)
    entity.created_date = currentDate
    entity.updated_date = currentDate
    return super.create(entity, options)
  }

  async createAll(entities: DataObject<T>[], options?: Options): Promise<T[]> {
    const currentDate = moment().utc().format(process.env.GLOBAL_TIMEZONE)
    entities.forEach((val) => {
      val.created_date = currentDate
      val.updated_date = currentDate
    })
    return super.createAll(entities, options)
  }

  async find(
    filter?: Filter<T>,
    options?: Options
  ): Promise<(T & Relations)[]> {
    filter = filter ?? {}
    filter.where = filter.where ?? {}
    if (!(filter?.where as any)?.deleted) {
      ;(filter?.where as any).deleted = { eq: false }
    }
    return super.find(filter, options)
  }

  async findAll(
    filter?: Filter<T>,
    options?: Options
  ): Promise<(T & Relations)[]> {
    // Now call super
    return super.find(filter, options)
  }

  async updateAll(
    data: DataObject<T>,
    where?: Where<T>,
    options?: Options
  ): Promise<Count> {
    if (!data.updated_date) {
      // If updated_date wasn't given, then set the updated_date.
      // Otherwise, use the given updated_date.
      data.updated_date = moment().utc().format(process.env.GLOBAL_TIMEZONE)
    }
    return super.updateAll(data, where, options)
  }

  async replaceById(
    id: ID,
    data: DataObject<T>,
    options?: Options
  ): Promise<void> {
    data.updated_date = moment().utc().format(process.env.GLOBAL_TIMEZONE)
    return super.replaceById(id, data, options)
  }

  async delete(entity: T, options?: Options): Promise<void> {
    // Do soft delete, no hard delete allowed
    ;(entity as any).deleted = true
    ;(entity as any).updated_date = moment()
      .utc()
      .format(process.env.GLOBAL_TIMEZONE)
    return super.update(entity, options)
  }

  async deleteAll(where?: Where<T>, options?: Options): Promise<Count> {
    // Do soft delete, no hard delete allowed
    return this.updateAll(
      {
        deleted: true
      } as DataObject<T>,
      where,
      options
    )
  }

  async deleteById(id: ID, options?: Options): Promise<void> {
    // Do soft delete, no hard delete allowed
    return super.updateById(
      id,
      {
        deleted: true,
        updated_date: moment().utc().format(process.env.GLOBAL_TIMEZONE)
      } as any,
      options
    )
  }

  async deleteAllHard(where?: Where<T>, options?: Options): Promise<Count> {
    // Do hard delete
    return super.deleteAll(where, options)
  }

  async deleteByIdHard(id: ID, options?: Options): Promise<void> {
    // Do hard delete
    return super.deleteById(id, options)
  }

  async updateById(
    id: ID,
    data: DataObject<T>,
    options?: Options
  ): Promise<void> {
    if (!data.updated_date) {
      // If updated_date wasn't given, then set the updated_date.
      // Otherwise, use the given updated_date.
      data.updated_date = moment().utc().format(process.env.GLOBAL_TIMEZONE)
    }
    return super.updateById(id, data, options)
  }
}
