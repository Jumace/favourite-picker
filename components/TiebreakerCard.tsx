import { Card, CardContent } from "@/components/ui/card";

interface TiebreakerCardProps {
  items: string[];
  onSelect: (winner: string) => void;
}

export default function TiebreakerCard({
  items,
  onSelect,
}: TiebreakerCardProps) {
  return (
    <div className="w-full max-w-2xl">
      <h2 className="text-2xl font-bold mb-4">Tiebreaker Round</h2>
      <p className="mb-4">Please select your favorite from these top items:</p>
      <div className="flex flex-wrap">
        {items.map((item, index) => (
          <Card
            key={index}
            className="w-64 m-4 cursor-pointer card"
            onClick={() => onSelect(item)}
          >
            <CardContent className="flex flex-col items-center justify-center h-64 card-content">
              <p className="text-xl font-semibold mb-4">{item}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
