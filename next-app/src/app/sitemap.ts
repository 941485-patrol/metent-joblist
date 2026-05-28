import { MetadataRoute } from 'next';
import { JOBS_DATA } from '../data/jobs';
import { Job } from '../types/job';

const BASE_URL = 'http://localhost:3000'; // I used localhost for fast prototyping for now.

export default function sitemap(): MetadataRoute.Sitemap {

    // Job listing index page.
    const staticRoutes: MetadataRoute.Sitemap = [
        {
            url: `${BASE_URL}`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1.0,
        }
    ];

    // Dyanmic job details page.
    const dynamicJobRoutes: MetadataRoute.Sitemap = JOBS_DATA.map((job: Job) => {
        return {
            url: `${BASE_URL}/jobs/${job.slug}`,
            lastModified: new Date(job.postedDate), // I used the data's posting date for the lastModified key.
            changeFrequency: 'weekly',
            priority: 0.8,
        };
    });


    return [...staticRoutes, ...dynamicJobRoutes];
}