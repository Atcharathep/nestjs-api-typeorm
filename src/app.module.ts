import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot({
      type: "postgres", // ประเภทของฐานข้อมูล
      host: "192.168.65.19", // ชื่อโฮสต์
      port: 5432, // พอร์ต
      username: "postgres", // ชื่อผู้ใช้งานของ Postgres
      password: "sml", // รหัสผ่านของ Postgres
      database: "ubontest", // ชื่อฐานข้อมูล
      entities: [User], // กำหนด entities ที่จะใช้งานในโมดูล
      synchronize: true, // ให้ TypeORM ทำการ sync โมเดลกับฐานข้อมูลโดยอัตโนมัติ
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
