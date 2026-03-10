export async function onRequestGet(context) {
  const { searchParams } = new URL(context.request.url);
  const encodedData = searchParams.get('data');

  if (!encodedData) {
    return new Response('No data', { status: 400 });
  }

  try {
    // Decode data
    const decodedData = JSON.parse(atob(encodedData));
    const timestamp = new Date().toISOString();
    const entry = { ...decodedData, timestamp };

    // Save to Cloudflare KV
    // Note: You must create a KV namespace named 'MATH_DATA' in the CF dashboard
    if (context.env.MATH_DATA) {
      const id = Date.now().toString();
      await context.env.MATH_DATA.put(id, JSON.stringify(entry));
    }

    return new Response('Logged', { 
      status: 200, 
      headers: { 'Access-Control-Allow-Origin': '*' } 
    });
  } catch (e) {
    return new Response('Error', { status: 500 });
  }
}
