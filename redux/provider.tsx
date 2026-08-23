"use client";

import { Provider } from "react-redux";
import { makeStore } from "@/redux/store";

interface Props {
  children: React.ReactNode;
}

export default function CustomProvider({ children }: Props) {
  return (
    <Provider store={makeStore()}>
      {children}
    </Provider>
  );
}
