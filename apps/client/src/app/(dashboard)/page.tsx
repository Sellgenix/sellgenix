"use client";

import { useRef } from "react";
import { Button } from "@radix-ui/themes";
import { IconLoader } from "@tabler/icons-react";

import { api } from "~/utils/api/react";

export default function HomePage() {
  const sendMessage = api.ai.sendMessage.useMutation();
  const ref = useRef<HTMLInputElement>(null);

  return (
    <>
      <input ref={ref} className="border" />
      <Button
        onClick={() => {
          if (ref.current?.value === undefined) return;
          sendMessage.mutate({ message: ref.current.value });
        }}
      >
        go
      </Button>
      <AnalyticsTest />
      <pre className="font-mono">
        {JSON.stringify(sendMessage.data, null, 2)}
      </pre>
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
