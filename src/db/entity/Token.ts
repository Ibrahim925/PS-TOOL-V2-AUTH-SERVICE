import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class Token extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	token: string;
}
