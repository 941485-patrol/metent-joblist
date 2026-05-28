import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Job Board",
    description: "Browse and apply for open medical positions, filterable by specialty department and employment type.",
    alternates: {
        canonical: "http://localhost:3000/",
    },
    openGraph: {
        title: "Job Board",
        description: "Browse and apply for open medical positions.",
        url: "http://localhost:3000/",
        type: "website",
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}): React.JSX.Element {
    return (
        <html lang="en">
            <body style={{ margin: 0, backgroundColor: "#fdfdfd" }}>
                {children}
            </body>
        </html>
    );
}