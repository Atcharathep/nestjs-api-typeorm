import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    roworder: number;

    @Column()
    userid: string;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column({ default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @Column({ default: null })
    updatedAt: Date;
}
