"use client";

import React, { FC, ReactNode, useEffect, useRef } from "react";
import Modal from "./Modal";
import Button from "./Button";

interface IConfirmDialogProps {
  title: string;
  message: string;
  toggle: ReactNode;
  onCancel?: () => void;
  onAccept?: () => void;
  close?: boolean;
  isAcceptLoading?: boolean;
}

const ConfirmDialog: FC<IConfirmDialogProps> = ({
  title,
  message,
  toggle,
  onCancel,
  onAccept,
  close = true,
  isAcceptLoading = false,
}) => {
  const modalRef = useRef<{ open: () => void; close: () => void } | null>(null);

  const handleClose = () => {
    modalRef.current?.close();
    onCancel?.();
  };

  useEffect(() => {
    if (close) handleClose();
  }, [close]);

  return (
    <Modal size="md" ref={modalRef} title={title} toggle={toggle}>
      <div className="p-5">
        <div className="text-lg text-center font-semibold mb-7">
          <span>{message}</span>
        </div>
        <div className="flex gap-x-5 justify-center">
          <Button variant="secondary" onClick={handleClose}>
            Hủy
          </Button>
          <Button
            isLoading={isAcceptLoading}
            variant="primary"
            onClick={() => {
              onAccept?.();
              handleClose();
            }}
          >
            Đồng ý
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmDialog;
