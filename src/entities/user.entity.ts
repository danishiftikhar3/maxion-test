// sample entity
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  JoinTable,
  ManyToMany,
} from "typeorm";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
    type: "varchar",
    length: 255,
  })
  uid: string;

  @Column({
    type: "varchar",
    length: 255,
  })
  email: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;
  
  @Column()
  photo_url: string;
  
  @Column()
  role: string;
 
  @Column()
  country: string;

  @Column()
  company_name: string;

  @Column()
  brand_logo: string;

  @Column()
  brand_color: string;

  @Column({
    type: "varchar",
    length: 255,
    nullable: true,
  })
  phone: string;

  @CreateDateColumn()
  public created_at: Date;

  @UpdateDateColumn()
  public updated_at: Date;

  // @ManyToMany(() => Region, (region) => region.users, { cascade: true })
  // @JoinTable({
  //   name: "user_favorite_regions",
  //   joinColumn: {
  //     name: "user_id",
  //     referencedColumnName: "id",
  //   },
  //   inverseJoinColumn: {
  //     name: "region_id",
  //     referencedColumnName: "id",
  //   },
  // })
  // favoriteRegions: Region[];
}
