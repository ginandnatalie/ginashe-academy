import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

console.log('Supabase URL:', supabaseUrl);
console.log('Anon Key length:', supabaseAnonKey?.length);

const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');

async function test() {
  const input = 'gkapendeka@gmail.com';
  const identifier = input.trim().toLowerCase();
  
  console.log('Checking applications...');
  try {
    const { data: app, error: appError } = await supabase
      .from('applications')
      .select('id, email, first_name, last_name, status, program, student_number')
      .or(`student_number.eq.${input.trim()},email.ilike.${identifier}`)
      .maybeSingle();
      
    if (appError) {
      console.error('Applications error:', appError);
    } else {
      console.log('Applications result:', app);
    }
  } catch (err) {
    console.error('Applications catch error:', err);
  }

  console.log('Checking profiles...');
  try {
    const { data: profile, error: profError } = await supabase
      .from('profiles')
      .select('id, email, first_name, last_name, student_number')
      .or(`student_number.eq.${input.trim()},email.ilike.${identifier}`)
      .maybeSingle();

    if (profError) {
      console.error('Profiles error:', profError);
    } else {
      console.log('Profiles result:', profile);
    }
  } catch (err) {
    console.error('Profiles catch error:', err);
  }
  
  console.log('Done!');
}

test();
