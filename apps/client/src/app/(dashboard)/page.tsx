"use client";

import { useRef } from "react";
import { Button } from "@radix-ui/themes";

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
      <pre className="font-mono">
        {JSON.stringify(sendMessage.data, null, 2)}
      </pre>
    </>
  );
}
