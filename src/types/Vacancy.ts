export type Vacancy = {
  id: number;
  title: string;
  company: number;
  companies?: {
    title: string,
    image: string,
    email: string,
  }
  location: string;
  salary: number;
  currency: string;
  job_type: string;
  experience_level: string;
  posted_date: string;
  deadline: string;
  remote: boolean;
  skills_required: string[];
  education_required: string;
  benefits: string[];
  contact_email: string;
  number_of_vacancies: number;
};
