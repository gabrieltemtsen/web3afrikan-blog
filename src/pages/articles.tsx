// pages/blog.tsx

import React from "react";
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
}

const articles: Article[] = [
  {
    id: 1,
    title: "Article 1",
    section: "Section A",
    image: "https://via.placeholder.com/200",
  },
  {
    id: 2,
    title: "Article 2",
    section: "Section B",
    image: "https://via.placeholder.com/200",
  },
  {
    id: 3,
    title: "Article 3",
    section: "Section A",
    image: "https://via.placeholder.com/200",
  },
  {
    id: 3,
    title: "Article 3",
    section: "Section A",
    image: "https://via.placeholder.com/200",
  },
  {
    id: 3,
    title: "Article 3",
    section: "Section A",
    image: "https://via.placeholder.com/200",
  },
  {
    id: 3,
    title: "Article 3",
    section: "Section A",
    image: "https://via.placeholder.com/200",
  },
  {
    id: 3,
    title: "Article 3",
    section: "Section A",
    image: "https://via.placeholder.com/200",
  },
  {
    id: 3,
    title: "Article 3",
    section: "Section A",
    image: "https://via.placeholder.com/200",
  },
  {
    id: 3,
    title: "Article 3",
    section: "Section A",
    image: "https://via.placeholder.com/200",
  },
  {
    id: 3,
    title: "Article 3",
    section: "Section A",
    image: "https://via.placeholder.com/200",
  },
  {
    id: 4,
    title: "Article 4",
    section: "Section B",
    image: "https://via.placeholder.com/200",
  },
];

const BlogPage: React.FC = () => {
  const sections = Array.from(new Set(articles.map((article) => article.section)));

  return (
    <>
    <Navbar/>
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
                      borderWidth={1}
                      borderColor="gray.200"
                      borderRadius="md"
                      p={4}
                    >
                      <Box
                        w="100%"
                        h="120px"
                        bg={`url(${article.image})`}
                        bgSize="cover"
                        bgPosition="center"
                        borderRadius="md"
                        mb={2}
                      />
                      <Text fontSize="lg">{article.title}</Text>
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
