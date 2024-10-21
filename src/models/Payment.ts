import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'payments',
  timestamps: true,
})
export class Payment extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email!: string;

  @Column({
    type: DataType.DOUBLE,
    allowNull: false,
  })
  amount!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  paymentReference!: string;
}
