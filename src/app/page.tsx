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

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const onUpdateProduct = (updatedProduct: IProduct) => {
    setProducts((prevProducts) =>
      prevProducts.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  };
  const deletePost = (id: string) => {
    console.log("Usuário deletado com ID:", id);
    setProducts((prevProducts) => prevProducts.filter((p) => p.id !== id));
  };

  return (
    
    <div>
        <div>
      <HeaderProduct setOpenModal={handleOpenModal} />
      <ListProducts 
          product={products}
       setProducts={setProducts}
       deletePost={deletePost}
        onUpdateProduct={onUpdateProduct} />

      <FormProduct 
      isOpen={openModal} 
      setModalOpen={setOpenModal}
       onAddProduct={addProduct} />
    </div>
</div>
      );
}
