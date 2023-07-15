import bcrypt from 'bcrypt';
import sha256 from 'sha256';
import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';

dotenv.config();

const { JWT_TOKEN_SALT } = process.env;

import { StudentModel } from '../../models/student';
import { WorkDetailModel } from '../../models/work';

import {
  BasicUserAttributes,
  LoginAttributes,
  LoginResponse,
  StudentAttributes
} from './interface';

export default class StudentController {
  static async get_student_by_email(
    email,
    pass_option = false
  ): Promise<StudentAttributes> {
    let student;
    if (!pass_option) {
      student = await StudentModel.findOne({
        where: { email },
        raw: true,
        nest: true
      });
    } else {
      student = await StudentModel.scope('withPassword').findOne({
        where: { email },
        raw: true,
        nest: true
      });
    }

    return student;
  }

  static async get_user_by_id(id: String): Promise<StudentAttributes | null> {
    const student = await StudentModel.findOne({ where: { student_id: id } });
    return student;
  }

  static async generate_jwt_token(student: StudentAttributes) {
    return jwt.sign(student, JWT_TOKEN_SALT);
  }

  static async create_student(
    doc: BasicUserAttributes
  ): Promise<StudentAttributes> {
    const {
      username,
      email,
      password,
      work_exp,
      phone_number,
      cover_image,
      profile_image
    } = doc;

    const existed_user = await this.get_student_by_email(email);
    if (existed_user) throw new Error('Ашиглагдсан мэйл хаяг байна!');

    const created_user = await StudentModel.create({
      username,
      email,
      password,
      work_exp,
      phone_number,
      cover_image,
      profile_image
    });

    return created_user;
  }

  static async student_login(doc: LoginAttributes): Promise<LoginResponse> {
    const { email, password } = doc;

    const student = await this.get_student_by_email(email, true);
    if (!student) throw new Error('Бүртгэлтэй хэрэглэгч байхгүй байна!');

    const match = await bcrypt.compare(sha256(password), student.password);
    if (!match) throw new Error('Нууц үг буруу байна!');

    const token = await this.generate_jwt_token(student);
    return { student, token };
  }

  static async get_student_works(doc): Promise<any> {
    const { student_id } = doc;
    const user_works = await StudentModel.findAll({
      include: {
        model: WorkDetailModel,
        as: 'student_works',
        where: {
          student_id
        },
        attributes: { exclude: ['student_id'] }
      }
    });
    return user_works;
  }
}
