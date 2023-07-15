import { WorkDetailModel } from '../../models/work';
import StudentController from '../student/controller';
import { BasicWorkAttributes, WorkAttributes } from './interface';

export default class WorkDetailController {
  static async create_work_detail(
    doc: BasicWorkAttributes
  ): Promise<WorkAttributes> {
    const { type, description, salary, status, duration, student_id } = doc;

    const check_student = await StudentController.get_user_by_id(student_id);
    if (!check_student) throw new Error('Сурагчийн мэдээлэл олдсонгүй');

    const work_detail = await WorkDetailModel.create({
      type,
      description,
      salary,
      status,
      duration,
      student_id
    });

    return work_detail;
  }
}
