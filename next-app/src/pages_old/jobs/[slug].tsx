import { useRouter } from "next/router";
import React from "react";
import { Job } from "../../types/job";
import { JOBS_DATA } from "../../data/jobs";
import Link from "next/link";
import Head from "next/head";
import { dateFormatter } from "../../util/dateformatter";
import ErrorPage from 'next/error';
import JobNotFound from "../../components/jobNotFound";

export default function JobDetailPage(): React.JSX.Element {

    const router = useRouter();
    const { slug } = router.query;
    const job: Job | undefined = JOBS_DATA.find((j) => j.slug === (slug as string));

    const handleApplyClick = () => {
        if (!job) return;

        // Get global window datalayer.
        window.dataLayer = window.dataLayer || [];

        window.dataLayer.push({
            event: 'job_application_click',
            ecommerce: null,
            job_details: {
                id: job.id,
                title: job.title,
                department: job.department,
                location: job.location,
                type: job.type,
                currency: job.salary.currency,
                max_salary: job.salary.max
            }
        });

        alert(`Application tracking fired for ${job.title}!`);
    };

    if (!job) {
        return <JobNotFound />
    }

    if (!router.isReady) {
        return <p style={{ textAlign: 'center', marginTop: '40px' }}>Loading...</p>;
    }

    return (
        <main style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px', fontFamily: 'sans-serif' }}>

            <Head>
                <title>{job.title} - Job Details</title>
                <link rel="canonical" href={`http://localhost:3000/jobs/${job.slug}`} />
            </Head>

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

                <button
                    onClick={handleApplyClick} // Alert for now to simulate form submit.
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