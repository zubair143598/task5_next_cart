/* eslint-disable @next/next/no-img-element */
import React from "react";
import {
  Flex,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { AiOutlineShoppingCart, AiOutlineDelete } from "react-icons/ai";
import { REMOVE } from "@/src/redux/actions/action";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const getdata = useSelector((state) => state.cartreducer.carts);
  console.log(getdata);

  const dispatch = useDispatch();

  const handleRemoveFromCart = (productId) => {
    dispatch(REMOVE(productId));
    toast("Item removed from cart");
  };
  // toast("Item removed from cart");
 


  return (
    <>
      <div className="bg-[#7D0B28]  relative z-[4] rounded-lg flex justify-between px-4">
        <div className="flex">
          <img
            className="w-[40px] h-[40px] mt-2"
            src="/assets/logo.webp"
            alt=""
          />
          <p className="text-white text-[40px] font-[700]">NC</p>
        </div>

        <div className="cart flex rounded flex-row my-2 items-center">
          <button
            onClick={onOpen}
            ref={btnRef}
            className="flex py-2 px-3 text-white font-[600]"
          >
            <AiOutlineShoppingCart className="mt-1 mr-2" /> Cart
          </button>
          <Drawer
            className=""
            isOpen={isOpen}
            placement="right"
            onClose={onClose}
            finalFocusRef={btnRef}
          >
            <DrawerOverlay />
            <DrawerContent className="text-white">
              <DrawerCloseButton />
              <DrawerHeader className="text-white">Selected Items</DrawerHeader>

              <DrawerBody>
                
                {getdata.map((product) => (
                  <div
                    className="flex relative my-4 bg-[#333333] p-2 rounded text-white"
                    key={product.id}
                  >
                    <div className="mt-1">
                      <img
                        className="w-[50px] h-[50px] rounded"
                        src={product.images[0]}
                        alt={product.title}
                      />
                    </div>
                    <div className="text-[13px] flex flex-col justify-evenly ml-3">
                      <p>{product.title}</p>
                      <div className="">
                        <p className="text-[15px] font-[900] text-[#da0037]">
                          ${product.price}{" "}
                        </p>
                        <button
                          className="absolute right-[10px] bottom-[10px]"
                          onClick={() => handleRemoveFromCart(product.id)}
                        >
                          <AiOutlineDelete color="gray" size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </DrawerBody>

              <DrawerFooter className="text-white">
                <p>Total</p>
                <p>
                  $
                  {getdata.reduce(
                    (total, product) => total + product.price,
                    0
                  )}
                </p>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
      <ToastContainer position="bottom-right" />
    </>
  );
};

export default Navbar;
