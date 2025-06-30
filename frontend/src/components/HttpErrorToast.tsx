import { AxiosError } from "axios";
import { CircleX } from "lucide-react";
import { FC, memo } from "react";

type HttpErrorToastProps = {
  error?: AxiosError<ErrorResponse, any> | null;
};

const HttpErrorToast: FC<HttpErrorToastProps> = ({ error }: HttpErrorToastProps) => {
  const getErrorMessage = () => {
    if (!error?.response) return <span>Lỗi không xác định</span>;

    const { data } = error.response;

    if (Array.isArray(data.message)) {
      return data.message.map((errorMessage, index) => {
        return <span key={`err-msg:${index}`}>- {errorMessage}</span>;
      });
    }

    return <span>{data.message}</span>;
  };

  return (
    error && (
      <div
        className="flex items-center w-full p-4 mb-4 text-gray-500 bg-white rounded-lg shadow mt-5 fade-in-show"
        role="alert"
      >
        <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg">
          <CircleX />
          <span className="sr-only">Error icon</span>
        </div>
        <div className="ms-3 text-sm font-normal flex flex-col">{getErrorMessage()}</div>
      </div>
    )
  );
};

export default memo(HttpErrorToast);
