export async function crearCancion(song) {
  const SUPABASE_URL = "https://djnfergavjbxmprprdfr.supabase.co";
  const SUPABASE_ANON_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRqbmZlcmdhdmpieG1wcnByZGZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU1ODQ3MTIsImV4cCI6MjA4MTE2MDcxMn0.Jy-nPuvCyxiyFYKisPybzBV7wXJ23wvSOrEbxFPuTjA";

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/canciones`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      body: JSON.stringify({
        cancion: song,
      }),
    });

    await res.json();

    // ❌ Error desde Supabase (RLS, validación, etc.)
    if (!res.ok) {
      throw new Error();
    }

    // ✅ Todo OK
    return {
      data: {
        message: "Canción guardada",
      },
      error: null,
    };
  } catch (err) {
    // ❌ Error de red / fetch
    return {
      data: null,
      error: {
        message: "Error al guardar la canción",
        status: null,
      },
    };
  }
}
