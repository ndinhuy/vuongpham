"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Category } from "../home/Category";
import { toast } from "sonner";
import { httpService } from "@/services/http.service";
import { Trash } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  description: z.string().max(200).optional(),
});

interface CategoryItemProps {
  category: Category;
  handleUpdateCategory: (category: Category) => void;
  handleDeleteCategory: (codeValue: string) => void;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ category, handleUpdateCategory, handleDeleteCategory }) => {
  const [showDialog, setShowDialog] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: category.name,
      description: category.description,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await httpService.put(`/category/${category.codeValue}`, {
        CodeValue: category.codeValue,
        name: values.name,
        description: values.description,
        image: category.image,
      });

      handleUpdateCategory({
        ...category,
        name: values.name,
        description: values.description || "",
        image: category.image,
      });
      toast.success("Category updated successfully");
      setShowDialog(false);
    } catch (error) {
      toast.error("Failed to update category");
    }
  }

  async function handleDelete() {
    try {
      await httpService.delete(`/category/${category.codeValue}`);
      handleDeleteCategory(category.codeValue);
      toast.success("Category deleted successfully");
    } catch (error) {
      toast.error("Failed to delete category");
    }
  }

  return (
    <div
      className="border p-4 min-h-40 rounded-xl flex flex-col justify-between cursor-pointer gap-2 bg-card"
      key={category.codeValue}
    >
      <div className="h-28 bg-muted rounded-lg"></div>

      <p>{category.name}</p>
      <p className="text-xs text-muted-foreground">{category.description}</p>
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">10 sản phẩm</p>

        <div className="flex items-center gap-2">
          <Button variant={"outline"} onClick={handleDelete}>
            <Trash />
          </Button>
          <Dialog open={showDialog} onOpenChange={setShowDialog}>
            <DialogTrigger asChild>
              <Button>Edit</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Category Name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Description" className="resize-none" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit">Update</Button>
                  </form>
                </Form>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default CategoryItem;
