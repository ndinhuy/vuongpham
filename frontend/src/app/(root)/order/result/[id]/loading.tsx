"use client";

import { FC } from "react";
import { cn } from "@app/utils";

const Skeleton: FC<{ className?: string }> = ({ className }) => (
  <div className={cn("animate-pulse bg-gray-200 rounded", className)} />
);

const OrderResultSkeleton: FC = () => {
  return (
    <section className="py-24 relative">
      <div className="w-full lg-6 mx-auto">
        <div className="flex flex-col items-center">
          <Skeleton className="w-20 h-20 mb-5 rounded-full" />
          <Skeleton className="w-48 h-10 rounded mb-2" />
          <Skeleton className="w-3/4 h-6 rounded mt-2 mb-10" />
        </div>
        <div className="main-box border border-gray-200 rounded-xl pt-6 max-w-xl max-lg:mx-auto lg:max-w-full">
          <div className="flex flex-col lg:flex-row gap-5 lg:items-center justify-between px-6 pb-6 border-b border-gray-200">
            <div className="data space-y-2">
              <Skeleton className="w-32 h-6" />
              <Skeleton className="w-48 h-6" />
            </div>
            <Skeleton className="w-36 h-10 rounded-lg" />
          </div>
          <div className="w-full px-3 min-[400px]:px-6">
            <Skeleton className="w-48 h-8 my-5" />
            {[...Array(2)].map((_, index) => (
              <div
                key={index}
                className={cn(
                  "flex flex-col lg:flex-row items-center py-6 border-gray-200 gap-6 w-full",
                  index === 1 ? "" : "border-b",
                )}
              >
                <Skeleton className="w-36 h-24 rounded-lg" />
                <div className="flex flex-col w-full space-y-3">
                  <Skeleton className="w-3/4 h-6" />
                  <div className="flex items-center gap-4">
                    <Skeleton className="w-20 h-5" />
                    <Skeleton className="w-20 h-5" />
                  </div>
                  <Skeleton className="w-20 h-5 mt-4" />
                </div>
              </div>
            ))}
          </div>
          <div className="w-full space-y-2 border-t p-5">
            <Skeleton className="w-40 h-8" />
            <div className="-my-3 mt-5 space-y-4">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="flex items-center justify-between gap-4 py-2">
                  <Skeleton className="w-1/3 h-6" />
                  <Skeleton className="w-1/4 h-6" />
                </div>
              ))}
            </div>
          </div>
          <div className="w-full space-y-2 border-t p-5">
            <Skeleton className="w-40 h-8" />
            <div className="-my-3 mt-5 space-y-4">
              <div className="flex items-center justify-between gap-4 py-2">
                <Skeleton className="w-1/2 h-6" />
                <Skeleton className="w-1/3 h-6" />
              </div>
              <div className="flex items-center justify-end py-3 mt-3 border-t">
                <Skeleton className="w-32 h-10 rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderResultSkeleton;
