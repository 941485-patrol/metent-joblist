// Global types for simulating gtag clicks.

interface Window {
    dataLayer?: Array<Record<string, any>>;
}