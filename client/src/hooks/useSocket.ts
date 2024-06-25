import io from "socket.io-client";
import { Socket } from "socket.io-client";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateHasReadMessage } from "../api/message";
import { socketPort } from "../utils/socket";
import { UserProps } from "../types/user.type";

interface Message {
  id: string;
  msg: string;
  msgImage: { url: string };
}

interface NewMessage {
  company: {
    fullName: string;
    email: string;
    id: string;
    image: { public_id: string; url: string };
  };
  conversationId: string;
  hasRead: boolean;
  message: Message;
}

const useSocketMessage = (user: UserProps) => {
  const queryClient = useQueryClient();

  const [socket, setSocket] = useState<Socket | null>(null);
  const [newMessages, setNewMessages] = useState([]);
  const [onClickedRead, setOnClickedRead] = useState(false);

  const { mutate: readMessage } = useMutation({
    mutationFn: (messageId: string) => updateHasReadMessage(messageId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
    },
  });

  const hasReadMessage = (messageId: string, all = false) => {
    if (messageId) readMessage(messageId);

    if (all) {
      newMessages?.forEach((message: NewMessage) => {
        readMessage(message?.message?.id);
      });
    }

    setOnClickedRead(true);
  };

  useEffect(() => {
    setSocket(io(socketPort));
  }, []);

  useEffect(() => {
    socket?.emit("getNewMessages", user?.id);
    socket?.on("getNewMessages", (data) => {
      setNewMessages(data);
    });
    setOnClickedRead(false);
  }, [socket, onClickedRead]);

  return { newMessages, hasReadMessage };
};

export { useSocketMessage };
