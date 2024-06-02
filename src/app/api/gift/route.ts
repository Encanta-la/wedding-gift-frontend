export async function GET(request: Request) {
  const res = await fetch(`${process.env.API_URL}/gift`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await res.json();

  return Response.json(data);
}

export const fetchCache = 'force-no-store';
