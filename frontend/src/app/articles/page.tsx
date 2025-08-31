"use client";
import { SimpleGrid, Box, Heading, Container } from '@chakra-ui/react';
import { ArticleCard, Article } from '../../components/ArticleCard';
import ProfileLayout from '../ProfileLayout';

// Example articles data
const articles: Article[] = [
  {
    id: '1',
    title: 'How to succeed on volunteer projects',
    description: 'How to succeed on volunteer projects',
  imageUrl: 'https://miro.medium.com/v2/resize:fit:1400/format:webp/1*8YhY_LoSkG3emMKmy5yNiw.jpeg',
    url: 'https://medium.com/@coskunmelih/how-to-succeed-on-volunteer-projects-from-scratch-7d057896b56e',
  },
  {
    id: '2',
    title: 'Unlocked Long-Term Success: How Our Country Principles Seamlessly Align with Corporate Values for Modern Company Culture, All Thanks to Atatürk !!!',
    description: 'Unlocked Long-Term Success: How Our Country Principles Seamlessly Align with Corporate Values for Modern Company Culture, All Thanks to Atatürk !!!',
  imageUrl: 'https://miro.medium.com/v2/resize:fit:0/a8ce0cea4b9fef8a54ce3f0bb96f7de702490ca0eded890b5bee29316727e477',
    url: 'https://medium.com/@coskunmelih/unlocked-long-term-success-how-our-country-principles-seamlessly-align-with-corporate-values-for-d1cf793677ee',
  },
  {
    id: '3',
    title: 'Onboarding is not a checklist',
    description: 'When you accept a job offer, you might be very happy and feel relieved.. Will you feel the same after you start your new job? How was your first week ? Did you feel comfortable ? Did you notice everything prepared just for you ?',
    imageUrl: 'https://miro.medium.com/v2/resize:fit:1400/format:webp/1*TqIYxjxhVcZw3p0YW1qg1g.png',
    url: 'https://medium.com/@coskunmelih/onboarding-is-not-a-checklist-fbcdc0d783be',
  },
  {
    id: '4',
    title: 'From Engineering Manager to Sailing Club Leader: How Scrum Helped Me Scale to 100+ Members',
    description: 'From Engineering Manager to Sailing Club Leader: How Scrum Helped Me Scale to 100+ Members',
    imageUrl: 'https://miro.medium.com/v2/resize:fit:0/1*pfWwtWd1BjzvTTaDHrV92w.jpeg',
    url:"https://medium.com/@coskunmelih/from-engineering-manager-to-sailing-club-leader-how-scrum-helped-me-scale-to-100-members-778d7dec172a"
  },
  {
    id: '5',
    title: 'No Manual Coding: How I Used VS Code Copilot to Build an AI-Powered Onboarding Agent',
    description: 'No Manual Coding: How I Used VS Code Copilot to Build an AI-Powered Onboarding Agent',
  imageUrl: 'https://miro.medium.com/v2/resize:fit:0/1*twOMUik8U5M8WAu7qaNa2g.png',
    url: 'https://medium.com/@coskunmelih/no-manual-coding-how-i-used-vs-code-copilot-to-build-an-ai-powered-onboarding-agent-2df5ba2d1a4c',
  },
  
  // Add more articles here
];

export default function ArticlesPage() {
  return (
    <ProfileLayout>
      <Container maxW="container.lg" py={8}>
        <Heading as="h1" mb={6} textAlign="center">
          My Articles
        </Heading>
        <Box
          overflowY={{ base: 'auto', md: 'visible' }}
          minH={{ base: '60vh', md: 'auto' }}
          maxH={{ base: 'calc(100vh - 180px)', md: 'auto' }}
        >
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={6}>
            {articles.map(article => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </SimpleGrid>
        </Box>
      </Container>
    </ProfileLayout>
  );
}
