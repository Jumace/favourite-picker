"use client";

import { Suspense } from "react";
import NavigationBar from "@/components/NavigationBar";
import { Content } from "./content";

export default function Home() {
  return (
    <>
      <NavigationBar />
      <Suspense>
        <Content />
      </Suspense>
    </>
  );
}
