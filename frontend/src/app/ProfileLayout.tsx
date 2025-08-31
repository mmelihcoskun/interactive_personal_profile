import AboutMeCard from '../components/AboutMeCard';
import { Box } from '@chakra-ui/react';

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box
      display={{ base: 'block', md: 'grid' }}
      gridTemplateColumns={{ base: '1fr', md: '3fr 9fr' }}
      height={{ base: 'auto', md: '100vh' }}
      gap={0}
      overflow="hidden"
    >
      <Box
        bg="white"
        height={{ base: 'auto', md: '100vh' }}
        borderRight={{ md: '1px solid #e2e8f0' }}
      >
        <AboutMeCard />
      </Box>
      <Box
        height={{ base: 'auto', md: '100vh' }}
        overflowY={{ base: 'visible', md: 'auto' }}
      >
        {children}
      </Box>
    </Box>
  );
}
