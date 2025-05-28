// Common business logic types for the app

export type Bullet = "event" | "note" | "mood" | "task";

export type Entry = {
    id: string;
    type: Bullet;
    content: string;
};
