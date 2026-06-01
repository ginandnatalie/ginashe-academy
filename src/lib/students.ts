import { supabase, withTimeout } from './supabase';

/**
 * Institutional helper to generate the next available Student Number.
 * Format: YYYYNNNNN (e.g. 202600100, 202600101, ...)
 * Reserved range: 202600000–202600099 (testing & admin)
 * Sequential allocation starts from 202600100 via Postgres sequence.
 */
export async function getNextStudentNumber(): Promise<string> {
  try {
    const { data, error } = await withTimeout(
      supabase.rpc('generate_student_number'),
      15000,
      'Student number generation timed out'
    );
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
  try {
    const response = await fetch('/api/validate-student', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ input })
    });
    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.error || 'Server error checking student identity');
    }
    return await response.json();
  } catch (err) {
    console.error('Error in validateStudentIdentity:', err);
    throw err;
  }
}
