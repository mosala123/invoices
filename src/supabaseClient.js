import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://rseiyhaaerboxxympfnq.supabase.co";
const supabaseAnonKey = "sb_publishable_vsbdR0X-7BlXvuXp21iM4Q_fy_sFyK5";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

let pendingUserPromise = null;

const getUserFromLocalStorage = () => {
  try {
    const raw = localStorage.getItem("user");
    if (!raw) return null;
    const u = JSON.parse(raw);
    if (!u?.id) return null;
    return {
      id: u.id,
      email: u.email || "",
      user_metadata: { name: u.name || "" },
    };
  } catch {
    return null;
  }
};

export const getAuthenticatedUser = async () => {
  if (pendingUserPromise) return pendingUserPromise;

  pendingUserPromise = (async () => {
    try {
      const { data, error } = await supabase.auth.getUser();
      if (!error && data?.user) return data.user;
    } catch (err) {
      const message = String(err?.message || "");
      if (!message.includes("NavigatorLockAcquireTimeoutError")) throw err;
    }

    try {
      const { data } = await supabase.auth.getSession();
      if (data?.session?.user) return data.session.user;
    } catch {
      // fall through to localStorage fallback
    }

    return getUserFromLocalStorage();
  })();

  try {
    return await pendingUserPromise;
  } finally {
    pendingUserPromise = null;
  }
};
