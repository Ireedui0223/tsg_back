export interface BasicUserAttributes {
  username: String;
  email: String;
  password: String;
  work_exp: Number;
  phone_number: Number;
  cover_image: String;
  profile_image: String;
  work_detail: String;
}

export interface StudentAttributes extends BasicUserAttributes {
  student_id: String;

  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

export interface LoginAttributes {
  email: String;
  password: String;
}

export interface LoginResponse {
  student: StudentAttributes;
  token: String;
}
