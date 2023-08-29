/* eslint-disable @next/next/no-img-element */
import React from "react";

export function TwitterIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="white" {...props}>
      <path d="M20.055 7.983c.011.174.011.347.011.523 0 5.338-3.92 11.494-11.09 11.494v-.003A10.755 10.755 0 0 1 3 18.186c.308.038.618.057.928.058a7.655 7.655 0 0 0 4.841-1.733c-1.668-.032-3.13-1.16-3.642-2.805a3.753 3.753 0 0 0 1.76-.07C5.07 13.256 3.76 11.6 3.76 9.676v-.05a3.77 3.77 0 0 0 1.77.505C3.816 8.945 3.288 6.583 4.322 4.737c1.98 2.524 4.9 4.058 8.034 4.22a4.137 4.137 0 0 1 1.128-3.86A3.807 3.807 0 0 1 19 5.274a7.657 7.657 0 0 0 2.475-.98c-.29.934-.9 1.729-1.713 2.233A7.54 7.54 0 0 0 22 5.89a8.084 8.084 0 0 1-1.945 2.093Z" />
    </svg>
  );
}

export function AlternateDescription() {
  return (
    <div tw="flex text-4xl  mt-16 break-all flex-wrap leading-relaxed">
      <div>Building </div>
      <div tw="mx-2 font-bold">happy teams</div>
      <div> that create </div>
      <div tw="mx-2 font-bold">high quality</div>
      <div> software for the web </div>
    </div>
  );
}

export function OgComponent({
  title,
  description,
  image,
}: {
  title: string | null;
  description: string | null;
  image: any;
}) {
  const defaultTitle = "Darragh O Riordan";

  const validTitle = title ? title?.slice(0, 100) : defaultTitle;

  let DescriptionElement: React.ReactElement | null = description ? (
    <div tw="flex text-4xl leading-normal mt-16 break-all">
      {description?.slice(0, 250)}
    </div>
  ) : (
    <AlternateDescription />
  );

  if (validTitle.length > 60) {
    DescriptionElement = (
      <div tw="flex text-4xl font-bold mt-16 break-all flex-wrap leading-relaxed">
        Read More{" >>>"}
      </div>
    );
  }

  return (
    <div
      tw={`flex bg-neutral-900 text-white justify-between `}
      style={{
        width: "1200px",
        maxWidth: "1200px",
        height: "630px",
        fontFamily:
          "ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji",
      }}
    >
      <div tw="flex flex-col justify-start max-w-[710px] my-15 mx-10">
        <div tw="text-7xl w-full break-all truncate min-h-[180px]">
          {validTitle}
        </div>
        {DescriptionElement}
      </div>
      <div tw="flex flex-col items-start justify-start my-15 mx-15">
        <div
          style={{ aspectRatio: ".9" }}
          tw="mr-auto flex relative flex-grow-0 w-[310px] h-[342px] overflow-hidden rounded-xl bg-zinc-800 justify-center"
        >
          <img
            alt="profile image"
            src={image as any}
            style={{ objectFit: "cover" }}
            tw=""
            width={310}
            height={342}
          />
        </div>
        <div tw="flex text-3xl font-bold mb-6 mt-10">darraghoriordan.com</div>
        <div tw="flex items-center text-2xl">
          <TwitterIcon
            style={{ width: "1.6rem", height: "1.6rem" }}
          ></TwitterIcon>
          <span tw="ml-2">@darraghor</span>
        </div>
      </div>
    </div>
  );
}
