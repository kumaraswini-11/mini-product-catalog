"use client";

import {useEffect} from "react";

import {AlertCircle} from "lucide-react";

import {Button} from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & {digest?: string};
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container flex flex-col items-center justify-center min-h-[70vh] py-12 text-center">
      <AlertCircle className="h-16 w-16 text-destructive mb-4" />
      <h2 className="text-2xl font-semibold mb-4">Something went wrong!</h2>
      <p className="text-muted-foreground mb-8 max-w-md">
        We encountered an error while trying to process your request. Please try again.
      </p>
      <Button onClick={reset}>Try again</Button>
    </div>
  );
}
