/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";
import React from "react";
export const config = {
  runtime: "edge",
};

const bgColors = [
  "bg-amber-500",
  "bg-sky-500",
  "bg-rose-500",
  "bg-emerald-500",
];

export function TwitterIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="white" {...props}>
      <path d="M20.055 7.983c.011.174.011.347.011.523 0 5.338-3.92 11.494-11.09 11.494v-.003A10.755 10.755 0 0 1 3 18.186c.308.038.618.057.928.058a7.655 7.655 0 0 0 4.841-1.733c-1.668-.032-3.13-1.16-3.642-2.805a3.753 3.753 0 0 0 1.76-.07C5.07 13.256 3.76 11.6 3.76 9.676v-.05a3.77 3.77 0 0 0 1.77.505C3.816 8.945 3.288 6.583 4.322 4.737c1.98 2.524 4.9 4.058 8.034 4.22a4.137 4.137 0 0 1 1.128-3.86A3.807 3.807 0 0 1 19 5.274a7.657 7.657 0 0 0 2.475-.98c-.29.934-.9 1.729-1.713 2.233A7.54 7.54 0 0 0 22 5.89a8.084 8.084 0 0 1-1.945 2.093Z" />
    </svg>
  );
}

export default async function handler(
  req: NextRequest
): Promise<ImageResponse> {
  try {
    const { searchParams } = new URL(req.url);
    const image = await fetch(
      new URL("../../public/gray-profile-pic.jpg", import.meta.url)
    ).then((res) => res.arrayBuffer());

    // a string with 100 random characters
    const longString = Array.from(
      { length: 60 },
      () => Math.random().toString(36)[2]
    ).join(" ");

    const title = searchParams.has("title")
      ? searchParams.get("title")?.slice(0, 100)
      : longString;

    const description = searchParams.has("description")
      ? searchParams.get("description")?.slice(0, 350)
      : longString;
    const randomBgColor = "bg-neutral-900"; //bgColors[Math.floor(Math.random() * bgColors.length)];

    const response = new ImageResponse(
      (
        <div
          tw={`flex ${randomBgColor} text-white justify-between `}
          style={{
            width: "1200px",
            maxWidth: "1200px",
            height: "630px",
            fontFamily:
              "ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji",
          }}
        >
          <div tw="flex flex-col justify-center max-w-[700px] my-15 mx-10 grow-0">
            <div tw="text-7xl flex-wrap ">{title}</div>
            <div tw="text-2xl mt-16 flex-wrap grow">{description}</div>
          </div>
          <div tw="flex flex-col justify-center my-15 mx-15">
            <div
              style={{ aspectRatio: ".9" }}
              tw="flex relative flex-grow-0 w-[288px] h-[320px] overflow-hidden rounded-xl bg-zinc-800 justify-center"
            >
              <img
                alt="profile image"
                src={image as any}
                style={{ objectFit: "cover" }}
                tw=""
                width={288}
                height={320}
              />
            </div>
            <div tw="flex text-3xl font-bold mb-4 mt-8">
              darraghoriordan.com
            </div>
            <div tw="flex items-center text-2xl">
              <TwitterIcon
                style={{ width: "1.6rem", height: "1.6rem" }}
              ></TwitterIcon>
              <span tw="ml-2">@darraghor</span>
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
