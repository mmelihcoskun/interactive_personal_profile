"use client";
import { Box, Heading, Text, VStack, Input, Button, Avatar, ChakraProvider } from "@chakra-ui/react";

import { useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({});

export default function Home() {
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [captchaCompleted, setCaptchaCompleted] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
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
  // Require CAPTCHA only for the first question
  if (questionCount === 0 && !captchaToken) {
    setMessages(prev => [...prev, { role: "assistant", content: "Please complete the CAPTCHA." }]);
    return;
  }
    const userMessage = { role: "user", content: input };
  setMessages(prev => [...prev, userMessage]);
  setInput("");
  setQuestionCount(count => count + 1);

    // Call AWS API Gateway backend
    try {
      // Only send captcha for the first question
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY
        },
        body: JSON.stringify({ question: input, captcha: questionCount === 0 ? captchaToken : undefined })
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
        // If voices are not loaded yet, wait for them
        if (window.speechSynthesis.getVoices().length === 0) {
          window.speechSynthesis.onvoiceschanged = speakWithMaleVoice;
        } else {
          speakWithMaleVoice();
        }
      }
      // After first question, mark CAPTCHA as completed and disable widget
      if (questionCount === 0) {
        setCaptchaCompleted(true);
        if (recaptchaRef.current) recaptchaRef.current.reset();
        setCaptchaToken(null);
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: "assistant", content: "Sorry, something went wrong." }]);
    }
  };

  return (
    <ChakraProvider theme={theme}>
      <Box minH="100vh" bg="gray.50" py={10} px={4}>
        <VStack spacing={6} maxW="md" mx="auto" align="stretch">
          <Box textAlign="center">
            <Avatar boxSize="200px" name="Melih Coskun" src="/assets/avatar.png" mb={4} />
            <Heading as="h1" size="lg">Melih Coskun</Heading>
            <Text color="gray.600">AI-powered interactive chatbot about me</Text>
          </Box>
          <Box bg="white" p={6} rounded="lg" shadow="md">
            <VStack spacing={4} align="stretch">
              <Box minH="120px">
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
              <Box mb={2}>
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={SITE_KEY}
                  {...(!captchaCompleted ? { onChange: (token) => setCaptchaToken(token) } : {})}
                  style={captchaCompleted ? { pointerEvents: "none", opacity: 0.5 } : {}}
                />
                {captchaCompleted && (
                  <Text color="green.500" fontSize="sm">CAPTCHA completed for this session.</Text>
                )}
              </Box>
              <Box display="flex" gap={2}>
                <Input
                  placeholder={questionCount >= MAX_QUESTIONS ? "Question limit reached" : "Type your question..."}
                  value={input}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
                  onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                    if (e.key === "Enter" && questionCount < MAX_QUESTIONS) handleSend();
                  }}
                  isDisabled={questionCount >= MAX_QUESTIONS}
                />
                <Button colorScheme="blue" onClick={handleSend} isDisabled={questionCount >= MAX_QUESTIONS}>Send</Button>
              </Box>
            </VStack>
          </Box>
        </VStack>
      </Box>
    </ChakraProvider>
  );
}
