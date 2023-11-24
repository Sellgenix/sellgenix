import { Box, Button, Card, Flex, Grid, Text } from "@radix-ui/themes";
import { IconBrandDiscordFilled } from "@tabler/icons-react";

import { signIn } from "@sellgenix/auth";
import type { EnabledProviders } from "@sellgenix/auth";

import { LoginLayoutTabs } from "./login-layout-tabs";

const Form = ({ provider }: { provider: EnabledProviders }) => {
  const firstChar = provider[0];
  if (firstChar === undefined) throw new Error("Provider is undefined");
  return (
    <form
      action={async () => {
        "use server";
        await signIn(provider);
      }}
    >
      <Button>
        <IconBrandDiscordFilled stroke={1.5} />
        Login with {firstChar.toUpperCase() + provider.slice(1)}
      </Button>
    </form>
  );
};

export const OauthProviders = ({ className }: { className?: string }) => {
  return (
    <Flex
      gap="2"
      direction="column"
      align="center"
      justify="center"
      className={className}
    >
      <Text size="4">Please log in to access the application</Text>
      <Form provider="discord" />
    </Flex>
  );
};

export const LoginLayout = () => {
  return (
    <Grid columns="2" gap="4" width="100%" height="100%">
      <Box asChild grow="1">
        <Card className="relative">
          <OauthProviders className="absolute inset-0 bg-black/10 backdrop-blur-[1px]" />
          <Text color="gray" size="2" className="pointer-events-none">
            Paste your customer&apos;s email here
          </Text>
        </Card>
      </Box>
      <Card>
        <Box grow="1">
          <LoginLayoutTabs />
        </Box>
      </Card>
    </Grid>
  );
};
