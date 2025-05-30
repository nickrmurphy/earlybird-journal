// Common business logic types for the app

// Altenative option for "event" to match four letters: Life, Snap, Beat, or Time
export type Bullet = "event" | "note" | "mood" | "task";

export type Entry = {
    id: string;
    type: Bullet;
    content: string;
};
