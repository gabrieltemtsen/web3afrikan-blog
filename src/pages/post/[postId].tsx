import React, { useEffect, useState } from 'react'
import {
  Box,
  Heading,
  Link,
  Image,
  Text,
  Divider,
  HStack,
  Tag,
  Wrap,
  WrapItem,
  SpaceProps,
  useColorModeValue,
  Container,
  VStack,
  FormControl,
  FormLabel,
  Textarea,
  Button,
} from '@chakra-ui/react'
import { Navbar } from '@/components'
import { useRouter } from 'next/router'
import { Web3Storage } from 'web3.storage'
import { BLOG_POST_ABI } from '@/contracts/constants'
import { readContract } from '@wagmi/core'
import { Address } from 'wagmi'
import axios from 'axios'
import { getJSONFromCID } from '@/utils/gateway'
import { getAccount,prepareWriteContract, writeContract } from '@wagmi/core'
import {
  BLOG_MANAGER_CONTRACT_ADDRESS,
  BLOG_MANAGER_ABI,
} from '@/contracts/constants'
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEQyQkNCYTBDQzMyMDJjMmZkQkUzMjFhZjdmODBiOEQ2NzZCRTkyOTciLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2Nzk4OTI0NzE5OTYsIm5hbWUiOiJUb2tlbiJ9.QQbjt0glkuKqkJ-C4-5q8LOGUFIIhjaIX7FZHohSQhw'

type Comment = {
  comment_address: Address
  comment_content: string
}


type Post = {
  post_ID: number
  post_image: any
  post_title: string
  post_description: string
  post_content: string
  post_category: string
  poster_address: any
  comments: Comment[]
}







