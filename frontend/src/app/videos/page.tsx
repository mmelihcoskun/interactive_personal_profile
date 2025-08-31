"use client";

import { SimpleGrid, Box, Heading, Container, Link, AspectRatio, VStack, Text } from '@chakra-ui/react';
import ProfileLayout from '../ProfileLayout';

const videos = [
  {
    id: '1',
    title: 'The Only Trait for Success in the AI Era—How to Build It | Carnegie Mellon University Po-Shen Loh',
    url: 'https://www.youtube.com/embed/xWYb7tImErI',
    description: 'Education is the key to success in the AI era.'
  },
  {
    id: '2',
    title: 'Andrej Karpathy: Software Is Changing (Again)',
    url: 'https://www.youtube.com/embed/LCEmiRjPEtQ',
    description: 'Software is really changing again, Andrej Karpathy explain it very well.'
  },
  {
    id: '3',
    title: 'Let\'s build GPT: from scratch, in code, spelled out.',
    url: 'https://www.youtube.com/embed/kCc8FmEb1nY',
    description: 'would you like to learn how to create your own GPT model?'
  },
  // Add more videos here
];

export default function VideosPage() {
  return (
    <ProfileLayout>
      <Container maxW="container.lg" py={8}>
        <Heading as="h1" mb={6} textAlign="center">
          Videos I Like
        </Heading>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={6}>
          {videos.map(video => (
            <Box key={video.id} boxShadow="md" borderRadius="lg" bg="white" p={4} borderWidth="1px" borderColor="gray.200">
              <VStack spacing={3} align="start">
                <AspectRatio ratio={16 / 9} w="100%">
                  <iframe
                    src={video.url}
                    title={video.title}
                    allowFullScreen
                    style={{ borderRadius: '8px' }}
                  />
                </AspectRatio>
                <Text fontWeight="bold">{video.title}</Text>
                <Text fontSize="sm" color="gray.600">{video.description}</Text>
                <Link href={video.url.replace('/embed/', '/watch?v=')} color="teal.500" isExternal>
                  Watch on YouTube
                </Link>
              </VStack>
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    </ProfileLayout>
  );
}
