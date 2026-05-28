import { getJobBySlug, getAllJobs } from '../services/jobService';

describe('Job Service Layer - Unit Tests', () => {

    it('should fetch all jobs from the data layer registry', async () => {
        const jobs = await getAllJobs();
        expect(Array.isArray(jobs)).toBe(true);
        expect(jobs.length).toBeGreaterThan(0);
    });

    it('should find and return a specific job matching a valid slug', async () => {
        const jobs = await getAllJobs();
        const sampleJob = jobs[0];

        const fetchedJob = await getJobBySlug(sampleJob.slug);

        expect(fetchedJob).toBeDefined();
        expect(fetchedJob?.id).toBe(sampleJob.id);
        expect(fetchedJob?.title).toBe(sampleJob.title);
    });

    it('should safely return undefined if a slug does not match any record', async () => {
        const invalidJob = await getJobBySlug('non-existent-medical-slug-xyz');
        expect(invalidJob).toBeUndefined();
    });
});