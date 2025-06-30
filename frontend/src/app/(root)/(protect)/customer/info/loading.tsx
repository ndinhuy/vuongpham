import { FC } from "react";

const SkeletonCustomerInfoForm: FC = () => {
  return (
    <div className="animate-pulse">
      <section className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
          <div>
            <div className="h-4 bg-gray-200 rounded mb-2" />
            <div className="h-14 bg-gray-100 rounded" />
          </div>
          <div>
            <div className="h-4 bg-gray-200 rounded mb-2" />
            <div className="h-14 bg-gray-100 rounded" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
          <div>
            <div className="h-4 bg-gray-200 rounded mb-2" />
            <div className="h-14 bg-gray-100 rounded" />
          </div>
          <div>
            <div className="h-4 bg-gray-200 rounded mb-2" />
            <div className="h-14 bg-gray-100 rounded" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
          <div>
            <div className="h-4 bg-gray-200 rounded mb-2" />
            <div className="h-14 bg-gray-100 rounded" />
          </div>
          <div>
            <div className="h-4 bg-gray-200 rounded mb-2" />
            <div className="h-14 bg-gray-100 rounded" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
          <div>
            <div className="h-4 bg-gray-200 rounded mb-2" />
            <div className="h-14 bg-gray-100 rounded" />
          </div>
          <div>
            <div className="h-4 bg-gray-200 rounded mb-2" />
            <div className="h-14 bg-gray-100 rounded" />
          </div>
        </div>

        <div className="mb-5">
          <div className="h-4 bg-gray-200 rounded mb-2" />
          <div className="h-24 bg-gray-100 rounded" />
        </div>

        <section className="mt-5 flex gap-x-4 w-full justify-end">
          <div className="h-10 w-24 bg-gray-100 rounded" />
          <div className="h-10 w-24 bg-gray-100 rounded" />
        </section>
      </section>
    </div>
  );
};

export default SkeletonCustomerInfoForm;
