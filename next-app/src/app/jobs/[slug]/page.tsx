// Server component.

import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { JOBS_DATA } from '../../../data/jobs';
import { dateFormatter } from "../../../util/dateformatter";
import ApplyButton from "../../../components/applyNowButton";
import JobNotFound from '../../../components/jobNotFound';
JobNotFound


interface Props {
    params: Promise<{ slug: string }>; // In modern Next.js App Router, params is a Promise
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const job = JOBS_DATA.find((j) => j.slug === slug);

    if (!job) {
        return {
            title: 'Job Not Found',
            robots: 'noindex, follow', // For indexing in SEO
        };
    }

    const cleanSnippet = job.description.replace(/<[^>]*>/g, '').substring(0, 150) + '...';

    return {
        title: `${job.title} - ${job.department} Role`,
        description: cleanSnippet,
        alternates: {
            canonical: `http://localhost:3000/jobs/${job.slug}`,
        },
        openGraph: {
            title: `${job.title} Position Available`,
            description: cleanSnippet,
            url: `http://localhost:3000/jobs/${job.slug}`,
            type: 'article',
        },
    };
}


export default async function JobDetailPage({ params }: Props): Promise<React.JSX.Element> {
    const { slug } = await params;
    const job = JOBS_DATA.find((j) => j.slug === slug);

    if (!job) {
        notFound();
    }

    return (
        <main style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px', fontFamily: 'sans-serif' }}>

            <Link href="/" style={{ color: '#0070f3', textDecoration: 'none', display: 'inline-block', marginBottom: '20px' }}>
                ← Back to Job Listings
            </Link>

            <article style={{ border: '1px solid #eaeaea', borderRadius: '8px', padding: '30px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>

                <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#666', textTransform: 'uppercase' }}>
                    {job.department}
                </span>

                <h1 style={{ margin: '5px 0 20px 0', color: '#111' }}>{job.title}</h1>

                <div style={{ display: 'flex', gap: '15px', marginBottom: '20px', flexWrap: 'wrap' }}>
                    <span style={{ padding: '4px 10px', background: '#eee', borderRadius: '4px', fontSize: '14px' }}>{job.location}</span>
                    <span style={{ padding: '4px 10px', background: '#eee', borderRadius: '4px', fontSize: '14px' }}>{job.type}</span>
                    <span style={{ padding: '4px 10px', background: '#e6f4ea', color: '#137333', borderRadius: '4px', fontSize: '14px', fontWeight: 'bold' }}>
                        {job.salary.min.toLocaleString()} - {job.salary.max.toLocaleString()} {job.salary.currency}
                    </span>
                </div>

                <div style={{ padding: '12px 16px', backgroundColor: '#f9f9f9', borderRadius: '6px', marginBottom: '25px', fontSize: '14px', color: '#555', display: 'flex', gap: '20px' }}>
                    <span>
                        <strong>Posted:</strong> {dateFormatter(job.postedDate)}</span>
                    <span>
                        <strong>Closes:</strong> {job.closingDate ? dateFormatter(job.closingDate) : "Open until filled"}
                    </span>
                </div>

                <hr style={{ border: '0', borderTop: '1px solid #eee', margin: '20px 0' }} />

                <h2>Job Description</h2>

                <div
                    style={{ lineHeight: '1.6', color: '#333' }}
                    dangerouslySetInnerHTML={{ __html: job.description }}
                />

                <h2>Requirements</h2>
                <ul style={{ lineHeight: '1.6', color: '#333', paddingLeft: '20px' }}>
                    {job.requirements.map((req: string, index: number) => (
                        <li key={index} style={{ marginBottom: '8px' }}>{req}</li>
                    ))}
                </ul>

                <ApplyButton job={job} />
            </article>
        </main>
    );
}