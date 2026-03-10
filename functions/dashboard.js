export async function onRequestGet(context) {
  if (!context.env.MATH_DATA) {
    return new Response('KV Namespace not found.', { status: 500 });
  }

  // Retrieve all keys
  const list = await context.env.MATH_DATA.list();
  const data = [];

  for (const key of list.keys) {
    const value = await context.env.MATH_DATA.get(key.name);
    data.push(JSON.parse(value));
  }

  // Simple HTML table output
  const rows = data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    .map(item => `
      <tr>
        <td>${item.timestamp}</td>
        <td>${item.paper || 'N/A'}</td>
        <td>${item.type || 'N/A'}</td>
      </tr>`).join('');

  const html = `
    <html>
      <head><style>body{font-family:sans-serif;background:#f5f0e8;padding:40px;} table{width:100%;border-collapse:collapse;background:white;} th,td{padding:12px;border:1px solid #d4c9b0;text-align:left;}</style></head>
      <body>
        <h1>Mathletica Learner Logs</h1>
        <table><tr><th>Time</th><th>NESA Paper</th><th>Category</th></tr>${rows}</table>
      </body>
    </html>`;

  return new Response(html, { headers: { 'Content-Type': 'text/html' } });
}
