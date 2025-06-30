import { FC, ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
  heading: string;
};

const Section: FC<SectionProps> = ({ children, heading }: SectionProps) => {
  return (
    <div className="w-full mt-10">
      <div className="w-full flex mb-4 justify-center text-4xl font-bold">
        <h1>{heading}</h1>
      </div>

      {children}
    </div>
  );
};

export default Section;
