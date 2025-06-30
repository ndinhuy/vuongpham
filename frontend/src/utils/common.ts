import { io, ManagerOptions, SocketOptions } from "socket.io-client";

export const getAdminRoleStyle: (role: Role) => { name: string; tagStyle: string } = (role: Role) => {
  switch (role) {
    case "ADMIN":
      return {
        name: "Quản trị viên",
        tagStyle: "tag tag-secondary",
      };

    case "OWNER":
      return {
        name: "Chủ sở hữu",
        tagStyle: "tag tag-secondary",
      };

    default:
      return {
        name: role,
        tagStyle: "tag tag-secondary",
      };
  }
};

export const mapOrderStatus = (status: OrderStatus) => {
  switch (status) {
    case "PREPARING":
      return "Đang chờ";
    case "TRANSPORTING":
      return "Đang vận chuyển";
    case "COMPLETED":
      return "Hoàn tất";
    case "CANCELING":
      return "Đã yêu cầu huỷ";
    case "CANCELED":
      return "Đã huỷ";
    default:
      return "Chưa thanh toán";
  }
};

export const openSocket = (uri: string, configs?: Partial<ManagerOptions & SocketOptions>) => {
  return io(uri, {
    transports: ["websocket"],
    reconnectionAttempts: 5,
    reconnectionDelay: 2000,
    withCredentials: true,
    ...configs,
  });
};

export const formatErrorMessage = (message: string | string[]): string => {
  if (Array.isArray(message)) {
    return message.join(", ");
  }
  return message;
};

export const getAccountStatus = (isLocked: boolean): string => {
  return isLocked ? "Đã khoá" : "Đang hoạt động";
};

export const canBeCanceledStatus = (status: OrderStatus): boolean => {
  const canBeCanceledStatus: Array<OrderStatus> = ["TRANSPORTING", "CANCELING", "CANCELED", "COMPLETED"];

  return !canBeCanceledStatus.includes(status);
};
