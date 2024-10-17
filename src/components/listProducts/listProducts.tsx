"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import EditFormProduct from "../editProduct/editProduct";
import { NewProduct } from "../formProduct/formProduct";
import { useState } from "react";
import { ModalDelete } from "../deletProduct/deletProduct";
import { useEffect } from "react";
export interface IProduct {
  id?: string;
  name: string;
  description: string;
  price: number;
  amount: number;
}

export interface IListProducts {
  product: IProduct[];
  setProducts: React.Dispatch<React.SetStateAction<IProduct[]>>;
  deletePost: (id: string) => void;
}

export default function ListProducts({ product, setProducts, deletePost }: IListProducts) {
  const [productEdit, setProductEdit] = useState<NewProduct | undefined>(undefined);
  const [openDelete, setOpenDelete] = useState<string | null>(null); 

  const onUpdateProduct = (updatedProduct: IProduct) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );

  };

  useEffect(() => {
    console.log(product, "console de product");
  }, [product]);

  return (
    <Table>
      <TableCaption>List of registered products</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {product.map((singleProduct) => (
          <TableRow key={singleProduct.id }>
            <TableCell className="font-medium">{singleProduct.name}</TableCell>
            <TableCell>{singleProduct.description}</TableCell>
            <TableCell>{singleProduct.price}</TableCell>
            <TableCell>{singleProduct.amount}</TableCell>

            <TableCell className=" flex justify-start items-center">
             
              <button onClick={() => setProductEdit(singleProduct)}>
                <img src="/images/edit.png" className="w-[25px]" alt="Edit" />
              </button>
              {productEdit && (
               <EditFormProduct
               isOpen={!!productEdit}
               setModalOpen={() => setProductEdit(undefined)}
               onEditProduct={(updatedProduct) => {
                 onUpdateProduct(updatedProduct);
                 setProductEdit(undefined);
               }}
               product={productEdit}
             />
             
              )}

              
              <button onClick={() => setOpenDelete(singleProduct.id || null)}>
                <img src="/images/delete.png" className="w-[20px]" alt="Delete" />
              </button>

              {openDelete === singleProduct.id && (
                <ModalDelete
                  isOpenDelete={true} 
                  setOpenDelete={() => setOpenDelete(null)}
                  deletePost={() => {
                    if (singleProduct.id) {
                      deletePost(singleProduct.id);
                    }
                    setOpenDelete(null); 
                  }}
                />
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

