import React from 'react'
import { useParams } from 'react-router-dom'

const DeleteProduct = () => {
    const {id} = useParams();
    useEffect(()=>{

        deleteProduct();
    },[]) 

   async function deleteProduct(){

        try{
            const res = await api.delete(`/products/${id}`);
            alert("Product deleted successfully");
            navigate("/admin/products");
        }catch(err){
            console.error(err);
            alert("Failed to delete product");
        }
    }
     return (
    <div>


    </div>
  )
}

export default DeleteProduct