import { Job } from '../types/job';

export const JOBS_DATA: Job[] = [
  {
    id: "JOB-001",
    title: "Paediatrician",
    slug: "paediatrician",
    location: "Auckland, NZ",
    type: "Full-time",
    department: "Paediatrics",
    postedDate: "2026-04-01",
    closingDate: "2026-05-15",
    salary: { min: 220000, max: 280000, currency: "NZD" },
    description: "<p>We are seeking a Consultant Paediatrician to join our multidisciplinary team delivering specialist child health services across the Auckland region. You will provide expert assessment, diagnosis, and management for a broad range of paediatric conditions, and contribute to clinical governance and teaching.</p>",
    requirements: [
      "Fellowship of the Royal Australasian College of Physicians (FRACP) or equivalent",
      "Vocational registration with the Medical Council of New Zealand",
      "Demonstrated experience in general paediatrics or a paediatric subspecialty"
    ]
  }
];