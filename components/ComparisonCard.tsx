import { Card, CardContent } from "@/components/ui/card";

interface ComparisonCardProps {
  item1: string;
  item2: string;
  onSelect: (winner: string) => void;
}

export default function ComparisonCard({
  item1,
  item2,
  onSelect,
}: ComparisonCardProps) {
  return (
    <div className="flex flex-wrap justify-evenly w-full">
      <Card
        className="w-64 m-4 cursor-pointer card"
        onClick={() => onSelect(item1)}
      >
        <CardContent className="flex flex-col items-center justify-center h-64 card-content">
          <p className="text-xl font-semibold mb-4">{item1}</p>
        </CardContent>
      </Card>
      <Card
        className="w-64 m-4 cursor-pointer card"
        onClick={() => onSelect(item2)}
      >
        <CardContent className="flex flex-col items-center justify-center h-64 card-content">
          <p className="text-xl font-semibold mb-4">{item2}</p>
        </CardContent>
      </Card>
    </div>
  );
}
