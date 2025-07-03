"use client";
import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { Badge } from "../ui/badge";
import { httpService } from "@/services/http.service";
import Link from "next/link";

export interface Category {
  codeValue: string;
  name: string;
  image: string;
  description: string;
}

const Category = () => {
  const [categories, setCategories] = React.useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await httpService.get<Category[]>("/category");
      setCategories(data);
    };

    fetchCategories();
  }, []);

  return (
    <div className="container my-10">
      <h2 className="font-bold text-3xl text-center">Danh mục</h2>
      <div className="flex items-center justify-between mt-10 mb-2">
        <p className="text-lg font-medium">Danh mục mã nguồn</p>
        <Button variant={"outline"}>
          Xem tất cả <ArrowRight />
        </Button>
      </div>

      <div className="grid grid-cols-5 gap-4">
        {categories.map((category, index) => {
          return (
            <Link
              href={`/category/${category.codeValue}`}
              className="border p-4 min-h-40 rounded-xl flex flex-col justify-between cursor-pointer gap-2 bg-card"
              key={category.codeValue}
            >
              <div className="h-28 bg-muted rounded-lg"></div>

              <p>{category.name}</p>
              <p className="text-xs text-muted-foreground">{category.description}</p>
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">10 sản phẩm</p>
                <Badge>Hot</Badge>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Category;
