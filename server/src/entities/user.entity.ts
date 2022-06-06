import { Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn, } from "typeorm";
import { Length, IsString } from 'class-validator';
import bcrypt from 'bcryptjs';

@Entity("users")
@Unique(["userName"])
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  @Length(4, 20)
  firstName: string;

  @Column()
  @IsString()
  @Length(10, 50)
  email: string;

  @Column()
  lastName: string;


  @Column()
  userName: string;

  @Column()
  @IsString()
  @Length(4, 100)
  password: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  role: string;

  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8)
  }

  checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }
}