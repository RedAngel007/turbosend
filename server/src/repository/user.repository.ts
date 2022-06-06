import { User } from '../entities/user.entity';
import { DB } from '../utils';
import "../extensions/string.extension";

export const UserRepository = DB.getRepository(User).extend({});

  