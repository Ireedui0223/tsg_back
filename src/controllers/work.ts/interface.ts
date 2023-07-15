export interface BasicWorkAttributes {
  type: String;
  description: String;
  salary: Number;
  status: String;
  duration: String;
  student_id: String;
}

export interface WorkAttributes extends BasicWorkAttributes {
  work_detail_id: String;

  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}
