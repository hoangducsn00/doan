import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import * as bcrypt from 'bcrypt';

@Entity({
    name:'users'
})
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Expose()
    email: string;

    @Column()
    @Expose()
    username: string;

    @Column()
    @Exclude()
    password: string;

    @Column()
    @Exclude()
    role: number;

    @BeforeInsert()
    async actionBeforeInsert(): Promise<void> {
        this.password = await bcrypt.hash(this.password, +process.env.SALT_ROUND);
    }
}