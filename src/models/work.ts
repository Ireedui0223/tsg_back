import { DataTypes, Model } from 'sequelize';
import { WorkAttributes } from '../controllers/work.ts/interface';
import sequelize from '.';

export class WorkDetailModel extends Model implements WorkAttributes {
  public work_detail_id!: String;
  public type!: String;
  public description!: String;
  public salary!: Number;
  public status!: String;
  public duration!: String;
  public student_id!: String;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

WorkDetailModel.init(
  {
    work_detail_id: {
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      type: DataTypes.UUID,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    salary: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    duration: {
      type: DataTypes.STRING(30),
      allowNull: false
    }
  },
  {
    sequelize: sequelize,
    paranoid: true,
    deletedAt: 'deleted_at'
  }
);
