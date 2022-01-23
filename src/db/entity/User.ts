import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
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
