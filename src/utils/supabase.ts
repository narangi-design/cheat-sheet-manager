import { createClient } from "@supabase/supabase-js";

function getUserUuid(): string {
    let uuid = localStorage.getItem('user_uuid')
    if (!uuid) {
        uuid = crypto.randomUUID()
        localStorage.setItem('user_uuid', uuid)
    }
    return uuid
}

export const userUuid = getUserUuid()

export const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY,
    {
        global: {
            headers: { 'x-user-uuid': userUuid }
        }
    }
)
