import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta as any).env.VITE_SUPABASE_URL;
const supabaseAnonKey = (import.meta as any).env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase URL or Anon Key is missing. Please check your environment variables.');
  if (typeof window !== 'undefined') {
    alert('Configuration Error: Supabase URL or Anon Key is missing. Please check your environment variables.');
  }
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '', {
  auth: {
    storage: typeof window !== 'undefined' ? window.sessionStorage : undefined,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

export const withTimeout = async <T>(promise: Promise<T> | any, timeoutMs: number = 15000, errorMsg: string = 'Request timed out'): Promise<T> => {
  let timeoutId: any;
  const timeoutPromise = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => {
      reject(new Error(errorMsg));
    }, timeoutMs);
  });

  try {
    const result = await Promise.race([Promise.resolve(promise), timeoutPromise]);
    clearTimeout(timeoutId);
    return result;
  } catch (err) {
    clearTimeout(timeoutId);
    throw err;
  }
};

export const uploadFile = async (file: File, bucket: string = 'documents', folder: string = 'cvs') => {
  console.log('Starting file upload...', { bucket, folder, fileName: file.name });
  
  // Extract extension defensively
  const lastDotIndex = file.name.lastIndexOf('.');
  let fileExt = '';
  if (lastDotIndex !== -1) {
    fileExt = file.name.substring(lastDotIndex + 1).toLowerCase();
  }
  
  // Fallback to pdf if no extension or if extension is invalid/too long
  if (!fileExt || fileExt.length > 5) {
    fileExt = 'pdf';
  }

  const fileName = `${Math.random()}.${fileExt}`;
  const filePath = `${folder}/${fileName}`;

  try {
    const uploadPromise = supabase.storage
      .from(bucket)
      .upload(filePath, file);

    const { error: uploadError } = await withTimeout(
      uploadPromise,
      30000,
      `Upload timed out for ${file.name} after 30 seconds`
    ) as any;

    if (uploadError) {
      console.error('Upload error:', uploadError);
      throw uploadError;
    }

    console.log('Upload successful, getting public URL...');
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    console.log('Public URL:', publicUrl);
    return publicUrl;
  } catch (err) {
    console.error('Catch in uploadFile:', err);
    throw err;
  }
};
