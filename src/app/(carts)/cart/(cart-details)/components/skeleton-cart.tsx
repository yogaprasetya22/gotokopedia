import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonCart() {
  return (
      <div className="w-full gap-5 flex flex-col">
          <h2 className="text-2xl font-extrabold">Keranjang</h2>
          <div className="flex flex-row gap-4 w-full">
              <div className="w-full flex flex-col gap-4">
                  {[...Array(3)].map((_, i) => (
                      <div
                          key={i}
                          className="flex gap-4 bg-white rounded-lg shadow-md p-4"
                      >
                          <Skeleton className="h-24 w-24 rounded-md" />
                          <div className="flex-1 space-y-2">
                              <Skeleton className="h-5 w-3/4" />
                              <Skeleton className="h-4 w-1/2" />
                              <Skeleton className="h-4 w-1/3" />
                          </div>
                      </div>
                  ))}
              </div>
              <aside className="w-[30%] hidden md:flex flex-col gap-4">
                  <Skeleton className="h-48 w-full rounded-lg" />
              </aside>
          </div>
      </div>
  );
}
