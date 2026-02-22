import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Noprofile from "./Noprofile";
import { getAuthenticatedUser, supabase } from "../../supabaseClient";

const Profileme = () => {
  const [resolvedRole, setResolvedRole] = useState("loading");

  useEffect(() => {
    const resolveRole = async () => {
      // 1. حاول تجيب الدور من localStorage أولاً (للسرعة)
      const rawUser = localStorage.getItem("user");
      try {
        const user = JSON.parse(rawUser || "{}");
        const normalizedRole = String(user?.role || "").toLowerCase().trim();
        if (normalizedRole === "freelancer") {
          setResolvedRole("freelancer");
          return;
        }
        if (normalizedRole === "client" || normalizedRole === "customer") {
          setResolvedRole("client");
          return;
        }
      } catch {
        // لو في خطأ في JSON، نكمل للـ fallback
      }

      // 2. لو مخزونش في localStorage، نجيب بيانات المستخدم من Supabase
      //    نستخدم getSession() أولاً للتأكد من وجود session
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData.session) {
        setResolvedRole("none");
        return;
      }

      const user = await getAuthenticatedUser();
      if (!user) {
        setResolvedRole("none");
        return;
      }
      const userId = user.id;

      // 3. ابحث في جدول clients
      const { data: clientProfile } = await supabase
        .from("clients")
        .select("*")
        .eq("id", userId)
        .maybeSingle();

      if (clientProfile) {
        localStorage.setItem("user", JSON.stringify({ ...clientProfile, role: "client" }));
        setResolvedRole("client");
        return;
      }

      // 4. ابحث في جدول freelancers
      const { data: freelancerProfile } = await supabase
        .from("freelancers")
        .select("*")
        .eq("id", userId)
        .maybeSingle();

      if (freelancerProfile) {
        localStorage.setItem("user", JSON.stringify({ ...freelancerProfile, role: "freelancer" }));
        setResolvedRole("freelancer");
        return;
      }

      // 5. لو ملقيناش بروفايل، نجرب user_metadata
      const metaRole = String(user.user_metadata?.role || "").toLowerCase().trim();
      if (metaRole === "client" || metaRole === "customer") {
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: user.id,
            email: user.email,
            name: user.user_metadata?.name || user.email?.split("@")[0],
            role: "client",
          })
        );
        setResolvedRole("client");
        return;
      }

      if (metaRole === "freelancer") {
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: user.id,
            email: user.email,
            name: user.user_metadata?.name || user.email?.split("@")[0],
            role: "freelancer",
          })
        );
        setResolvedRole("freelancer");
        return;
      }

      // 6. لو ملقتش أي حاجة، يبقى مفيش بروفايل
      setResolvedRole("none");
    };

    resolveRole();
  }, []);

  if (resolvedRole === "loading") return null;
  if (resolvedRole === "freelancer") return <Navigate to="/profilefreelancer" replace />;
  if (resolvedRole === "client") return <Navigate to="/profileclient" replace />;
  return <Noprofile />;
};

export default Profileme;
