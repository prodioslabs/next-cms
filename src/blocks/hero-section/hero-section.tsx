import Image from "next/image";
import React from "react";
import Markdown from "~/cms/components/markdown";
import { CMSImageData } from "~/cms/types/field";
import { Button } from "./button";
import { LucideIcon } from "./lucide-icon";
import { cn } from "~/lib/utils";

type HeroSectionProps = React.HTMLAttributes<HTMLDivElement> & {
  title: string;
  description: string;
  image: CMSImageData;
  callToActionIcon?: string;
  callToAction?: string;
};

export default function HeroSection({
  title,
  description,
  image,
  callToAction = "Get Started",
  callToActionIcon,
  className,
  ...rest
}: HeroSectionProps) {
  return (
    <div
      className={cn("mx-auto max-w-[85rem] px-4 sm:px-6 lg:px-8", className)}
      {...rest}
    >
      {/** Grid */}
      <div className="grid gap-4 md:grid-cols-2 md:items-center md:gap-8 xl:gap-20">
        <div>
          <h1 className="block text-3xl font-bold text-gray-800 dark:text-white sm:text-4xl lg:text-6xl lg:leading-tight">
            <Markdown>{title}</Markdown>
          </h1>
          <div className="mt-3 text-lg text-gray-800 dark:text-gray-400">
            <Markdown>{description}</Markdown>
          </div>

          {/** Buttons */}
          <div className="mt-7 grid w-full gap-3 sm:inline-flex">
            <Button
              icon={
                callToActionIcon ? (
                  <LucideIcon name={callToActionIcon} />
                ) : undefined
              }
            >
              {callToAction}
            </Button>
          </div>
          {/** End Buttons */}
        </div>
        {/** End Col */}

        <div className="relative ml-4">
          <Image
            className="max-h-[640px] w-full rounded-md object-cover"
            src={image.url}
            width={image.width}
            height={image.height}
            alt="Hero Image"
          />
          <div className="absolute inset-0 -z-[1] -mb-4 -ml-4 mr-4 mt-4 h-full w-full rounded-md bg-gradient-to-tr from-gray-200 via-white/0 to-white/0 dark:from-slate-800 dark:via-slate-900/0 dark:to-slate-900/0 lg:-mb-6 lg:-ml-6 lg:mr-6 lg:mt-6" />

          {/** SVG */}
          <div className="absolute bottom-0 left-0">
            <svg
              className="ml-auto h-auto w-2/3 text-white dark:text-slate-900"
              width="630"
              height="451"
              viewBox="0 0 630 451"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="531"
                y="352"
                width="99"
                height="99"
                fill="currentColor"
              />
              <rect
                x="140"
                y="352"
                width="106"
                height="99"
                fill="currentColor"
              />
              <rect
                x="482"
                y="402"
                width="64"
                height="49"
                fill="currentColor"
              />
              <rect
                x="433"
                y="402"
                width="63"
                height="49"
                fill="currentColor"
              />
              <rect
                x="384"
                y="352"
                width="49"
                height="50"
                fill="currentColor"
              />
              <rect
                x="531"
                y="328"
                width="50"
                height="50"
                fill="currentColor"
              />
              <rect x="99" y="303" width="49" height="58" fill="currentColor" />
              <rect x="99" y="352" width="49" height="50" fill="currentColor" />
              <rect x="99" y="392" width="49" height="59" fill="currentColor" />
              <rect x="44" y="402" width="66" height="49" fill="currentColor" />
              <rect
                x="234"
                y="402"
                width="62"
                height="49"
                fill="currentColor"
              />
              <rect
                x="334"
                y="303"
                width="50"
                height="49"
                fill="currentColor"
              />
              <rect x="581" width="49" height="49" fill="currentColor" />
              <rect x="581" width="49" height="64" fill="currentColor" />
              <rect
                x="482"
                y="123"
                width="49"
                height="49"
                fill="currentColor"
              />
              <rect
                x="507"
                y="124"
                width="49"
                height="24"
                fill="currentColor"
              />
              <rect x="531" y="49" width="99" height="99" fill="currentColor" />
            </svg>
          </div>
          {/** End SVG */}
        </div>
        {/** End Col */}
      </div>
      {/** End Grid */}
    </div>
  );
}
