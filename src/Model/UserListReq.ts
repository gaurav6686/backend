import { IsString, IsInt, Min, Max, IsEnum, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { StudentData } from 'src/dto/studentdatas';


export enum SortingOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum Availability {
  AVAILABLE = 'AVAILABLE',
  UNAVAILABLE = 'UNAVAILABLE',
  ALL = 'ALL',
}

export class UsersListReq {
  @IsEnum(Availability)
  @Transform(({ value }) => value || Availability.ALL)
  @IsOptional()
  availabilityStatus: string;

  @IsString()
  @Transform(({ value }) => value || '')
  @IsOptional()
  search: string;

  @IsEnum(SortingOrder)
  @Transform(({ value }) => value || SortingOrder.DESC)
  sortingOrder: SortingOrder;

  @IsInt()
  @Min(1)
  @Transform(({ value }) => parseInt(value))
  page: number;

  @IsInt()
  @Min(1)
  @Max(100)
  @Transform(({ value }) => parseInt(value))
  size: number;
}

export class UsersListRes {
    count: number;
    items: Partial<StudentData>[];
  }
  