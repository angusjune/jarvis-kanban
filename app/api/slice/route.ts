import { NextResponse } from 'next/server';

export const maxDuration = 300; // Allow 5 minutes for processing

export async function POST(req: Request) {
  try {
    const { url } = await req.json();
    console.log(`Forwarding to Modal: ${url}`);

    // Call the Modal Endpoint
    const modalUrl = "https://angusjune--content-slicer-slice-endpoint.modal.run";
    const response = await fetch(modalUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Modal Error: ${response.status} ${errorText}`);
    }

    // Get video blob
    const videoBlob = await response.blob();
    
    // Return as video stream
    return new NextResponse(videoBlob, {
      headers: {
        "Content-Type": "video/mp4",
        "Content-Disposition": 'attachment; filename="clip.mp4"'
      }
    });

  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
