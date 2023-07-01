import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { mongoURI } from './mongoURI';

@Module({
  imports: [
    MongooseModule.forRoot(mongoURI),
  ],
})
export class DatabaseModule {}
