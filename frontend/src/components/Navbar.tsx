"use client";

import { Box, Flex, HStack, Link, IconButton, useDisclosure, VStack, useColorModeValue } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { name: 'Home', href: '/' },
  { name: 'Articles', href: '/articles' },
  { name: 'Videos', href: '/videos' },
];

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const navBg = useColorModeValue('white', 'gray.900');
  const navShadow = useColorModeValue('md', 'dark-lg');
  const navBorder = useColorModeValue('rgba(0,0,0,0.05)', 'rgba(255,255,255,0.08)');
  const activeBg = useColorModeValue('teal.100', 'teal.700');
  const activeColor = useColorModeValue('teal.600', 'teal.200');

  // Get current path for active link highlighting (app directory)
  const currentPath = usePathname();

  return (
  <Box as="nav" bg={navBg} px={4} py={2} color="teal.700" boxShadow={navShadow} borderRadius="md" borderBottom={`0.5px solid ${navBorder}`}> 
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center">
          <img
            src="/assets/avatar.png"
            alt="MC Logo"
            style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', boxShadow: '0 0 4px rgba(0,0,0,0.08)', marginRight: '16px' }}
          />
          <span
            style={{
              fontWeight: 'bold',
              fontSize: '1.25rem',
              letterSpacing: '2px',
              fontStyle: 'italic',
              background: 'linear-gradient(90deg, #319795 0%, #38b2ac 50%, #81e6d9 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            MC
          </span>
        </Box>
        <HStack spacing={2} display={{ base: 'none', md: 'flex' }}>
          {links.map(link => (
            <Link
              as={NextLink}
              key={link.name}
              href={link.href}
              px={4}
              py={2}
              rounded="lg"
              fontWeight="medium"
              fontSize="md"
              transition="all 0.2s"
              bg={currentPath === link.href ? activeBg : 'transparent'}
              color={currentPath === link.href ? activeColor : 'teal.700'}
              _hover={{ bg: activeBg, color: activeColor, textDecoration: 'none' }}
            >
              {link.name}
            </Link>
          ))}
        </HStack>
        <IconButton
          size="md"
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label="Open Menu"
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
          variant="ghost"
          colorScheme="teal"
        />
      </Flex>
      {isOpen ? (
        <Box pb={4} display={{ md: 'none' }}>
          <VStack as="nav" spacing={2} align="stretch">
            {links.map(link => (
              <Link
                as={NextLink}
                key={link.name}
                href={link.href}
                px={4}
                py={2}
                rounded="lg"
                fontWeight="medium"
                fontSize="md"
                transition="all 0.2s"
                bg={currentPath === link.href ? activeBg : 'transparent'}
                color={currentPath === link.href ? activeColor : 'teal.700'}
                _hover={{ bg: activeBg, color: activeColor, textDecoration: 'none' }}
                w="full"
                textAlign="center"
                onClick={onClose}
              >
                {link.name}
              </Link>
            ))}
          </VStack>
        </Box>
      ) : null}
    </Box>
  );
}
