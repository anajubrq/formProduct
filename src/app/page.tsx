"use client"
import FormProduct, { IProduct, NewProduct } from "@/components/formProduct/formProduct";
import HeaderProduct from "@/components/headerPorduct/headerProduct";
import ListProducts from "@/components/listProducts/listProducts";
import { useState } from "react";


export default function Home() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [openModal, setOpenModal] = useState(false);

  const addProduct = (newProduct: NewProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
    setOpenModal(false);
  };

  const editProduct = (newProduct: NewProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
    setOpenModal(false);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const deletePost = (id: string) => {
    console.log("Usuário deletado com ID:", id);
    setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
  };

  return (
    
    
        <div>
      <HeaderProduct setOpenModal={handleOpenModal} />
      <ListProducts 
          product={products}
       setProducts={setProducts}
       deletePost={deletePost}
      />

      <FormProduct 
      onEditProduct={editProduct}
      isOpen={openModal} 
      setModalOpen={setOpenModal}
       onAddProduct={addProduct} 
       />
    </div>

      );
}
