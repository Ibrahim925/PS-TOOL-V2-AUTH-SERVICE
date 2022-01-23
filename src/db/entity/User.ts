import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class User extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	userEmail: string;

	@Column()
	userPassword: string;

	@Column()
	userProject: string;

	@Column()
	userType: "ADMIN" | "CUSTOMER";
}
