import { Box, Button, Heading, HStack, IconButton, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useColorModeValue, useDisclosure, useToast, VStack } from "@chakra-ui/react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { useProductStore } from "../store/product";
import { useState } from "react";

const ProductCard = ({product}) => {
    const [updatedProduct, setUpdatedProduct] = useState(product);

    const textColor = useColorModeValue("gray.600", "gray.200");
	const bg = useColorModeValue("white", "gray.800");

    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const {deleteProduct, updateProduct}=useProductStore();

    const handleDeleteProduct = async (pid) => {
        const {success,message} = await deleteProduct(pid);
        
        toast({
            title: success ? 'Success' : 'Error',
            description: message ,
            type: success ? 'success' : 'error', 
            meta: {
              closable: true, 
            },
            duration:3000
        });
    }

    const handleUpdateProduct = async (pid, updatedProduct) =>{
      const {success, message} = await updateProduct(pid,updatedProduct);
      onClose();
      if(!success){
        toast({
            title:"Error",
            description:message,
            status:"error",
            duration: 3000,
            isClosable: true
        });
        }else{
            toast({
                title:"Success",
                description:"Product updated successfully",
                status:"success",
                duration: 3000,
                isClosable: true
            })
        }
    }
    
  return (
    <Box
    shadow='lg'
    rounded='lg'
    overflow='hidden'
    transition='all 0.3s'
    _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
    bg={bg}
    >
        <Image src={product.image} alt={product.name} h={48} w='full' objectFit='cover' />

        <Box p={4}>
            <Heading as='h3' size='md' mb={2}>
                {product.name}
            </Heading>

            <Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>
                ${product.price}
            </Text>

            <HStack spacing={2}>
                <IconButton icon={<FiEdit size={20}/>}  colorScheme='blue' onClick={onOpen} /> 
                <IconButton icon={<RiDeleteBin6Line size={20}/>}  colorScheme='red' onClick={()=>handleDeleteProduct(product._id)} />
            </HStack>
        </Box>

        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
                <Input placeholder='Product Name' name='name' value={updatedProduct.name} onChange={(e)=> setUpdatedProduct({...updatedProduct, name: e.target.value})} />
                <Input placeholder='Price' name='price' type='number' value={updatedProduct.price} onChange={(e)=> setUpdatedProduct({...updatedProduct, price: e.target.value})} />
                <Input placeholder='Image URL' name='image' value={updatedProduct.image} onChange={(e)=> setUpdatedProduct({...updatedProduct, image:e.target.value})} />
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={()=>handleUpdateProduct(product._id, updatedProduct)} >
              Update
            </Button>
            <Button variant='ghost' onClick={onClose}>
                Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
        </Modal>
    </Box>
  );
};

export default ProductCard;
