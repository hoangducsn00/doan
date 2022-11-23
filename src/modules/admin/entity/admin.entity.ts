import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import * as bcrypt from 'bcrypt';

@Entity({
    name: 'admins',
})
export class Admin {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Expose()
    email: string;

    @Column()
    @Exclude()
    password: string;


    @BeforeInsert()
    async actionBeforeInsert(): Promise<void> {
        this.password = await bcrypt.hash(this.password, +process.env.SALT_ROUND);
    }
}
