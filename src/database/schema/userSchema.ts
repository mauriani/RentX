// O schema -> e a representação da tabela de fato no banco
// Modelo -> é a representação do branco que tráfega entre banco e nossa aplicação
import { tableSchema } from "@nozbe/watermelondb";

const userSchema = tableSchema({
  name: "users",

  columns: [
    {
      name: "user_id",
      type: "string",
    },

    {
      name: "name",
      type: "string",
    },

    {
      name: "email",
      type: "string",
    },

    {
      name: "driver_license",
      type: "string",
    },

    {
      name: "avatar",
      type: "string",
    },

    {
      name: "token",
      type: "string",
    },
  ],
});

export { userSchema };
