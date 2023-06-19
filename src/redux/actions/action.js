export const ADD =(item)=>{
    return{
        type:"ADD_CART",
        payload:item
    }
}
export const removeFromCart = (productId) => {
    return {
      type: 'REMOVE_FROM_CART',
      payload: productId,
    };
  };