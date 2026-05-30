import { supabase } from './supabase';

/**
 * Institutional helper to generate the next available Student Number.
 * Format: YYYYNNNNN (e.g. 202600100, 202600101, ...)
 * Reserved range: 202600000–202600099 (testing & admin)
 * Sequential allocation starts from 202600100 via Postgres sequence.
 */
export async function getNextStudentNumber(): Promise<string> {
  try {
    const { data, error } = await supabase.rpc('generate_student_number');
    if (error) throw error;
    return String(data);
  } catch (err) {
    console.error('Error generating student number:', err);
    // Fallback: timestamp-based to avoid collision
    return `2026${Date.now().toString().slice(-5)}`;
  }
}

/**
 * Validates a student ID or email across both applications and profiles.
 * Returns the relevant record if found.
 */
export async function validateStudentIdentity(input: string) {
  const identifier = input.trim().toLowerCase();
  
  // Check Applications
  const { data: app } = await supabase
    .from('applications')
    .select('id, email, first_name, last_name, status, program, student_number')
    .or(`student_number.eq.${input.trim()},email.ilike.${identifier}`)
    .maybeSingle();

  if (app) return { type: 'application', data: app };

  // Check Profiles
  const { data: profile } = await supabase
    .from('profiles')
    .select('id, email, first_name, last_name, student_number, role')
    .or(`student_number.eq.${input.trim()},email.ilike.${identifier}`)
    .maybeSingle();

  if (profile) return { type: 'profile', data: profile };

  return null;
}
