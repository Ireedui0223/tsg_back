export interface BasicCompanyAttributes {
  company_name: String;
  company_email: String;
  password: String;
  phone_number: String;
}

export interface CompanyAttributes extends BasicCompanyAttributes {
  company_id: String;
  rating: Number;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

export interface CompanyLoginAttributes {
  company_email: String;
  password: String;
}

export interface CompanyLoginResponse {
  company: CompanyAttributes;
  token: String;
}
