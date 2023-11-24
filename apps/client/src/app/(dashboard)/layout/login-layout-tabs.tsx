"use client";

import { useState } from "react";
import { Box, Card, Flex, Grid, Heading, Tabs, Text } from "@radix-ui/themes";
import { IconAlertCircle, IconPercentage } from "@tabler/icons-react";

const AnalysisViewSkeleton = () => {
  return (
    <Grid columns="2" gap="1">
      <Card>
        <Flex gap="2" height="100%">
          <Text color="red">
            <IconAlertCircle />
          </Text>
          <Box>
            <Text weight="bold" as="div" color="red">
              Type
            </Text>
            <Text color="red" className="!leading-tight">
              We&apos;ve considered that this email is a spam. Please check the
              summary below.
            </Text>
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
            <Text className="!leading-tight">
              We&apos;re{" "}
              <Text weight="bold" size="6">
                97%
              </Text>{" "}
              sure that this email is a spam.
            </Text>
          </Box>
        </Flex>
      </Card>
      <Box className="col-span-2">
        <Heading size="5" as="h4" align="center" mt="2">
          Summary
        </Heading>
        <Text>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque
          tempore est obcaecati ratione, non ipsa eveniet modi ex ipsum quis
          harum odio recusandae cupiditate omnis iste qui commodi quaerat quo
          adipisci? Nam quis ipsam qui explicabo vel distinctio ut velit
          blanditiis, hic similique voluptates aliquam. Ipsam placeat laudantium
          animi dolore quia ut, numquam voluptatem sequi deleniti officia.
          Aliquid temporibus, ad sunt, aspernatur deleniti quos voluptatibus
          sint esse reprehenderit explicabo sit doloribus eaque vitae ducimus
          molestias nulla aperiam numquam ut. Amet.
        </Text>
      </Box>
    </Grid>
  );
};
const ResponseViewSkeleton = () => {
  return <Box></Box>;
};

const tabs = {
  analysis: "analysis",
  response: "response",
} as const;
type Tab = (typeof tabs)[keyof typeof tabs];

export const LoginLayoutTabs = () => {
  const [tab, setTab] = useState<Tab>(tabs.analysis);
  return (
    <Tabs.Root value={tab} onValueChange={(e) => setTab(e as Tab)}>
      <Tabs.List className="justify-center">
        <Tabs.Trigger value={tabs.analysis}>Analysis</Tabs.Trigger>
        <Tabs.Trigger value={tabs.response}>Generated Response</Tabs.Trigger>
      </Tabs.List>

      <Box px="4" pt="3" pb="2">
        <Tabs.Content value={tabs.analysis}>
          <AnalysisViewSkeleton />
        </Tabs.Content>

        <Tabs.Content value={tabs.response}>
          <ResponseViewSkeleton />
        </Tabs.Content>
      </Box>
    </Tabs.Root>
  );
};
