import { Unique, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

export class UserEntity extends BaseEntity {
  @Column()
  @Unique(['username'])
  public username: string;

  @Column({ nullable: true, readonly: false })
  public fullName: string;

  @Column()
  public password: string;

  @Column()
  public email: string;

  @Column()
  public phoneNumber: string;

  @Column()
  public address: string;
}
