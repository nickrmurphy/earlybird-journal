import { describe, it, expect } from "vitest";
import { getRelativeTime } from "./time";

describe("getRelativeTime", () => {
    it("returns 'just now' for less than 60 seconds ago", () => {
        const now = new Date();
        expect(getRelativeTime(now)).toBe("just now");
        expect(getRelativeTime(new Date(now.getTime() - 30 * 1000))).toBe("just now");
    });

    it("returns minutes ago for less than 60 minutes ago", () => {
        const now = new Date();
        expect(getRelativeTime(new Date(now.getTime() - 1 * 60 * 1000))).toBe("1 minute ago");
        expect(getRelativeTime(new Date(now.getTime() - 5 * 60 * 1000))).toBe("5 minutes ago");
    });

    it("returns hours ago for less than 24 hours ago", () => {
        const now = new Date();
        expect(getRelativeTime(new Date(now.getTime() - 1 * 60 * 60 * 1000))).toBe("1 hour ago");
        expect(getRelativeTime(new Date(now.getTime() - 10 * 60 * 60 * 1000))).toBe("10 hours ago");
    });

    it("returns days ago for less than 7 days ago", () => {
        const now = new Date();
        expect(getRelativeTime(new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000))).toBe("1 day ago");
        expect(getRelativeTime(new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000))).toBe("6 days ago");
    });

    it("returns weeks ago for less than 4 weeks ago", () => {
        const now = new Date();
        expect(getRelativeTime(new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000))).toBe("1 week ago");
        expect(getRelativeTime(new Date(now.getTime() - 21 * 24 * 60 * 60 * 1000))).toBe("3 weeks ago");
    });

    it("returns months ago for less than 12 months ago", () => {
        const now = new Date();
        expect(getRelativeTime(new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000))).toBe("1 month ago");
        expect(getRelativeTime(new Date(now.getTime() - 11 * 30 * 24 * 60 * 60 * 1000))).toBe("11 months ago");
    });

    it("returns years ago for 12 months or more ago", () => {
        const now = new Date();
        expect(getRelativeTime(new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000))).toBe("1 year ago");
        expect(getRelativeTime(new Date(now.getTime() - 3 * 365 * 24 * 60 * 60 * 1000))).toBe("3 years ago");
    });

    it("accepts string dates", () => {
        const now = new Date();
        const dateStr = new Date(now.getTime() - 2 * 60 * 1000).toISOString();
        expect(getRelativeTime(dateStr)).toBe("2 minutes ago");
    });
});
