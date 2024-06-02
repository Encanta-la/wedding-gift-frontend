export async function POST(request: Request) {
  const req = await request.json();

  console.log(req);

  const res = await fetch(
    `${process.env.API_URL}/wedding-guests/getOrCreate/${req.phone}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req),
    }
  );

  const data = await res.json();

  return Response.json(data);
}
