import { api } from "~/utils/api/react";

export default async function HomePage() {
  const sendMessage = api.ai.sendMessage.useMutation();

  return (
    // <input
    //   onKeyDown={(e) =>
    //     e.key === "Enter" &&
    //     sendMessage.mutate({ message: e.currentTarget.value })
    //   }
    // />
    <></>
  );
}
