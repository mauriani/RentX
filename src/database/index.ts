import { Database } from "@nozbe/watermelondb";
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";

import { schemas } from "./schema";
import { User } from "./model/User";

const adapter = new SQLiteAdapter({
  schema: schemas,
});

export const database = new Database({
  adapter, // meu adaptador de conexão
  modelClasses: [User], // o meu modelo
});
