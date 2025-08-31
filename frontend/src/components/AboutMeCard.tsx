import { Box, Heading, Text, Avatar } from "@chakra-ui/react";

export default function AboutMeCard() {
  return (
    <Box
      bg="white"
      p={{ base: 4, md: 8 }}
      rounded={{ base: '2xl', md: '2xl 0 0 2xl' }}
      boxShadow="xl"
      mb={0}
      height="auto"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="flex-start"
      gap={4}
      borderRight={{ md: '1px solid #e2e8f0' }}
      overflow="hidden"
    >
        <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
          <Heading as="h1" size="xl" color="teal.700" textAlign="center" mb={0}>
            Melih Coskun
          </Heading>
        </Box>
      <Text fontSize={{ base: "md", md: "lg" }} color="gray.600" fontWeight="medium" mb={2} textAlign="center">
        Software Engineering Manager
      </Text>
      <Avatar boxSize={{ base: "0px", md: "240px" }} name="Melih Coskun" src="/assets/avatar.png" mb={4} display={{ base: "none", md: "block" }} />
      <Text fontSize="md" color="gray.500" textAlign="center" display={{ base: "none", md: "block" }}>
        Hello, I’m Melih Coskun 👋
        I work as a Software Engineering Manager & Product Owner and have a strong passion for artificial intelligence. This website is my personal space where you can explore my work, ask my AI-powered assistant questions, and follow along as I continue to add new AI projects and insights.
        If you’re curious about my thoughts on AI and technology, take a look at my Medium articles.
      </Text>
      {/* Social icons at the bottom of the profile card */}
      <Box mt={8} w="100%" display="flex" justifyContent="center" gap={6}>
        <a href="https://linkedin.com/in/melihcoskun" target="_blank" rel="noopener noreferrer">
          <Avatar src="/assets/linkedin.svg" name="LinkedIn" size="md" bg="white" />
        </a>
        <a href="https://medium.com/@mmelihcoskun" target="_blank" rel="noopener noreferrer">
          <Avatar src="/assets/medium.svg" name="Medium" size="md" bg="white" />
        </a>
        <a href="https://github.com/mmelihcoskun" target="_blank" rel="noopener noreferrer">
          <Avatar src="/assets/github.svg" name="GitHub" size="md" bg="white" />
        </a>
      </Box>
    </Box>
  );
}
