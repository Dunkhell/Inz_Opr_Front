import { VisitsDto } from './VisitDTO';
import { UserDetailsDTO } from './UserDetailsDTO';

export interface User {
  applicationUserRole: string;
  email: string;
  id: number;
  password: string;
  userDetailsDTO: UserDetailsDTO;
  username: string;
  visitsDto: VisitsDto;
}