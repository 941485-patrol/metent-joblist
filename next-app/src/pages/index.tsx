import React, { useMemo } from "react";
import { JOBS_DATA } from '../data/jobs';
import { Job } from '../types/job';
import Link from "next/link";
import { dateFormatter } from "../util/dateformatter";
import { useRouter } from "next/router";

export default function JobIndexPage(): React.JSX.Element {

  const router = useRouter();
  const selectedDepartment = (router.query.department as string) || 'all';
  const selectedType = (router.query.type as string) || 'all';

  const departments = useMemo(() => {
    const sets = new Set(JOBS_DATA.map(j => j.department));
    return ['all', ...Array.from(sets)];
  }, []);

  const employmentTypes = useMemo(() => {
    const sets = new Set(JOBS_DATA.map(j => j.type));
    return ['all', ...Array.from(sets)];
  }, []);

  const filteredJobs = useMemo(() => {
    return JOBS_DATA.filter((job: Job) => {
      const matchesDept = selectedDepartment === 'all' || job.department === selectedDepartment;
      const matchesType = selectedType === 'all' || job.type === selectedType;
      return matchesDept && matchesType;
    });
  }, [selectedDepartment, selectedType]);

  const handleFilterChange = (key: 'department' | 'type', value: string) => {
    const newQuery = { ...router.query };

    if (value === 'all') {
      delete newQuery[key];
    } else {
      newQuery[key] = value;
    }

    router.push({
      pathname: router.pathname,
      query: newQuery,
    }, undefined, { shallow: true }); // I use shallow: true here to prevent lifecycle server restarts...
  };

  return (
    <main style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px', fontFamily: 'sans-serif' }}>
      <h1 style={{ borderBottom: '2px solid #eaeaea', paddingBottom: '10px', color: '#111' }}>
        Medical Opportunities
      </h1>

      {/* Filter jobs by department and employment type. */}
      <div style={{ display: 'flex', gap: '16px', padding: '16px', backgroundColor: '#f8f9fa', borderRadius: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: '1', minWidth: '200px' }}>
          <label htmlFor="dept-select" style={{ fontSize: '13px', fontWeight: 'bold', color: '#555' }}>Department</label>
          <select
            id="dept-select"
            value={selectedDepartment}
            onChange={(e) => handleFilterChange('department', e.target.value)}
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '14px', backgroundColor: '#fff' }}
          >
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept === 'all' ? 'All Departments' : dept}</option>
            ))}
          </select>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: '1', minWidth: '200px' }}>
          <label htmlFor="type-select" style={{ fontSize: '13px', fontWeight: 'bold', color: '#555' }}>Employment Type</label>
          <select
            id="type-select"
            value={selectedType}
            onChange={(e) => handleFilterChange('type', e.target.value)}
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '14px', backgroundColor: '#fff' }}
          >
            {employmentTypes.map(type => (
              <option key={type} value={type}>{type === 'all' ? 'All Types' : type}</option>
            ))}
          </select>
        </div>

      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px' }}>
        {filteredJobs.map((job: Job) => {
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
