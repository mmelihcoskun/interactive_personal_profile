import { Box, Image, Heading, Text, Link, VStack } from '@chakra-ui/react';

export interface Article {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  url: string;
}

export const ArticleCard = ({ article }: { article: Article }) => (
  <Box
    borderWidth="1px"
    borderRadius="lg"
    overflow="hidden"
    boxShadow="md"
    bg="white"
    _hover={{ boxShadow: 'xl', transform: 'scale(1.02)' }}
    transition="all 0.2s"
    w="100%"
    maxW="sm"
  >
    {article.imageUrl && (
      <Image src={article.imageUrl} alt={article.title} objectFit="cover" w="100%" h="180px" />
    )}
    <VStack align="start" spacing={2} p={4}>
      <Heading as="h3" size="md" noOfLines={1}>
        {article.title}
      </Heading>
      <Text fontSize="sm" color="gray.600" noOfLines={2}>
        {article.description}
      </Text>
      <Link href={article.url} color="teal.500" isExternal fontWeight="bold">
        Read More
      </Link>
    </VStack>
  </Box>
);
