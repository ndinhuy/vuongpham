import { FC, Fragment } from "react";

type BreadCrumbProps = {
  paths: string[];
};

const BreadCrumb: FC<BreadCrumbProps> = ({ paths }: BreadCrumbProps) => {
  return (
    <div className="py-4 border-b mb-7">
      {paths.map((path, index) => {
        return (
          <Fragment key={`brc_${index}`}>
            <span className="uppercase text-gray-400 text-xs md:text-sm">{path}</span>
            {index < paths.length - 1 && <span className="px-3"> - </span>}
          </Fragment>
        );
      })}
    </div>
  );
};

export default BreadCrumb;
