import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';
import { Filter } from 'mongodb';
import { Availability, SortingOrder, UsersListReq, UsersListRes } from './Model/UserListReq';
import { StudentData } from './dto/studentdatas';

@Injectable()
export class AppService {
  constructor(
    @InjectModel('books')
    private readonly studentDataModel: Model<StudentData>,
  ) {}
 
  //listing function

  public async getUsersList(req: UsersListReq): Promise<UsersListRes> {
    const filterConfig = this.getUsersListFilter(req) as FilterQuery<StudentData>;

    const items: Partial<StudentData>[] = await this.studentDataModel
      .find(filterConfig)
      .sort({ updatedAt: req.sortingOrder === SortingOrder.ASC ? 1 : -1 })
      .skip((req.page - 1) * req.size)
      .limit(req.size)
      .select('_id bookName authorName imageUrl read')
      .lean()
      .exec();

    const count = await this.studentDataModel.countDocuments(filterConfig).exec();

    return { count, items };
  } 

  private getUsersListFilter(req: UsersListReq): Filter<StudentData> {
    let filterConfig: Filter<StudentData> = {};

    if (req.availabilityStatus && req.availabilityStatus !== Availability.ALL) {
      filterConfig.isActive = req.availabilityStatus === Availability.AVAILABLE;
    }

    if (req.search && req.search.trim().length > 0) {
      req.search = req.search.trim();
      const orSearchConditions = [];
      const columnsToSearch = ['bookName', 'authorName', 'imageUrl','read'];
      for (const column of columnsToSearch) {
        orSearchConditions.push({
          [column]: {
            $regex: new RegExp(req.search, 'i'),
          },
        });
      }
      filterConfig.$or = orSearchConditions;
    }

    return filterConfig;
  }

}
