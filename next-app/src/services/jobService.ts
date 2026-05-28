import { JOBS_DATA } from '../data/jobs';
import { Job } from '../types/job';

// This is just simulation for an actual service layer for fetching from a database...

export async function getAllJobs(): Promise<Job[]> {
    return [...JOBS_DATA];
}

export async function getJobBySlug(slug: string): Promise<Job | undefined> {
    return JOBS_DATA.find((job) => job.slug === slug);
}