"use client";

import { usePathname } from "next/navigation";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export function DynamicBreadcrumb() {
    const pathname = usePathname();

    // Split path into segments and filter out empty strings
    const segments = pathname.split("/").filter((segment) => segment !== "");

    // Function to format segment names (capitalize and replace dashes/underscores with spaces)
    const formatSegmentName = (segment: string) => {
        return segment
            .replace(/[-_]/g, " ")
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    };

    // Function to build path for each segment
    const buildPath = (index: number) => {
        return "/" + segments.slice(0, index + 1).join("/");
    };

    return (
        <Breadcrumb>
            <BreadcrumbList>
                {/* Home breadcrumb */}
                <BreadcrumbItem>
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>

                {/* Dynamic segments */}
                {segments.map((segment, index) => {
                    const isLast = index === segments.length - 1;
                    const segmentPath = buildPath(index);
                    const segmentName = formatSegmentName(segment);

                    return (
                        <div key={segmentPath} className="flex items-center">
                            <BreadcrumbSeparator />
                            <BreadcrumbItem
                                className={index > 0 ? "hidden md:block" : ""}
                            >
                                {isLast ? (
                                    <BreadcrumbPage>
                                        {segmentName}
                                    </BreadcrumbPage>
                                ) : (
                                    <BreadcrumbLink href={segmentPath}>
                                        {segmentName}
                                    </BreadcrumbLink>
                                )}
                            </BreadcrumbItem>
                        </div>
                    );
                })}

                {/* Show current page if we're at root */}
                {segments.length === 0 && (
                    <>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Dashboard</BreadcrumbPage>
                        </BreadcrumbItem>
                    </>
                )}
            </BreadcrumbList>
        </Breadcrumb>
    );
}
