import { Model } from "@nozbe/watermelondb";
import { field } from "@nozbe/watermelondb/decorators";

class User extends Model {
  static table = "users"; // nome da tabela

  @field("user_id") // qual o nome do campo na tabela
  user_id!: string; // qual o nome que vou usar no meu modelo

  @field("name")
  name!: string;

  @field("email")
  email!: string;

  @field("driver_license")
  driver_license!: string;

  @field("avatar")
  avatar!: string;

  @field("token")
  token!: string;
}

export { User };
