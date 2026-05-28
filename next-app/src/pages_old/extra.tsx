import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import { JOBS_DATA } from '../../data/jobs';
import { Job } from '../../types/job';
import { formatDate } from '../../utils/formatters'; // Reusing your utility formatter

export default function JobDetailPage(): React.JSX.Element {
    const router = useRouter();
    const { slug } = router.query;

    // 1. Next.js Dynamic Routing lookup
    const job: Job | undefined = JOBS_DATA.find((j) => j.slug === (slug as string));

    if (!router.isReady) return <p style={{ textAlign: 'center', marginTop: '40px' }}>Loading...</p>;
    if (!job) return <p style={{ textAlign: 'center', marginTop: '40px' }}>Job not found.</p>;

    return (
        <main style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px', fontFamily: 'sans-serif' }}>
            {/* Canonical tag for individual job details */}
            <Head>
                <title>{job.title} - Job Details</title>
                <link rel="canonical" href={`https://yourdomain.com/jobs/${job.slug}`} />
            </Head>

            <Link href="/" style={{ color: '#0070f3', textDecoration: 'none', display: 'inline-block', marginBottom: '20px' }}>
                ← Back to Job Listings
            </Link>

            <article style={{ border: '1px solid #eaeaea', borderRadius: '8px', padding: '30px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                {/* ======================================================== */}
                {/* ✨ HIGHLIGHT: RENDER DEPARTMENT, TITLE, LOCATION, TYPE */}
                {/* ======================================================== */}
                <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#666', textTransform: 'uppercase' }}>
                    {job.department}
                </span>
                <h1 style={{ margin: '5px 0 20px 0', color: '#111' }}>{job.title}</h1>

                <div style={{ display: 'flex', gap: '15px', marginBottom: '20px', flexWrap: 'wrap' }}>
                    <span style={{ padding: '4px 10px', background: '#eee', borderRadius: '4px', fontSize: '14px' }}>📍 {job.location}</span>
                    <span style={{ padding: '4px 10px', background: '#eee', borderRadius: '4px', fontSize: '14px' }}>💼 {job.type}</span>

                    {/* ========================================== */}
                    {/* ✨ HIGHLIGHT: SALARY RANGE FORMATTING */}
                    {/* ========================================== */}
                    <span style={{ padding: '4px 10px', background: '#e6f4ea', color: '#137333', borderRadius: '4px', fontSize: '14px', fontWeight: 'bold' }}>
                        💰 {job.salary.min.toLocaleString()} - {job.salary.max.toLocaleString()} {job.salary.currency}
                    </span>
                </div>

                {/* ========================================================== */}
                {/* ✨ HIGHLIGHT: POSTED DATE & DYNAMIC CLOSING DATE FALLBACK */}
                {/* ========================================================== */}
                <div style={{ padding: '12px 16px', backgroundColor: '#f9f9f9', borderRadius: '6px', marginBottom: '25px', fontSize: '14px', color: '#555', display: 'flex', gap: '20px' }}>
                    <span>📅 <strong>Posted:</strong> {formatDate(job.postedDate)}</span>
                    <span>
                        ⏳ <strong>Closes:</strong> {job.closingDate ? formatDate(job.closingDate) : "Open until filled"}
                    </span>
                </div>

                <hr style={{ border: '0', borderTop: '1px solid #eee', margin: '20px 0' }} />

                {/* ========================================================== */}
                {/* ✨ HIGHLIGHT: HTML DESCRIPTION & STRIPED REQUIREMENTS LIST */}
                {/* ========================================================== */}
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

                <button
                    onClick={() => alert(`Applied for ${job.title}!`)}
                    style={{
                        marginTop: '30px',
                        backgroundColor: '#0070f3',
                        color: 'white',
                        border: 'none',
                        padding: '12px 24px',
                        borderRadius: '5px',
                        fontSize: '16px',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                    }}
                >
                    Apply Now
                </button>
            </article>
        </main>
    );
}