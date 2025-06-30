"use client";

import { FC, ReactNode, useEffect, useRef } from "react";
import { useInView } from "@app/common";

type InViewDetectorDivProps = {
  children?: ReactNode;
  className?: string;
  onInView?: () => void;
};

const InViewDetectorDiv: FC<InViewDetectorDivProps> = ({ className, onInView, children }: InViewDetectorDivProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView<HTMLDivElement>(ref);

  useEffect(() => {
    onInView && onInView();
  }, [isInView, onInView]);

  return (
    <div className={className} ref={ref}>
      {children}
    </div>
  );
};

export default InViewDetectorDiv;
