"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { jwtDecode } from "jwt-decode";
import { Input } from "@/components/ui/input";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { httpService } from "@/services/http.service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { Loader2 } from "lucide-react";
import { Responsive } from "@/types";
import { AuthContext, User } from "@/providers/AuthProvider";

const formSchema = z.object({
  email: z
    .string({
      required_error: "Vui lòng nhập email",
      invalid_type_error: "Email không hợp lệ",
    })
    .email("Định dạng email không hợp lệ"),

  password: z
    .string({
      required_error: "Vui lòng nhập mật khẩu",
      invalid_type_error: "Mật khẩu không hợp lệ",
    })
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
    .max(100, "Mật khẩu quá dài, tối đa 100 ký tự"),
});

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const auth = useContext(AuthContext);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "admin@example.com",
      password: "admin@vuongpham",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      await httpService.post<
        Responsive<{
          accessToken: string;
          refreshToken: string;
        }>
      >("/users/login", {
        email: values.email,
        password: values.password,
      });
      auth?.setUser({
        id: "1",
        firstName: "Admin",
        lastName: "User",
        username: "admin",
        email: values.email,
      });
      router.push("/");
    } catch (error) {
      toast.error("Đăng nhập không thành công, vui lòng kiểm tra lại thông tin đăng nhập của bạn.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="h-screen w-screen flex items-center justify-center">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>Enter your email below to login to your account</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="Password" {...field} type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                {isLoading ? <Loader2 className="animate-spin" /> : "Login"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
};

export default SignIn;
