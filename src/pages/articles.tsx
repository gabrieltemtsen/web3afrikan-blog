// pages/blog.tsx

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Grid,
  GridItem,
  Center,
} from '@chakra-ui/react'
import { Footer, Navbar } from '@/components'
import { readContract } from '@wagmi/core'
import {
  BLOG_MANAGER_ABI,
  BLOG_MANAGER_CONTRACT_ADDRESS,
} from '@/contracts/constants'
import axios from 'axios'
import { getJSONFromCID } from '@/utils/gateway'
import { useRouter } from 'next/router'

interface Article {
  id: number
  title: string
  category: string
  image: string
  description: string
  date: string
  author: string
  comments: number
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
type PostDetail = {
  postId: number
  postImage: string
  postTitle: string
  postDescription: string
  postCategory: string
  postContent: string
  posterWalletAddress: string
  noOfComments: number
  postSCAddress: string
  comments: Comment[]
}

const articles: Article[] = [
  {
    id: 1,
    title: 'Being a Web3 developer',
    category: 'Entertainment',
    image:
      'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80',
    description:
      'Being a web3 developer i not easy take a look at this article',
    date: 'July',
    author: 'gabe.eth',
    comments: 0,
  },
  {
    id: 1,
    title: 'Being a Web3 developer',
    category: 'Entertainment',
    image:
      'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80',
    description:
      'Being a web3 developer i not easy take a look at this article',
    date: 'July',
    author: 'gabe.eth',
    comments: 0,
  },
  {
    id: 1,
    title: 'Being a Web3 developer',
    category: 'Music',
    image:
      'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80',
    description:
      'Being a web3 developer i not easy take a look at this article',
    date: 'July',
    author: 'gabe.eth',
    comments: 0,
  },
]

const BlogPage = () => {
  const categorys = Array.from(
    new Set(articles.map((article) => article.category)),
  )
  const [searchTerm, setSearchTerm] = useState('')
  const [latestCid, setLatestCid] = useState<string>('')
  const [allPosts, setAllPosts] = useState<PostDetail[]>([])
  const [noOfPosts, setNoOfPosts] = useState<number>(0)

  const categories = Array.from(
    new Set(allPosts.map((post) => post.postCategory)),
  )

  const handleSearchChange = (term: string) => {
    setSearchTerm(term)
  }

  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getAllPosts = async () => {
    try {
      const allPostsAddresses: any = await readContract({
        address: BLOG_MANAGER_CONTRACT_ADDRESS,
        abi: BLOG_MANAGER_ABI,
        functionName: 'getPosts',
      })

      const allPosts: any = await readContract({
        address: BLOG_MANAGER_CONTRACT_ADDRESS,
        abi: BLOG_MANAGER_ABI,
        functionName: 'getPostsData',
        args: [allPostsAddresses],
      })
      setLatestCid(allPosts.postCID)
      setNoOfPosts(allPosts.posterAddress.length)

      let new_posts = []
      //iterate and loop through the data retrieve from the blockchain
      for (let i = 0; i < allPosts.posterAddress.length; i++) {
        let posterWalletAddress: string = allPosts.posterAddress[i]
        let noOfComments: number = allPosts.numberOfComments[i].toNumber()
        let postSCAddress = allPostsAddresses[i]

        //get postId
        const postId: any = await readContract({
          address: BLOG_MANAGER_CONTRACT_ADDRESS,
          abi: BLOG_MANAGER_ABI,
          functionName: 'postIDs',
          args: [postSCAddress],
        })

        if (allPosts.postCID !== 0) {
          //get file data using axios from url
          // const seeData = await getJSONFromCID(allPosts.postCID)
          let config: any = {
            method: 'get',
            url: `https://${allPosts.postCID}.ipfs.w3s.link/post.json`,
            headers: {},
          }
          const axiosResponse = await axios(config)

          const postDataObject: Post[] = axiosResponse.data

          console.log(postDataObject)

          const getCurrentPostTitle = postDataObject.filter(
            (data) => data.post_ID === postId.toNumber(),
          )[0].post_title
          const getCurrentPostContent = postDataObject.filter(
            (data) => data.post_ID === postId.toNumber(),
          )[0].post_content
          const getCurrentPostDescription = postDataObject.filter(
            (data) => data.post_ID === postId.toNumber(),
          )[0].post_description
          const getCurrentPostCategory = postDataObject.filter(
            (data) => data.post_ID === postId.toNumber(),
          )[0].post_category
          const getCurrentPostImage = postDataObject.filter(
            (data) => data.post_ID === postId.toNumber(),
          )[0].post_image

          //Data of each Post
          let newPost: PostDetail = {
            postTitle: getCurrentPostTitle,
            postImage: getCurrentPostImage,
            postDescription: getCurrentPostDescription,
            postContent: getCurrentPostContent,
            postCategory: getCurrentPostCategory,
            postId: postId.toNumber(),
            posterWalletAddress, //user wallet address
            noOfComments,
            postSCAddress, //Post smart contract address
            comments: [],
          }
          new_posts.push(newPost)
        }
      }
      setAllPosts(new_posts)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getAllPosts()
  }, [noOfPosts])
  return (
    <>
      <Navbar onSearchChange={handleSearchChange} />
      <Container maxW="xl" mt={8}>
        <VStack spacing={9}>
          <Center>
            <Heading as="h1" size="2xl">
              Articles
            </Heading>
          </Center>

          {categories.map((category) => (
            <>
              <Box key={category}>
                <Box borderBottom="1px" borderColor="gray.300" pb={2}>
                  <Heading as="h2" size="lg">
                    {category}
                  </Heading>
                </Box>
                <Grid
                  templateColumns="repeat(5, minmax(300px, 4fr))"
                  gap={9}
                  mt={4}
                >
                  {allPosts
                    .filter((post) => post.postCategory === category)
                    .map((post) => (
                      <>
                        <Link
                          href={{
                            pathname: `/post/${post.postSCAddress}&${post.postId}`,
                            query: {
                              postSCAddress: post.postSCAddress,
                              post_Id: post.postId,
                            },
                          }}
                        >
                          <GridItem key={post.postId}>
                            <Box borderRadius="md" p={4}>
                              <Box
                                w="100%"
                                h="120px"
                                transition="0.3s ease-in-out"
                                _hover={{
                                  transform: 'scale(1.05)',
                                }}
                                bg={`url(https://ipfs.io/ipfs/${post.postImage})`}
                                bgSize="cover"
                                bgPosition="center"
                                borderRadius="md"
                                mb={2}
                              />
                              <Text fontSize="lg">{post.postTitle}</Text>
                              <Text color={'gray.500'}>
                                {post.postDescription}
                              </Text>
                              <Text color={'gray.450'}>
                                By: {post.posterWalletAddress}
                              </Text>
                              <Text color={'gray.450'}>Posted: {}</Text>
                            </Box>
                          </GridItem>
                        </Link>
                      </>
                    ))}
                </Grid>
              </Box>
            </>
          ))}
        </VStack>
      </Container>
      <Footer />
    </>
  )
}

export default BlogPage
