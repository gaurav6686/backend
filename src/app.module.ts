import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentSchema } from './dto/studentdatas';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule } from 'database/database.module';

@Module({
  imports: [
    DatabaseModule,
    MongooseModule.forFeature([{ name: 'books', schema: StudentSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