export const Post = () => {

  const router = useRouter();

  const post = router.query.postSCAddress as Address;
  const post_id = router.query.post_Id as string;

 const [postCID, setPostCID] = useState('');
 const [latestCID, setLatestCID] = useState('');
 const [title, setTitile] = useState('');
 const [body, setBody] = useState('');
 const [imageUrl, setImageUrl] = useState('');
 const [author, setAuthor] = useState('');
 const [numberOfComments, setNumberOfcomments] = useState(0);
 const [commentContent, setCommentContent] = useState('');
 const [currentPostData, setCurrentPostData] = useState<Post>({
  post_ID: 0,
  post_image: '',
  post_title: '',
  post_description: '',
  post_content: '',
  post_category: '',
  poster_address: '',
  comments: []
});
 const [comments, setComments] = useState([])

 

 const [description, setDescription] = useState('');

  const getPostData = async () => {
    const postCID: any = await readContract({
      address: post,
      abi: BLOG_POST_ABI,
      functionName: 'postCID',
    })
    setPostCID(postCID)
    const numComments: any = await readContract({
      address: post,
      abi: BLOG_POST_ABI,
      functionName: 'commentListLength',
    })
    setNumberOfcomments(numComments.toNumber())
    const comments: any = await readContract({
      address: post,
      abi: BLOG_POST_ABI,
      functionName: 'getComments',
    })
    console.log(comments)
    
  }



  const getPostDetails = async ()=> {
    try {
      let config: any = {
        method: 'get',
        url: `https://${postCID}.ipfs.w3s.link/post.json`,
        headers: {},
      }
      const axiosResponse = await axios(config);
      const data = axiosResponse.data[post_id];
      console.log(data)
      setCurrentPostData(data)
      setTitile(data.post_title)
      setBody(data.post_content)
      setImageUrl(data.post_image)
      setDescription(data.post_description)
      setAuthor(data.poster_address)
      console.log(data.comments)
      setComments(data.comments)
     
      
    } catch (error) {

      console.log(error)
      
    }

  

  }
  const getLatestPostData = async () => {
    console.log(`latestCID = `, latestCID)

    let config: any = {
      method: 'get',
      url: `https://${latestCID}.ipfs.w3s.link/post.json`,
      headers: {},
    }
    const axiosResponse = await axios(config);
    const data = axiosResponse.data[post_id];

    console.log(`Latest: `,data)

  }
  

   const postComment = async (e: any) =>{
    e.preventDefault();
    const account = getAccount();
    const storage = new Web3Storage({ token });

    let config: any = {
      method: "get",
      url: `https://${postCID}.ipfs.w3s.link/post.json`,
      headers: {},
    };
   


    const axiosResponse = await axios(config);
    const postDataObject: Post[] = axiosResponse.data;
    

    //filter and get the rest of the post data
    let otherPostData: Post[] = postDataObject.filter(
      (data) => data.post_ID !== Number(post_id));
    
    //filter out to get current post data to add comment object in
    let getCurrentPostData: Post = postDataObject.filter(
      (data) => data.post_ID === Number(post_id))[0];

    const userComment = {
      comment_address: account.address as Address,
      comment_content: commentContent,
    };
     getCurrentPostData.comments.push(userComment);

     //add back current post data back into rest of the post data
     otherPostData.push(getCurrentPostData);
     console.log(`CurrentPostDATA,`, getCurrentPostData)
     console.log(`otherPostDATA,`, otherPostData)

     //store new JSON object in IPFS
     const buffer = Buffer.from(JSON.stringify(otherPostData));

     const newfile = [new File([buffer], "post.json")];
     const newCid = await storage.put(newfile);
     console.log(newCid);
     setLatestCID(newCid);

     
     const configure = await prepareWriteContract({
       address: BLOG_MANAGER_CONTRACT_ADDRESS,
       abi: BLOG_MANAGER_ABI,
       functionName: 'addComment',
       args: [newCid, post],
     })
     const data = await writeContract(configure)

     const tx = await data.wait()
     getLatestPostData();
     console.log(`yeah`);
      getPostDetails();
      getPostData
     console.log(currentPostData)
 

   }
   
   useEffect(() => {
    getPostData();
    getPostDetails();
  }, [postCID, numberOfComments])

  return (
    <>
      <Navbar />
      <Container maxW={'7xl'} p="12">
        <Heading as="h6">Read Article</Heading>
        <Box
          marginTop={{ base: '1', sm: '5' }}
          display="flex"
          flexDirection={{ base: 'column', sm: 'row' }}
          justifyContent="space-between"
        >
          <Box
            display="flex"
            flex="1"
            marginRight="3"
            position="relative"
            alignItems="center"
          >
            <Box
              width={{ base: '90%', sm: '55%' }}
              zIndex="2"
              marginLeft={{ base: '0', sm: '5%' }}
              marginTop="5%"
            >
              <Link textDecoration="none" _hover={{ textDecoration: 'none' }}>
                <Image
                  borderRadius="lg"
                  src={`https://ipfs.io/ipfs/${imageUrl}`}
                  alt="some good alt text"
                  objectFit="contain"
                 
                />
              </Link>
            </Box>
            <Box
              zIndex="1"
              width="100%"
              position="absolute"
              height="100%"
            ></Box>
          </Box>
          <Box
            display="flex"
            flex="1"
            flexDirection="column"
            justifyContent="center"
            marginTop={{ base: '3', sm: '0' }}
          >
            <Heading marginTop="1">
              <Link textDecoration="none" _hover={{ textDecoration: 'none' }}>
                {title}
              </Link>
            </Heading>
            <Text
              as="p"
              marginTop="2"
              color={useColorModeValue('gray.700', 'gray.200')}
              fontSize="lg"
            >
              {description}
            </Text>
            <Divider marginTop="5" mb={5} />
            <Text>By: {author}</Text>
            {/* <Text>Posted: 2023-04-06T19:01:27Z</Text> */}
          </Box>
        </Box>

        <Divider marginTop="5" />

        <VStack paddingTop="40px" spacing="2" alignItems="flex-start">
          <Heading as="h2">{title}</Heading>
          <Text as="p" fontSize="lg" width={'89%'}>
           {body}
          </Text>
         
        </VStack>
        <Divider marginTop="5" mb={5} />
        <Heading> {numberOfComments} Comments</Heading>
        
     
        {currentPostData.comments.map((data) => {
          console.log(data)
          return (
            <>
            <Text>Comment by: {data.comment_address}</Text>
            <Text>Comment: {data.comment_content} </Text>
            <Divider marginTop="5" mb={5} />
            </>
          )

        }
         
          
         
        

        )}
         <Divider marginTop="5" mb={5} />
     

        

       

        <Heading> Add Comment</Heading>

        <FormControl mb={4}>
          <FormLabel>Comment: </FormLabel>
          <Textarea
            width={'50%'}
            onChange={(e) => setCommentContent(e.target.value)}
          />
        </FormControl>
        <Button onClick={postComment} type="submit" colorScheme="teal">
          Submit
        </Button>
      </Container>
    </>
  )
}

export default Post