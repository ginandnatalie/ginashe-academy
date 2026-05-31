import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY') || 're_g9aDKBEy_FQT6yxzaq1oQKeNWEhBjF3Ev';
    const RESEND_FROM_EMAIL = Deno.env.get('RESEND_FROM_EMAIL') || 'Ginashe Academy <noreply@updates.ginashe.academy>';
    
    // Auto-injected by Supabase Edge Functions
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
    const supabaseServiceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

    const body = await req.json();
    const { email, name, type, details, program } = body;
    const cleanEmail = email.trim().toLowerCase();
    
    const isIndividual = type === 'individual' || !type;

    // 1. Create Auth User & Send Invite Email (For Students/Individuals)
    if (isIndividual) {
      console.log(`Creating auth user for ${cleanEmail}`);
      const { data: authData, error: authError } = await supabase.auth.admin.inviteUserByEmail(cleanEmail, {
        data: { full_name: name, program: program }
      });
      if (authError) {
        console.error("Auth Invite Error:", authError.message);
      }
    }

    // 2. Prepare Admin Notification Email
    let htmlContent = `<h2>New Platform Submission: ${type ? type.toUpperCase() : 'GENERAL'}</h2>`;
    htmlContent += `<p><strong>Name/Org:</strong> ${name || 'N/A'}</p>`;
    htmlContent += `<p><strong>Contact Email:</strong> ${cleanEmail || 'N/A'}</p>`;
    if (program) {
        htmlContent += `<p><strong>Program:</strong> ${program}</p>`;
    }
    htmlContent += `<h3>Submission Details:</h3><ul>`;
    if (details && typeof details === 'object') {
        for (const [key, value] of Object.entries(details)) {
          htmlContent += `<li><strong>${key}:</strong> ${typeof value === 'object' ? JSON.stringify(value) : value}</li>`;
        }
    }
    htmlContent += `</ul>`;

    const resendReq = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: RESEND_FROM_EMAIL,
        to: ['skills@ginashe.academy'],
        subject: `[GDA Platform] New ${type} Request from ${name}`,
        html: htmlContent,
        reply_to: cleanEmail
      })
    });

    const resendRes = await resendReq.json();

    return new Response(
      JSON.stringify({ success: true, resend: resendRes }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: resendReq.ok ? 200 : 400 
      }
    )
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
