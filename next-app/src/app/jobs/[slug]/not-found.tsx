import React from 'react';
import Link from 'next/link';

export default function JobNotFound(): React.JSX.Element {
    return (
        <>
            <main style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '60vh',
                fontFamily: 'sans-serif',
                textAlign: 'center',
                padding: '0 20px'
            }}>
                <h1 style={{ fontSize: '72px', margin: '0', color: '#eaeaea' }}>404</h1>
                <h2 style={{ fontSize: '24px', color: '#333', marginTop: '10px', marginBottom: '20px' }}>
                    The position you are looking for does not exist
                </h2>
                <p style={{ color: '#666', maxWidth: '450px', margin: '0 auto 30px auto', lineHeight: '1.5' }}>
                    This job listing may have expired, been filled, or the link you followed might be incorrect.
                </p>

                <Link
                    href="/"
                    style={{
                        backgroundColor: '#0070f3',
                        color: 'white',
                        textDecoration: 'none',
                        padding: '12px 24px',
                        borderRadius: '5px',
                        fontWeight: 'bold',
                        fontSize: '16px',
                        boxShadow: '0 4px 14px 0 rgba(0,118,255,0.39)'
                    }}
                >
                    ← Back to Job Listings
                </Link>
            </main>
        </>
    );
}