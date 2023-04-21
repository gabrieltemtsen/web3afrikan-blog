import { ReactElement } from 'react'
import {
  Box,
  SimpleGrid,
  Icon,
  Text,
  Stack,
  Flex,
  Center,
  Heading,
} from '@chakra-ui/react'
import {
  FcApprove,
  FcAssistant,
  FcDonate,
  FcEditImage,
  FcInTransit,
  FcMoneyTransfer,
  FcMusic,
  FcReadingEbook,
} from 'react-icons/fc'

interface FeatureProps {
  title: string
  text: string
  icon: ReactElement
}

const Feature = ({ title, text, icon }: FeatureProps) => {
  return (
    <Stack>
      <Flex
        w={16}
        h={16}
        align={'center'}
        justify={'center'}
        color={'white'}
        rounded={'full'}
        bg={'gray.100'}
        mb={1}
      >
        {icon}
      </Flex>
      <Text fontWeight={600}>{title}</Text>
      <Text color={'gray.600'}>{text}</Text>
    </Stack>
  )
}

export default function Features() {
  return (
    <Center>
      <Box p={4} py={9} mt={229} width={'90%'}>
        <Center>
          <Heading>Features</Heading>
        </Center>
        <SimpleGrid
          columns={{ base: 1, md: 3 }}
          spacing={10}
          py={9}
          mt={9}
          ml={9}
          px={5}
          mr={9}
        >
          <Feature
            icon={<Icon as={FcEditImage} w={10} h={10} />}
            title={'Create Post'}
            text={'Write and Upload Blog Posts on the Platform'}
          />
          <Feature
            icon={<Icon as={FcReadingEbook} w={10} h={10} />}
            title={'Read and Comment on Blogs'}
            text={'Read blog posts and comments on the platform.'}
          />
          <Feature
            icon={<Icon as={FcApprove} w={10} h={10} />}
            title={'Vote Blog Content Policy '}
            text={'Control the contents of the Platform'}
          />
        </SimpleGrid>
      </Box>
    </Center>
  )
}
