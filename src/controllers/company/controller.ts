import bcrypt from 'bcrypt';
import sha256 from 'sha256';
import jwt from 'jsonwebtoken';

import { CompanyModel } from '../../models/company';
import {
  BasicCompanyAttributes,
  CompanyAttributes,
  CompanyLoginAttributes,
  CompanyLoginResponse
} from './interface';

const { JWT_TOKEN_SALT } = process.env;

export default class CompanyController {
  static async generate_jwt_token(company: CompanyAttributes) {
    return jwt.sign(company, JWT_TOKEN_SALT);
  }

  static async get_company_by_email(
    company_email: String,
    pass_option = false
  ): Promise<CompanyAttributes | null> {
    let existed_company;
    if (pass_option) {
      existed_company = await CompanyModel.scope('withPassword').findOne({
        where: { company_email },
        raw: true,
        nest: true
      });
    } else {
      existed_company = await CompanyModel.findOne({
        where: { company_email },
        raw: true,
        nest: true
      });
    }

    return existed_company;
  }

  static async create_company(
    doc: BasicCompanyAttributes
  ): Promise<CompanyAttributes> {
    const { company_name, phone_number, password, company_email } = doc;

    const existed_company = await this.get_company_by_email(company_email);
    if (existed_company) throw new Error('Бүртгэлтэй компани байна');

    const created_company = await CompanyModel.create({
      company_name,
      phone_number,
      password,
      company_email
    });
    return created_company;
  }

  static async get_companies(): Promise<CompanyAttributes[]> {
    const companies = await CompanyModel.findAll();
    return companies;
  }

  static async login_company(
    doc: CompanyLoginAttributes
  ): Promise<CompanyLoginResponse> {
    const { company_email, password } = doc;

    const company = await this.get_company_by_email(company_email, true);

    if (!company) throw new Error('Бүртгэлтэй компани байхгүй байна');

    const match = await bcrypt.compare(sha256(password), company.password);
    if (!match) throw new Error('Нууц үг буруу байна!');

    const token = await this.generate_jwt_token(company);

    return { company, token };
  }
}
