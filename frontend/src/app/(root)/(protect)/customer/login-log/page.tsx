import dynamic from "next/dynamic";
import { FC } from "react";

const LoginLogTable = dynamic(() => import("./table"), { ssr: false });

type LoginLogPageProps = {};

const LoginLogPage: FC<LoginLogPageProps> = async ({}: LoginLogPageProps) => {
  return (
    <>
      <div className="relative overflow-x-auto opacity-show">
        <h1 className="text-3xl font-semibold mb-10">Lịch sử đăng nhập</h1>
        <LoginLogTable />
      </div>
    </>
  );
};

export default LoginLogPage;
