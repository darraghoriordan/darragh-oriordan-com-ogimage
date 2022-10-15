/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";
import React from "react";
export const config = {
  runtime: "experimental-edge",
};

const bgColors = [
  "bg-amber-500",
  "bg-sky-500",
  "bg-rose-500",
  "bg-emerald-500",
];

export default function handler(req: NextRequest): ImageResponse {
  try {
    const { searchParams } = new URL(req.url);

    const hasTitle = searchParams.has("title");

    // a string with 100 random characters
    const longString = Array.from(
      { length: 60 },
      () => Math.random().toString(36)[2]
    ).join(" ");

    const title = hasTitle
      ? searchParams.get("title")?.slice(0, 120)
      : longString;

    const randomBgColor = bgColors[Math.floor(Math.random() * bgColors.length)];

    const response = new ImageResponse(
      (
        <div
          tw={`flex flex-col ${randomBgColor} justify-between pt-15 px-10 pb-5`}
          style={{ width: "1200px", height: "630px" }}
        >
          <div tw="flex text-7xl mb-10 grow mx-auto">
            <p tw="p-0 m-0 text-center">{title}</p>
          </div>
          <div tw="flex items-end space-between shrink">
            <div tw="flex flex-col mb-4">
              <div tw="text-black font-mono text-6xl text-amber-50 mb-4">
                @darraghor
              </div>
              <div tw="text-black font-mono text-4xl">
                https://www.darraghoriordan.com
              </div>
            </div>
            <div tw="flex ml-60" style={{ height: "280px" }}>
              <img
                alt="profile image"
                src={`https://www.darraghoriordan.com/profile-pic-small.jpg`}
                tw="rounded-full shadow-lg"
                width={280}
                height={280}
              />
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
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
