"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

export interface IProduct {
    id?:string,
    name: string,
    description: string,
    price: number, 
    amount: number
}

export interface FormProductProps {
    isOpen: boolean,
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>; 
    onEditProduct: (product: NewProduct) => void;
    product: NewProduct,
}

const newProductSchema = z.object({
  id: z.string().optional(),
  name: z.string() .min(1, { message: 'The name field needs to be filled in' }) ,
  description: z.string().min(1, { message: "The description needs to be filled in" }).regex(/^[A-Za-z\s]+$/, { message: "The description must contain only letters" }),
  price: z.coerce.number() .min(0, { message: "The price must be 0 or greater" }),
  amount: z.coerce.number()  .min(0, { message: "The amount must be 0 or greater" })
});

export type NewProduct = z.infer<typeof newProductSchema>;

export default function EditFormProduct({ isOpen, setModalOpen, onEditProduct, product }: FormProductProps) {
  const form = useForm<NewProduct>({
    resolver: zodResolver(newProductSchema),
    defaultValues: product,
  
  });

  const { handleSubmit, formState: { errors, isSubmitting }, reset } = form;

  const onSubmit: SubmitHandler<NewProduct> = (data) => {
    onEditProduct({...product, ...data})
    setModalOpen(false)
    console.log(data, "Usuário atualizado");
    reset();
  };

  React.useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, [isOpen, reset]);
  
  if (!isOpen) return null;

  return (
    <section className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-10">
      <div className="flex justify-center items-center w-full h-screen">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle className="text-[22px]">Edit product</CardTitle>
            <CardDescription>Fill in the following information:</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormField control={form.control} name="name" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input id="name" placeholder="Name of your product" {...field} />
                    </FormControl>
                    <FormMessage>{errors.name?.message}</FormMessage>
                  </FormItem>
                )} />

                <FormField control={form.control} name="description" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input id="description" placeholder="Enter the description" {...field} />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )} />

                <FormField control={form.control} name="price" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input id="price" placeholder="Enter the price" type="number" {...field} />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )} />

                <FormField control={form.control} name="amount" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input id="amount" placeholder="Enter the amount" type="number" {...field} />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )} />

                <div className="flex justify-center items-center gap-[40px]">
                  <Button type="submit" disabled={isSubmitting} className="mt-4">
                    Submit
                  </Button>
                  <Button type="button" className="mt-4" onClick={() => setModalOpen(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
