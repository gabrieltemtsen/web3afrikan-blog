// pages/PostForm.tsx

import React, { useState } from "react";
import {
  Box,
  Container,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Card,
  CardBody,
  Center,
  Heading,
  Select,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Spinner,
} from "@chakra-ui/react";
import { Navbar } from "@/components";
import { Web3Storage } from "web3.storage";
import { prepareWriteContract, writeContract } from '@wagmi/core'
import { readContract } from '@wagmi/core'
import { getAccount } from '@wagmi/core'
import { BLOG_MANAGER_CONTRACT_ADDRESS, BLOG_MANAGER_ABI } from "@/contracts/constants";
import axios from "axios";
import { pushImgToStorage, putJSONandGetHash } from "@/utils/gateway";

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEQyQkNCYTBDQzMyMDJjMmZkQkUzMjFhZjdmODBiOEQ2NzZCRTkyOTciLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2Nzk4OTI0NzE5OTYsIm5hbWUiOiJUb2tlbiJ9.QQbjt0glkuKqkJ-C4-5q8LOGUFIIhjaIX7FZHohSQhw'

type Comment = {
  comment_address: string;
  comment_content: string;
};

type Post = {
  post_ID: number;
  post_image: any;
  post_title: string;
  post_description: string;
  post_content: string;
  post_category: string;
  poster_address: any;
  comments: Comment[];
};

type ImageState = {
  file: File | null
  previewUrl: string | null
}
type PostDetail = {
  postId: number;
  postImage: string;
  postTitle: string;
  postCategory: string;
  postDescription: string;
  postContent: string;
  posterWalletAddress: any;
  noOfComments: number;
  postSCAddress: string;
  comments: Comment[];
};
const PostForm: React.FC = () => {
  const [latestCid, setLatestCid] = useState<string>("");
  const [allPosts, setAllPosts] = useState<PostDetail[]>([]);
  const [noOfPosts, setNoOfPosts] = useState<number>(0);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<ImageState>({
    file: null,
    previewUrl: null,
  })
  const [Filename, setFilename] = useState('');

  const handleImageChange: any = (e: any) => {
    setImage(e.target.files[0]);
    setFilename(URL.createObjectURL(e.target.files[0]))    
};

const getAllPosts = async()=> {


  const allPostsAddresses: any = await readContract({
    address: BLOG_MANAGER_CONTRACT_ADDRESS,
    abi: BLOG_MANAGER_ABI,
    functionName: 'getPosts',
  })
 
  const allPosts:any = await readContract({
    address: BLOG_MANAGER_CONTRACT_ADDRESS,
    abi: BLOG_MANAGER_ABI,
    functionName: 'getPostsData',
    args: [allPostsAddresses]
  })
  
  setNoOfPosts(allPosts.posterAddress.length);
 
   
   

}



  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    
    e.preventDefault();
    setLoading(true)
 
    await getAllPosts();
    try {
      const account = getAccount();
      if(!title  || !category  || !body  || !description  || !image){
        return alert('Fill all the Fields');
      }
      const imageCid = await pushImgToStorage(image);
      console.log(imageCid);
      const storage = new Web3Storage({ token });

      if (noOfPosts === 0) {
        const postObj: Post[] = [
          {
            post_ID: noOfPosts,
            post_image: imageCid,
            post_description: description,
            post_title: title,
            post_content: body,
            post_category: category,
            poster_address: account.address,
            comments: [], // no comments when creating a new post, set to empty array
          },
        ];
        const buffer = Buffer.from(JSON.stringify(postObj));
        console.log("Post Data:", { postObj   });
  
        const files = [new File([buffer], "post.json")];
        const cid = await storage.put(files);
       
        //store image on IPFS
      
       
        console.log('loading',imageCid);
        const config = await prepareWriteContract({
          address: BLOG_MANAGER_CONTRACT_ADDRESS,
          abi: BLOG_MANAGER_ABI,
          functionName: 'createPost',
          args: [cid],
        })
        const data = await writeContract(config);
  
        const tx  = await data.wait()
  
        if(tx) {
          console.log('Posted')
        setLoading(false)
        setLatestCid(cid);

        await getAllPosts();
        setTitle('')
        setDescription('')
        setBody('')
        setImage({
          file: null,
          previewUrl: null,
        })
        }

      } else {
        console.log(`latestCid`)
        //get existing file data from ipfs link
        await getAllPosts();
        let config: any = {
          method: "get",
          url: `https://${latestCid}.ipfs.w3s.link/post.json`,
          headers: {},
        };
        const axiosResponse = await axios(config);
        const postDataObject: Post[] = axiosResponse.data;
        console.log(noOfPosts)

        let postObj: Post = 
          {
            post_ID: noOfPosts,
            post_image: imageCid,
            post_description: description,
            post_title: title,
            post_content: body,
            post_category: category,
            poster_address: account.address,
            comments: [], // no comments when creating a new post, set to empty array
          };
        
        postDataObject.push(postObj);

        const buffer = Buffer.from(JSON.stringify(postDataObject));

        const newfile = [new File([buffer], "post.json")];
        const cid = await storage.put(newfile);
        
        //store image on IPFS
        console.log('loading',imageCid);
        const configure = await prepareWriteContract({
          address: BLOG_MANAGER_CONTRACT_ADDRESS,
          abi: BLOG_MANAGER_ABI,
          functionName: 'createPost',
          args: [cid],
        })
        const data = await writeContract(configure);
  
        const tx  = await data.wait()
  
        if(tx) {
          console.log('Posted')
        setLoading(false)
        setLatestCid(cid);
        await getAllPosts();
        setTitle('')
        setDescription('')
        setBody('')
        setImage({
          file: null,
          previewUrl: null,
        })
        }

      
      }

     
      
      
      
    } catch (error) {
      setLoading(false)
      console.log(error)
      
    }
   
  };
console.log(noOfPosts)

  return (
    <>
        <Navbar/>
        <Modal
    isOpen={loading}
    onClose={() => {
      !loading
    }}
    isCentered
  >
    <ModalOverlay />
    <ModalContent>
      <ModalBody>
        <Center>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Center>
      </ModalBody>
    </ModalContent>
  </Modal>

        <Center>
            <Heading mt={5} as="h1" size="2xl">
           Create Blog Post
            </Heading>
            </Center>
        

        <Container mt={10}>
      <Box maxWidth="500px" margin="0 auto">
        <Card>
          <CardBody>
            <form onSubmit={handleSubmit}>
              <FormControl mb={4}>
                <FormLabel>Title</FormLabel>
                <Input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Description</FormLabel>
                <Input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Category</FormLabel>
                <Select onChange={(e) => setCategory(e.target.value)} placeholder='Select category'>
                <option value='Entertainment'>Entertainment</option>
                <option value='Tutorials'>Tutorials</option>
                <option value='News'>News</option>
              </Select>

              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Body</FormLabel>
                <Textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Image</FormLabel>
                <Input type="file" onChange={handleImageChange} />
              </FormControl>
              <Button type="submit" colorScheme="teal">
                Submit
              </Button>
            </form>
          </CardBody>
        </Card>
      </Box>
    </Container>
    </>
  );
};

export default PostForm;
