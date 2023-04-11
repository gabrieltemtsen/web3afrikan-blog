// pages/blog.tsx

import React, { useState } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Grid,
  GridItem,
  Center,
} from "@chakra-ui/react";
import { Navbar } from "@/components";

interface Article {
  id: number;
  title: string;
  section: string;
  image: string;
  description: string;
  date: string;
  author: string;
  comments: number;
}

const articles: Article[] = [
  {
    id: 1,
    title: "Being a Web3 developer",
    section: "Section A",
    image: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80',
    description: "Being a web3 developer i not easy take a look at this article",
    date: 'July',
    author: 'gabe.eth',
    comments: 0,

  },
 
];

const BlogPage: React.FC = () => {
  const sections = Array.from(new Set(articles.map((article) => article.section)));

  
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <>
    <Navbar onSearchChange={handleSearchChange}/>
    <Container maxW="xl" mt={8}>
      <VStack spacing={9} >
        
            <Center>
            <Heading as="h1" size="2xl">
            Articles
            </Heading>
            </Center>
        
       
        {sections.map((section) => (
          <Box key={section} >
            <Box borderBottom="1px" borderColor="gray.300" pb={2}>
              <Heading as="h2" size="lg">
                {section}
              </Heading>
            </Box>
            <Grid
              templateColumns="repeat(5, minmax(300px, 4fr))"
              gap={9}
              mt={4}
            >
              {articles
                .filter((article) => article.section === section)
                .map((article) => (
                  <GridItem key={article.id}>
                    <Box
                      borderRadius="md"
                      p={4}
                    >
                      <Box
                        w="100%"
                        h="120px"
                        transition="0.3s ease-in-out"
                        _hover={{
                          transform: 'scale(1.05)',
                        }}
                        bg={`url(${article.image})`}
                        bgSize="cover"
                        bgPosition="center"
                        borderRadius="md"
                        mb={2}
                      />
                      <Text fontSize="lg">{article.title}</Text>
                      <Text color={'gray.500'}>{article.description}</Text>
                    </Box>
                  </GridItem>
                ))}
            </Grid>
          </Box>
        ))}
      </VStack>
    </Container>
    </>
    
  );
};

export default BlogPage;
