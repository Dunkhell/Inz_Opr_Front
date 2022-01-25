import { UserDetailsDTO } from 'src/app/model/UserDetailsDTO';
import { Facility } from './Facility';
import { Vaccine } from './Vaccine';

export interface VisitsDto {
  id: number;
  tookPlace: boolean;
  visitDate: string;
  visitDateTime: VisitDateTime;
  vaccine: Vaccine;
  facility: Facility;
  userDetails: UserDetailsDTO;
}

interface VisitDateTime {
  hour: number;
  minute: number;
  nano: number;
  second: number;
}