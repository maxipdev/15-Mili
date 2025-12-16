export async function getCanciones() {
  const SUPABASE_URL = "https://djnfergavjbxmprprdfr.supabase.co";
  const SUPABASE_ANON_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRqbmZlcmdhdmpieG1wcnByZGZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU1ODQ3MTIsImV4cCI6MjA4MTE2MDcxMn0.Jy-nPuvCyxiyFYKisPybzBV7wXJ23wvSOrEbxFPuTjA";

  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/canciones?select=cancion`,
      {
        method: "GET",
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
      }
    );

    const data = await res.json();

    // ❌ Error desde Supabase (RLS, validación, etc.)
    if (!res.ok) {
      throw new Error();
    }

    // ✅ Todo OK
    return {
      data,
      error: null,
    };
  } catch (err) {
    // ❌ Error de red / fetch
    return {
      data: null,
      error: {
        message: "Error al obtener las canciones",
        status: null,
      },
    };
  }
}
