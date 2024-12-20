import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";

interface ItemScore {
  item: string;
  score: number;
  nrOfAppearances: number;
}

interface ResultsDisplayProps {
  items: ItemScore[];
}

export default function ResultsDisplay({ items }: ResultsDisplayProps) {
  const sortedItems = [...items].sort((a, b) => b.score - a.score);

  return (
    <div className="w-full max-w-2xl">
      <h2 className="text-2xl font-bold mb-4">Final Results</h2>
      <div className="flex flex-wrap flex-col items-center justify-center">
        <p className="text-2xl mb-4">Winner</p>
        <Card className="w-64 m-4 card">
          <CardContent className="flex flex-col items-center justify-center h-64 card-content">
            <p className="text-xl font-semibold mb-4">{sortedItems[0].item}</p>
          </CardContent>
        </Card>
        <p className="text-2xl mt-16">Details</p>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Rank</TableHead>
              <TableHead>Item</TableHead>
              <TableHead>Times Selected</TableHead>
              <TableHead>Appearances</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedItems.map((item, index) => (
              <TableRow key={index} className={index === 0 ? "font-bold" : ""}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.item}</TableCell>
                <TableCell>{item.score}</TableCell>
                <TableCell>{item.nrOfAppearances}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
