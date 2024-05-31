export async function GET(request: Request) {
  const res = await fetch(`${process.env.API_URL}/gift`, {
    method: 'GET',
  });

  const data = await res.json();

  return Response.json(data);
}
