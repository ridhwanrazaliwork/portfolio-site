"use client";

import { ViewTransition } from "react";

export default function ViewTransitionWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ViewTransition>{children}</ViewTransition>;
}
