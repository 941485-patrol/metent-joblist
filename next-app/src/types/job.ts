export interface Salary {
  min: number;
  max: number;
  currency: string;
}

export interface Job {
  id: string;
  title: string;
  slug: string;
  location: string;
  type: string;
  department: string;
  postedDate: string;
  closingDate: string;
  salary: Salary;
  description: string;
  requirements: string[];
}