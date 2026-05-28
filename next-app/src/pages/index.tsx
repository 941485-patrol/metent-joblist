import React from "react";
import { JOBS_DATA } from '../data/jobs';
import { Job } from '../types/job';
import Link from "next/link";
import { dateFormatter } from "../util/dateformatter";

export default function JobIndexPage(): React.JSX.Element {

  return (
    <main style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px', fontFamily: 'sans-serif' }}>
      <h1 style={{ borderBottom: '2px solid #eaeaea', paddingBottom: '10px', color: '#111' }}>
        Medical Opportunities
      </h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px' }}>
        {JOBS_DATA.map((job: Job) => {
          return <div key={job.id} style={{
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            padding: '24px',
            backgroundColor: '#ffffff',
            boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
          }}>

            <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#666', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              {job.department}
            </span>

            <h2 style={{ margin: '4px 0 12px 0', color: '#0070f3', fontSize: '22px' }}>
              {job.title}
            </h2>

            <div style={{ display: 'flex', gap: '15px', marginBottom: '15px', color: '#555', fontSize: '14px' }}>
              <span>{job.location}</span>
              <span>{job.type}</span>
            </div>

            <hr style={{ border: '0', borderTop: '1px solid #f0f0f0', margin: '12px 0' }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>

              <span style={{ fontSize: '13px', color: '#888' }}>
                Posted on {dateFormatter(job.postedDate)}
              </span>

              <Link
                href={`/jobs/${job.slug}`}
                style={{
                  color: '#0070f3',
                  textDecoration: 'none',
                  fontWeight: 'bold',
                  fontSize: '15px'
                }}
              >
                Details
              </Link>

            </div>
          </div>
        })}
      </div>
    </main>
  );
}
