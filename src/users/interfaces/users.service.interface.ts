import { UserById } from './user-by-id.interface';
import { User } from './user.interface';

interface UsersService {
  findOne(data: UserById): Promise<User>;
}
export default UsersService;
