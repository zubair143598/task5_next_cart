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
import React, { useState } from "react";
import { BsCartPlus } from "react-icons/bs";

const Pagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [productsData, setProductsData] = useState([]);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("https://dummyjson.com/products");
      setProductsData(data.products);
      return data;
    } catch (error) {
      throw Error("unable to get data");
    }
  };

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;

  const currentPost = productsData.slice(firstPostIndex, lastPostIndex);

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
              <Card maxW="sm">
                <CardBody className="rounded-t bg-[#444]">
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
                      <p>
                        {product.description.slice(0, 50)} ...{" "}
                        <span className="  text-[#da0037] ">read more</span>
                      </p>
                    </Text>
                    <Text color="#da0037" className=" text-[30px] font-[500] ">
                      ${product.price}
                    </Text>
                  </Stack>
                </CardBody>

                <CardFooter className="rounded-b bg-[#444]">
                  <Button
                    className="w-[100%]"
                    variant="solid"
                    colorScheme="red"
                  >
                    <BsCartPlus className="mx-2" /> Add to cart
                  </Button>
                </CardFooter>
              </Card>
            </div>
          ))}

        </div>
        <div className="py-10">

        <Flex className="flex justify-between">
            <button className="bg-red-700 px-4 py-2 mx-3 rounded-xl" >prev</button>
            <button className="bg-green-700 px-4 py-2 mx-3 rounded-xl" >Next</button>
        </Flex>
          </div>
      </div>
    );
  }

  return null;
};

export default Pagination;
