"use client";
import { Box, Heading, Text, VStack, Input, Button, Avatar, ChakraProvider } from "@chakra-ui/react";

import { useState } from "react";
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({});

export default function Home() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: "user", content: input }]);
    setInput("");
    // Here you would call your backend API and add the response to messages
  };

  return (
    <ChakraProvider theme={theme}>
      <Box minH="100vh" bg="gray.50" py={10} px={4}>
        <VStack spacing={6} maxW="md" mx="auto" align="stretch">
          <Box textAlign="center">
            <Avatar boxSize="200px" name="Melih Coskun" src="/assets/avatar.png" mb={4} />
            <Heading as="h1" size="lg">Melih Coskun</Heading>
            <Text color="gray.600">AI-powered interactive resume</Text>
          </Box>
          <Box bg="white" p={6} rounded="lg" shadow="md">
            <VStack spacing={4} align="stretch">
              <Box minH="120px">
                {messages.length === 0 ? (
                  <Text color="gray.400">Ask me anything about myself!</Text>
                ) : (
                  messages.map((msg, idx) => (
                    <Box key={idx} mb={2} textAlign={msg.role === "user" ? "right" : "left"}>
                      <Text fontWeight={msg.role === "user" ? "bold" : "normal"}>
                        {msg.content}
                      </Text>
                    </Box>
                  ))
                )}
              </Box>
              <Box display="flex" gap={2}>
                <Input
                  placeholder="Type your question..."
                  value={input}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
                  onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                    if (e.key === "Enter") handleSend();
                  }}
                />
                <Button colorScheme="blue" onClick={handleSend}>Send</Button>
              </Box>
            </VStack>
          </Box>
        </VStack>
      </Box>
    </ChakraProvider>
  );
}
