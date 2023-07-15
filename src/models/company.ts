import bcrypt from 'bcrypt';
import sha256 from 'sha256';

import { DataTypes, Model } from 'sequelize';
import { CompanyAttributes } from '../controllers/company/interface';
import sequelize from '.';

const saltRounds = 14;
const salt = bcrypt.genSaltSync(saltRounds);

export class CompanyModel extends Model implements CompanyAttributes {
  public company_id!: String;
  public company_name!: String;
  public company_email!: String;
  public password!: String;
  public phone_number!: String;
  public rating!: Number;

  public readonly created_at!: Date;
  public readonly updated_at!: Date;
  public readonly deleted_at!: Date;
}

const hash_password = async (password) => {
  const hash_password = sha256(password);
  const bcrypt_password = bcrypt.hash(hash_password, salt);
  return bcrypt_password;
};

CompanyModel.init(
  {
    company_id: {
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      type: DataTypes.UUID,
      allowNull: false
    },
    company_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    company_email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    phone_number: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        len: [8, 20]
      }
    },
    rating: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false
    }
  },
  {
    sequelize: sequelize,
    paranoid: true,
    scopes: {
      withPassword: {
        attributes: {
          exclude: []
        }
      }
    },
    defaultScope: {
      attributes: {
        exclude: ['password']
      }
    },
    deletedAt: 'deleted_at'
  }
);

CompanyModel.beforeCreate(async (company) => {
  const hashedPassword = await hash_password(company.password);
  company.password = hashedPassword;
});
