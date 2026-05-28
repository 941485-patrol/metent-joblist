import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import JobIndexPage from '../app/page';

// Mock navigation hooks
const mockPush = jest.fn();
const mockPathname = '/';
let mockSearchParams = new URLSearchParams();

jest.mock('next/navigation', () => ({
    useRouter: () => ({
        push: mockPush,
    }),
    usePathname: () => mockPathname,
    useSearchParams: () => mockSearchParams,
}));

describe('Job Index Page Route - Integration Tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        mockSearchParams = new URLSearchParams();
    });

    it('should render the index page heading and fetch all listings onto the screen', async () => {
        render(<JobIndexPage />);

        expect(screen.getByRole('heading', { name: /job board/i })).toBeInTheDocument();

        await waitFor(() => {
            const detailLinks = screen.getAllByRole('link', { name: /details/i });
            expect(detailLinks.length).toBeGreaterThan(0);
        });
    });

    it('should accurately integrate URL query parameters to narrow down render lists', async () => {
        mockSearchParams.set('department', 'Anaesthesia');

        render(<JobIndexPage />);

        await waitFor(() => {
            const headings = screen.getAllByRole('heading', { level: 2 });
            expect(headings.length).toBeGreaterThan(0);
        });

        const jobContainers = screen.queryAllByText('Details').map(el => el.closest('div'));
        const hasPediatricsInCards = jobContainers.some(container => container?.textContent?.includes('Pediatrics'));

        expect(hasPediatricsInCards).toBe(false);

    });
});