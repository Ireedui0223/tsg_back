import bcrypt from 'bcrypt';
import sha256 from 'sha256';
import { DataTypes, Model } from 'sequelize';
import { StudentAttributes } from '../controllers/student/interface';
import sequelize from '.';
import { WorkDetailModel } from './work';

const saltRounds = 14;
const salt = bcrypt.genSaltSync(saltRounds);

export class StudentModel extends Model implements StudentAttributes {
  public student_id!: String;
  public username!: String;
  public email!: String;
  public password!: String;
  public work_exp!: Number;
  public phone_number!: Number;
  public cover_image!: String;
  public profile_image!: String;
  public work_detail!: String;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

const hash_password = async (password) => {
  const hash_password = sha256(password);
  const bcrypt_password = bcrypt.hash(hash_password, salt);
  return bcrypt_password;
};

StudentModel.init(
  {
    student_id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(50),
      validate: {
        isEmail: { msg: 'Мэйл хаяг буруу байна' },
        len: [10, 50]
      },
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        len: {
          args: [8, 100],
          msg: '8-с дээш утга оруулна уу'
        },
        is: {
          args: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,}$/,
          msg: 'Нууц үгний шаардлага хангахгүй байна.'
        }
      }
    },
    work_exp: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false
    },
    phone_number: {
      type: DataTypes.STRING(8),
      validate: {
        len: [8, 8]
      },
      allowNull: false
    },
    cover_image: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    profile_image: {
      type: DataTypes.STRING(100),
      allowNull: true
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

StudentModel.beforeCreate(async (student) => {
  const hashedPassword = await hash_password(student.password);
  student.password = hashedPassword;
});

StudentModel.hasMany(WorkDetailModel, {
  foreignKey: {
    allowNull: false,
    name: 'student_id'
  },
  as: 'student_works'
});
