"use client";
// Add global type for grecaptcha
declare global {
  interface Window {
    grecaptcha?: {
      execute: (siteKey: string, options: object) => Promise<string>;
    };
  }
}
import { Box, Heading, Text, Input, Button, Avatar, ChakraProvider } from "@chakra-ui/react";

import { useState } from "react";
// import ReCAPTCHA from "react-google-recaptcha";
import { useEffect } from "react";
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({});

export default function Home() {
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  // Removed unused captchaCompleted
  // Invisible reCAPTCHA v3
  const SITE_KEY = "6LcJtq8rAAAAALjhwdkvfjWK4aTCstzfMOGHqpVz"; // Replace with your actual site key
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "";
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY || "";
  console.log("API_URL from env:", API_URL);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [questionCount, setQuestionCount] = useState(0);
  const MAX_QUESTIONS = 5;

  const handleSend = async () => {
    if (!input.trim()) return;
    if (questionCount >= MAX_QUESTIONS) return;
    let token = captchaToken;
    // Use invisible reCAPTCHA v3 for first question
    if (questionCount === 0) {
      if (typeof window !== "undefined" && window.grecaptcha) {
        token = await window.grecaptcha.execute(SITE_KEY, { action: "submit" });
        setCaptchaToken(token);
      }
    }
    const userMessage = { role: "user", content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setQuestionCount(count => count + 1);
    // Call AWS API Gateway backend
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY
        },
        body: JSON.stringify({ question: input, captcha: questionCount === 0 ? token : undefined })
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: "assistant", content: data.answer }]);
      if (typeof window !== "undefined" && window.speechSynthesis) {
        const speakWithMaleVoice = () => {
          const utterance = new window.SpeechSynthesisUtterance(data.answer);
          const voices = window.speechSynthesis.getVoices();
          const maleVoice = voices.find(v =>
            ["male", "man", "john", "david", "mike", "paul", "daniel", "james", "robert", "richard", "william", "george", "charles", "thomas", "joseph", "frank", "henry", "jack", "peter", "gary", "steven", "kevin", "brian", "edward", "ronald", "anthony", "mark", "donald", "kenneth", "stephen", "andrew", "joshua", "chris", "matt", "alex", "ryan", "nick", "sam", "greg", "bruce", "jeff", "scott", "eric", "adam", "ben", "luke", "leo", "max", "vince", "victor", "martin", "philip", "tim", "tom", "jerry", "fred", "arthur", "albert", "harry", "jim", "joe", "bob", "bill", "steve", "michael", "jason", "justin", "nathan", "patrick", "sean", "tyler", "zach", "aaron", "carl", "craig", "derek", "doug", "geoff", "ian", "jake", "jeremy", "jon", "kyle", "larry", "matthew", "neil", "paul", "randy", "ray", "roger", "ron", "ross", "shawn", "stuart", "todd", "trevor", "wayne", "wes", "will", "zane"].some(keyword => v.name.toLowerCase().includes(keyword))
          );
          if (maleVoice) utterance.voice = maleVoice;
          window.speechSynthesis.speak(utterance);
        };
        if (window.speechSynthesis.getVoices().length === 0) {
          window.speechSynthesis.onvoiceschanged = speakWithMaleVoice;
        } else {
          speakWithMaleVoice();
        }
      }
      if (questionCount === 0) {
      }
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "Sorry, something went wrong." }]);
    }
  };

  // Load reCAPTCHA v3 script
  useEffect(() => {
    if (typeof window !== "undefined" && !window.grecaptcha) {
      const script = document.createElement("script");
      script.src = `https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`;
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    document.documentElement.style.height = '100vh';
    document.body.style.height = '100vh';
    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.documentElement.style.height = '';
      document.body.style.height = '';
    };
  }, []);

  return (
    <ChakraProvider theme={theme}>
  <Box height="100vh" bg={{ base: 'gray.50', md: 'white' }} py={0} px={0} overflow="hidden">
        <Box
          display={{ base: 'block', md: 'grid' }}
          gridTemplateColumns={{ base: '1fr', md: '3fr 9fr' }}
          height="100vh"
          gap={0}
          overflow="hidden"
        >
      {/* Mobile: combine header and chatbot in one card; Desktop: keep separate */}
      {/* Mobile: unified card; Desktop: header left, chatbot center */}
      <Box
        bg="white"
        p={{ base: 4, md: 8 }}
        rounded={{ base: '2xl', md: '2xl 0 0 2xl' }}
        boxShadow="md"
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
          <Avatar
            name="Melih Coskun"
            src="/assets/avatar.png"
            boxSize={{ base: "36px", md: "44px" }}
            mr={2}
            borderRadius="full"
            borderWidth="2px"
            borderColor="teal.500"
            bg="white"
            shadow="md"
          />
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

If you’re curious about my thoughts on AI and technology, take a look at my Medium articles
.
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
        {/* Chatbot section for mobile only, merged into card */}
  <Box w="100%" mt={4} display={{ base: "block", md: "none" }} flex="1" minH="calc(100vh - 320px)">
          <Box textAlign="center" mb={2}>
            <Heading as="h2" size="md" color="teal.700" mb={1}>Ask my AI Assistant about me</Heading>
            <Text color="gray.500" fontSize="md">Powered by AI to answer your questions about my career, skills, and projects.</Text>
          </Box>
          <Box
            minH="180px"
             maxH={{ base: '60vh', md: '50vh' }}
            px={2}
            py={2}
            bg="gray.100"
            rounded="xl"
            borderWidth="2px"
            borderColor="teal.100"
            boxShadow="md"
            overflowY="auto"
            transition="max-height 0.3s"
          >
            {messages.length === 0 ? (
              <Text color="gray.400">Ask me anything about myself! (Max {MAX_QUESTIONS} questions per session)</Text>
            ) : (
              messages.map((msg, idx) => (
                <Box
                  key={idx}
                  mb={2}
                  display="flex"
                  justifyContent={msg.role === "user" ? "flex-end" : "flex-start"}
                >
                  <Box
                    px={3}
                    py={2}
                    borderRadius="lg"
                    maxW="80%"
                    bg={msg.role === "user" ? "teal.50" : "white"}
                    color={msg.role === "user" ? "teal.700" : "gray.700"}
                    fontWeight={msg.role === "user" ? "bold" : "normal"}
                    boxShadow={msg.role === "user" ? "sm" : "none"}
                    border={msg.role === "user" ? "1px solid #81e6d9" : "1px solid #e2e8f0"}
                  >
                    {msg.content}
                  </Box>
                </Box>
              ))
            )}
          </Box>
          <Box display="flex" gap={2} justifyContent="center" alignItems="center" pt={2}>
            <Input
              size="lg"
              height="56px"
              fontSize="lg"
              px={4}
              py={3}
              borderRadius="xl"
              borderWidth="2px"
              borderColor="gray.200"
              bg="white"
              placeholder={questionCount >= MAX_QUESTIONS ? "Question limit reached" : "Type your question..."}
              value={input}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === "Enter" && questionCount < MAX_QUESTIONS) handleSend();
              }}
              isDisabled={questionCount >= MAX_QUESTIONS}
              flex={1}
            />
            <Button colorScheme="teal" size="lg" px={8} height="56px" borderRadius="xl" fontWeight="bold" onClick={handleSend} isDisabled={questionCount >= MAX_QUESTIONS}>Send</Button>
          </Box>
          {/* Invisible reCAPTCHA v3, no visible widget */}
        </Box>
      </Box>
      {/* Desktop: Ask My AI Assistant fills 9 columns, centered content */}
      <Box
        as="section"
        bg="white"
        rounded={{ base: '2xl', md: '0 2xl 2xl 0' }}
        boxShadow="md"
        p={0}
        display={{ base: 'none', md: 'block' }}
        minH="100%"
        w="100%"
      >
        <Box as="main" maxW="container.lg" mx="auto" py={8} px={4}>
          <Heading as="h1" mb={6} textAlign="center">
            Ask my AI Assistant about me
          </Heading>
          <Box maxW="lg" w="100%" display="flex" flexDirection="column" gap={4} mx="auto">
          <Box textAlign="center" mb={2}>
            <Heading as="h2" size="md" color="teal.700" mb={1}>Ask my AI Assistant about me</Heading>
            <Text color="gray.500" fontSize="md">Powered by AI to answer your questions about my career, skills, and projects.</Text>
          </Box>
          <Box minH="180px" px={2} py={2} bg="gray.100" rounded="xl" borderWidth="2px" borderColor="teal.100" boxShadow="md">
            {messages.length === 0 ? (
              <Text color="gray.400">Ask me anything about myself! (Max {MAX_QUESTIONS} questions per session)</Text>
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
          <Box display="flex" gap={2} justifyContent="center" alignItems="center" pt={2}>
            <Input
              size="lg"
              height="56px"
              fontSize="lg"
              px={4}
              py={3}
              borderRadius="xl"
              borderWidth="2px"
              borderColor="gray.200"
              bg="white"
              placeholder={questionCount >= MAX_QUESTIONS ? "Question limit reached" : "Type your question..."}
              value={input}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === "Enter" && questionCount < MAX_QUESTIONS) handleSend();
              }}
              isDisabled={questionCount >= MAX_QUESTIONS}
              flex={1}
            />
            <Button colorScheme="teal" size="lg" px={8} height="56px" borderRadius="xl" fontWeight="bold" onClick={handleSend} isDisabled={questionCount >= MAX_QUESTIONS}>Send</Button>
          </Box>
          {/* Invisible reCAPTCHA v3, no visible widget */}
        </Box>
      </Box>
    </Box>
  </Box>
      </Box>
    </ChakraProvider>
  );
}
