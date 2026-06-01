import { createClient } from "@supabase/supabase-js";

export async function onRequestPost(context) {
  const { request, env } = context;
  
  try {
    const { input } = await request.json();
    if (!input) {
      return new Response(JSON.stringify({ error: "Input is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = env.VITE_SUPABASE_URL;
    const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY;
    const adminKey = env.SUPABASE_SERVICE_ROLE_KEY;

    // Use admin client to bypass RLS issues
    const admin = createClient(supabaseUrl, adminKey || supabaseAnonKey);
    const identifier = input.trim().toLowerCase();

    // Check Applications
    const { data: app, error: appError } = await admin
      .from('applications')
      .select('id, email, first_name, last_name, status, program, student_number')
      .or(`student_number.eq.${input.trim()},email.ilike.${identifier}`)
      .maybeSingle();

    if (appError) {
      console.error('Validate student app query error:', appError);
    }

    if (app) {
      return new Response(JSON.stringify({ type: 'application', data: app }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    // Check Profiles
    const { data: profile, error: profError } = await admin
      .from('profiles')
      .select('id, email, first_name, last_name, student_number')
      .or(`student_number.eq.${input.trim()},email.ilike.${identifier}`)
      .maybeSingle();

    if (profError) {
      console.error('Validate student profile query error:', profError);
    }

    if (profile) {
      return new Response(JSON.stringify({ type: 'profile', data: profile }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(null), {
      headers: { "Content-Type": "application/json" },
    });

  } catch (err: any) {
    console.error('Student validation endpoint error:', err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
