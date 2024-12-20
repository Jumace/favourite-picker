import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ItemInputProps {
  onSubmit: (items: string[]) => void;
}

export default function ItemInput({ onSubmit }: ItemInputProps) {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const items = input
      .split("\n")
      .filter((item) => item.trim() !== "")
      .map((item) => `${item}:0:0`);
    onSubmit(items);
  };

  return (
    <div className="flex gap-10 flex-col max-w-md">
      <div className="my-auto">
        <p>
          This little helper will support in finding a favourite under multiple
          options.
        </p>
        <p>
          It will show two options to select a favourite out of the two. Each
          option is presented at least two times. At the end an overview is
          shown
        </p>
      </div>
      <form onSubmit={handleSubmit} className="w-full">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter items, one per line"
          className="mb-4"
          rows={10}
        />
        <Button type="submit" className="w-full">
          Start Picking a Favourite
        </Button>
      </form>
    </div>
  );
}
