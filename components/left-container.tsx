"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import useSound from "use-sound";

const content = {
  find: {
    src: "/frustrated-dude.png",
    title: "Awwww don't be frustrated honey",
    description:
      "We are here to help you find your lost items based on the details you provide. Fill out the form and let us do the magic.",
    sound: "/cry-cry.mp3",
  },
  report: {
    src: "/cool-dude.png",
    title: "Cool dudes find lost items",
    description:
      "Tell us about the item you found and we will help connect it with the person who is looking for it.",
    sound: "/cool-dude.mp3",
  },
};

export default function LeftContainer() {
  const pathname = usePathname();
  const { src, title, description, sound } =
    pathname === "/report" ? content.report : content.find;

  const [play, { stop }] = useSound(sound, {
    loop: true,
  });

  const handleMouseEnter = () => {
    play();
  };

  const handleMouseLeave = () => {
    stop();
  };

  return (
    <div className="group hidden lg:flex flex-col flex-1 items-center justify-center bg-primary sticky top-0 h-svh overflow-hidden">
      <main
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 sm:items-start text-white"
      >
        <div className="flex gap-2 items-center size-96 -ml-20 group-hover:animate-wiggle">
          <Image
            src={src}
            alt="image"
            width={800}
            height={60}
            className="block object-contain"
          />
        </div>

        <div className="space-y-6 max-w-md">
          <h1 className="text-2xl font-bold leading-[1.1] tracking-wider">
            {title}
          </h1>
          <p className="text-sm leading-relaxed w-full">{description}</p>
        </div>
      </main>
    </div>
  );
}


