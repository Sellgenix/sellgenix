"use client";

import { useState } from "react";
import {
  Box,
  Button,
  Card,
  Flex,
  Grid,
  Heading,
  Tabs,
  Text,
  TextArea,
} from "@radix-ui/themes";
import {
  IconAlertCircle,
  IconLoader,
  IconPercentage,
} from "@tabler/icons-react";

import { api } from "~/utils/api/react";
import { prettifyEmailType } from "~/utils/gpt/shared";

const tabs = {
  analysis: "analysis",
  response: "response",
} as const;
type Tab = (typeof tabs)[keyof typeof tabs];
export default function HomePage() {
  const [tab, setTab] = useState<Tab>(tabs.analysis);
  const [message, setMessage] = useState("");
  const { data, isPending, mutate } = api.ai.sendMessage.useMutation();

  return (
    <>
      <Grid columns="2" gap="4" width="100%" height="100%">
        <Box asChild grow="1">
          <TextArea
            placeholder="Paste your customer's email here"
            color="gray"
            size="2"
            value={message}
            onChange={(e) => setMessage(e.currentTarget.value)}
          />
        </Box>
        <Card>
          <Box grow="1">
            <Tabs.Root value={tab} onValueChange={(e) => setTab(e as Tab)}>
              <Tabs.List className="justify-center">
                <Tabs.Trigger value={tabs.analysis}>Analysis</Tabs.Trigger>
                <Tabs.Trigger value={tabs.response}>
                  Generated Response
                </Tabs.Trigger>
              </Tabs.List>

              <Box px="4" pt="3" pb="2">
                <Tabs.Content value={tabs.analysis}>
                  <Grid columns="2" gap="1">
                    <Card>
                      <Flex gap="2" height="100%">
                        <Text>
                          <IconAlertCircle />
                        </Text>
                        <Box>
                          <Text weight="bold" as="div">
                            Type
                          </Text>
                          {data?.type && (
                            <Text className="!leading-tight">
                              {prettifyEmailType(data.type)}
                            </Text>
                          )}
                        </Box>
                      </Flex>
                    </Card>
                    <Card>
                      <Flex gap="2" height="100%">
                        <Text>
                          <IconPercentage />
                        </Text>
                        <Box>
                          <Text weight="bold" as="div">
                            Sureness
                          </Text>
                          {data?.sureness && (
                            <Text className="!leading-tight">
                              We&apos;re{" "}
                              <Text weight="bold" size="6">
                                {data.sureness * 100}%{" "}
                              </Text>
                              sure that this email is a spam.
                            </Text>
                          )}
                        </Box>
                      </Flex>
                    </Card>
                    <Box className="col-span-2">
                      <Heading size="5" as="h4" align="center" mt="2">
                        Summary
                      </Heading>
                      <Text>{data?.summary}</Text>
                    </Box>
                  </Grid>
                </Tabs.Content>

                <Tabs.Content value={tabs.response}>
                  <Box>
                    <Text>{data?.generated_response}</Text>
                  </Box>
                </Tabs.Content>
              </Box>
            </Tabs.Root>
          </Box>
        </Card>
      </Grid>
      <Flex gap="2" mt="4">
        <Button
          onClick={() => {
            mutate({ message: message });
          }}
          disabled={!message || isPending}
        >
          {isPending && <IconLoader stroke={1.5} className="animate-spin" />}
          Send message
        </Button>
        <AnalyticsTest />
      </Flex>
    </>
  );
}

const AnalyticsTest = () => {
  const { mutate, isPending } = api.post.testAnalytics.useMutation();
  return (
    <Button onClick={() => mutate()} disabled={isPending}>
      {isPending && <IconLoader stroke={1.5} className="animate-spin" />}
      Send analytics event
    </Button>
  );
};
