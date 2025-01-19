import { twMerge } from "tailwind-merge";
import { Lights } from "./ui/lights";

export const Hero = () => {
    return (
        <span className="bg-black w-full h-full block">
            <div
                className={"w-full h-full relative  bg-grid-white/[0.03] px-4"}
            >
                <div
                    className={
                        "w-full h-full flex flex-col sm:items-center items-start justify-center relative z-[1] animate-moveUp"
                    }
                >
                    <div className="relative w-full">
                        <div className="bg-gradient-to-br from-green-950/[0.8] to-blue-950/[0.7] border border-green-900 rounded-lg p-1 aspect-square overflow-hidden absolute left-0 sm:left-1/2 sm:-translate-x-1/2 -top-12">
                            <span
                                className={twMerge(
                                    "text-xl",
                                    "text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-yellow-400 "
                                )}
                            >
                                ✨
                            </span>
                        </div>
                    </div>
                    <div
                        className={
                            "text-transparent sm:text-center text-start font-bold sm:text-5xl text-4xl bg-clip-text bg-gradient-to-br from-white via-neutral-200 to-black/[0.6]"
                        }
                    >
                        Good Hero Equals Trust.
                    </div>
                    <div className="text-white/[0.7] sm:text-center text-start">
                        Trusted by Trusted Companies and Trusted People
                    </div>
                    <div className="mt-5 w-full flex max-sm:flex-col justify-center sm:gap-10 gap-4 text-white">
                        <button className="group h-10 sm:h-8 w-full sm:w-36 bg-gradient-to-br from-green-950 to-blue-950 border border-green-900 rounded-lg flex items-center justify-center gap-1.5">
                            <span>Our Work</span>
                            <span className="group-hover:translate-x-0.5 transition-all">
                                &rarr;
                            </span>
                        </button>
                        <button className="h-8 flex items-center justify-center underline">
                            <span>contact us</span>
                        </button>
                    </div>
                </div>
                <div
                    className={
                        "absolute bottom-0 left-0 w-full h-full z-0 animate-appear opacity-0"
                    }
                >
                    <Lights />
                </div>
            </div>
        </span>
    );
};
