import { FC, InputHTMLAttributes } from "react";
import { cn } from "@app/utils";
import { FieldProps } from "formik";

const Input: FC<InputHTMLAttributes<HTMLInputElement> & FieldProps> = ({
  field,
  form,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & FieldProps) => {
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    form.setFieldValue(field.name, e.target.value);
  };

  return (
    <input
      {...field}
      {...props}
      className={cn("px-3 text-sm shadow-sm outline-none min-h-14 border rounded-md", props.className)}
      type={props.type}
      value={field.value}
      onChange={onChangeHandler}
      placeholder={props.placeholder}
    />
  );
};

export default Input;
