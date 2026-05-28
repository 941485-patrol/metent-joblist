"use client"; // Client component for events.

import React from 'react';
import { Job } from '../types/job';

interface ApplyButtonProps {
    job: Job;
}

export default function ApplyButton({ job }: ApplyButtonProps): React.JSX.Element {

    const handleApplyClick = () => {
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

    return (
        <button
            onClick={handleApplyClick}
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
    );
}