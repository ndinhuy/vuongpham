"use client";
import CategoryItem from "@/components/admin/CategoryItem";
import { Category } from "@/components/home/Category";
import { httpService } from "@/services/http.service";
import React, { useEffect } from "react";

const CategoryManagement = () => {
  const [categories, setCategories] = React.useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await httpService.get<Category[]>("/category");
      setCategories(data);
    };

    fetchCategories();
  }, []);

  const handleUpdateCategory = (category: Category) => {
    setCategories((prev) =>
      prev.map((c) => {
        if (c.codeValue === category.codeValue) {
          return {
            ...c,
            name: category.name,
            description: category.description,
            image: category.image,
          };
        } else {
          return c;
        }
      })
    );
  };

  const handleDeleteCategory = (codeValue: string) => {
    setCategories((prev) => prev.filter((c) => c.codeValue !== codeValue));
  };

  return (
    <div className="container">
      <div className="grid grid-cols-4 gap-4">
        {categories.map((category) => {
          return (
            <CategoryItem
              key={category.codeValue}
              category={category}
              handleUpdateCategory={handleUpdateCategory}
              handleDeleteCategory={handleDeleteCategory}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CategoryManagement;
