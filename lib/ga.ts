declare global {
    interface Window {
        dataLayer?: Array<Record<string, unknown>>;
    }
}

export function trackEvent(
    eventName: string,
    params: Record<string, unknown> = {}
) {
    if (typeof window === "undefined") return;

    window.dataLayer = window.dataLayer || [];

    if (Array.isArray(window.dataLayer)) {
        window.dataLayer.push({ event: eventName, ...params });
    }
}

export default trackEvent;
