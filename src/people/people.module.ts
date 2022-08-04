import { Module } from '@nestjs/common';
import { PeopleService } from './people.service';
import { PeopleController } from './people.controller';
import { UsersModule } from 'src/users/users.module';
import { People, PeopleSchema } from './schemas/people.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: People.name, schema: PeopleSchema }]),
    UsersModule,
  ],
  providers: [PeopleService],
  controllers: [PeopleController],
})
export class PeopleModule {}
