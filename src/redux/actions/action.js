export const ADD =(item)=>{
    return{
        type:"ADD_CART",
        payload:item
    }
}
export const REMOVE = (productId) => {
  return {
    type: "REMOVE_CART",
    payload: productId,
  };
};