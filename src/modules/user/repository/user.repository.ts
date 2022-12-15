import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { SearchDto } from '../dto/search.dto';

@Injectable()
export class UserRepository extends Repository<User>{
    constructor(private dataSource: DataSource) {
        super(User, dataSource.createEntityManager());
    }

    async  getAllUser(option :SearchDto){
        const query = this.createQueryBuilder()
        if(option.search){
            console.log(option.search);
            query.where('email LIKE :email',{email:`%${option.search}%`})
        }
        query.orderBy('email','DESC')
        return  query.getMany();
    }

}