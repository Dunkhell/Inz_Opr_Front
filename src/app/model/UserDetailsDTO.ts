import { VisitsDto } from './VisitDTO';

export interface UserDetailsDTO {
  city: string;
  contactPhone: string;
  country: string;
  dateOfBirth: string;
  firstName: string;
  gender: string;
  id: number;
  isVaccinated: boolean;
  lastName: string;
  otherNames: string;
  street: string;
  visitsDto: VisitsDto[];
}