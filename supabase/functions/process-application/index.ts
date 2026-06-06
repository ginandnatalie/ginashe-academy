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

    let actionLink = null;
    let authErrorMsg = null;

    // 1. Create Auth User via generateLink (bypasses Supabase SMTP rate limits)
    if (isIndividual) {
      console.log(`Generating invite link for ${cleanEmail}`);
      const { data: linkData, error: linkError } = await supabase.auth.admin.generateLink({
        type: 'invite',
        email: cleanEmail,
        data: { full_name: name, program: program }
      });
      
      if (linkError) {
        authErrorMsg = linkError.message;
        console.error("Auth Generate Link Error:", linkError.message);
      } else {
        actionLink = linkData.properties?.action_link;
        authDataResult = linkData;
      }
    }

    // 2. Send the Applicant Welcome Email via Resend if we got an action link
    if (actionLink) {
      const applicantHtml = `
      <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background-color: #0B0C10; color: #e8ecf8; border-radius: 16px;">
        <div style="text-align: center; margin-bottom: 32px;">
          <h1 style="color: #00f2ff; font-weight: 900; letter-spacing: 2px;">GINASHE ACADEMY</h1>
        </div>
        <div style="background-color: #14171f; padding: 32px; border-radius: 12px; margin-bottom: 24px;">
          <h2 style="color: #00f2ff; margin-top: 0; text-align: center;">Welcome to the Academy</h2>
          <p>Hi ${name || 'there'},</p>
          <p>You have been invited to join Ginashe Academy. Your application has been received successfully! To begin your journey and access your Student Portal, please activate your account by setting your secure password below.</p>
          <div style="text-align: center; margin: 32px 0;">
            <a href="${actionLink}" style="padding: 16px 32px; background-color: #00f2ff; color: #0B0C10; text-decoration: none; border-radius: 8px; font-weight: 800;">Activate My Account &rarr;</a>
          </div>
          <p style="font-size: 12px; color: #5a607c;">If the button doesn't work, copy this link: <br>${actionLink}</p>
        </div>
      </div>`;

      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${RESEND_API_KEY}`
        },
        body: JSON.stringify({
          from: RESEND_FROM_EMAIL,
          to: [cleanEmail],
          subject: "You've Been Invited — Ginashe Academy",
          html: applicantHtml,
          reply_to: "skills@ginashe.academy"
        })
      });
    }

    // 3. Prepare Admin Notification Email
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
        subject: `[Ginashe Academy Platform] New ${type} Request from ${name}`,
        html: htmlContent,
        reply_to: cleanEmail
      })
    });

    const resendRes = await resendReq.json();

    return new Response(
      JSON.stringify({ 
        success: true, 
        authData: authDataResult,
        authError: authErrorMsg,
        resend: resendRes 
      }),
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
