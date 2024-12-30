import { Table, Column, Model, AllowNull, DataType } from 'sequelize-typescript';

@Table({
  timestamps: true
})


class Repo extends Model {
  @AllowNull(false)
  @Column(DataType.NUMBER)
  repo_id!: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  name!: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  desc?: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  url!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  main_language!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  creation_date!: string;

  @AllowNull(false)
  @Column(DataType.NUMBER)
  user_id!: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  user_login!: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  user_avatar?: string
}

export { Repo };