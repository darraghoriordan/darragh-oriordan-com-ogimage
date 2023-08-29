/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";
import React from "react";
import { OgComponent } from "../../components/OgComponent";
export const config = {
  runtime: "edge",
};

const regularFont = fetch(
  new URL("../../fonts/Inter-Regular-sm.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

const boldFont = fetch(
  new URL("../../fonts/Inter-Bold-sm.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

export default async function handler(
  req: NextRequest
): Promise<ImageResponse> {
  try {
    const { searchParams } = new URL(req.url);
    const [regularFontData, boldFontData] = await Promise.all([
      regularFont,
      boldFont,
    ]);
    const image = await fetch(
      new URL("../../public/gray-profile-pic.jpg", import.meta.url)
    ).then((res) => res.arrayBuffer());
    const response = new ImageResponse(
      (
        <OgComponent
          title={searchParams.get("title")}
          description={searchParams.get("description")}
          image={image}
        />
      ),
      {
        debug: false,
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Inter",
            data: regularFontData,
            weight: 400,
          },
          {
            name: "Inter",
            data: boldFontData,
            weight: 700,
          },
        ],
      }
    );
    return response;
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
