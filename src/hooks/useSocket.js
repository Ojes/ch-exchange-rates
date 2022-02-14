import { useEffect, useRef } from "react";
import { DummySocket } from "../services/socket";

export function useSocket(options) {
  const socket = useRef(DummySocket);
  const { subscribe, connectionName } = options;

  useEffect(() => {
    socket.current.connect(connectionName, subscribe);
    return socket.current.disconnect;
    // eslint-disable-next-line
  }, []);

  const message = (type, data) => {
    socket.current.message(type, data);
  };

  return {
    message,
  };
}
