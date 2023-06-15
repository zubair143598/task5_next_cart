/* eslint-disable @next/next/no-img-element */
import { useQuery } from "react-query";
import {
  Card,
  Stack,
  Text,
  Flex,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Divider,
  Button,
} from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import {BsCartPlus} from "react-icons/bs"

const fetchProducts = async () => {
  try {
    const { data } = await axios.get("https://dummyjson.com/products");
    return data;
  } catch (error) {
    throw Error("unable to get data");
  }
};

const NextChart = () => {
  const { data, isLoading, error } = useQuery("products", fetchProducts);
  console.log(data);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (data) {
    return (
    <div className="px-[10rem]">
      <div className="grid    grid-cols-4">
        {data.products.map((product) => (
          <div
            key={product.id}
            className="flex   mx-2 items-center flex-col py-3"
          >
            <Card  maxW="sm">
              <CardBody  className="rounded-t bg-[#444]">
                {product.images.length > 0 && (
                  <img
                    src={product.images[0]}
                    borderRadius="lg"
                    className="w-[100%] h-[250px] rounded-t  "
                    alt={product.images[0]}
                  />
                )}
                <Stack className="p-[1rem] text-white" mt="6" spacing="3">
                  <Heading size="lg">{product.title} </Heading>
                  <Text>
                    <p>{product.description.slice(0, 50)} ... <span className="  text-[#da0037] ">read more</span></p>
                  </Text>
                  <Text color="#da0037" className=" text-[30px] font-[500] ">
                   ${product.price}
                  </Text>
                </Stack>
              </CardBody>
              
              <CardFooter className="rounded-b bg-[#444]" >
               
                  <Button className="w-[100%]" variant="solid" colorScheme="red">
                 <BsCartPlus className="mx-2"/> Add to cart
                  </Button>
                  
                
              </CardFooter>
            </Card>
          </div>
        ))}
        </div>
        
                </div>
    );
  }

  return null;
};

export default NextChart;
