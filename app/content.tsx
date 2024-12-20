"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ItemInput from "../components/ItemInput";
import ComparisonCard from "../components/ComparisonCard";
import ResultsDisplay from "../components/ResultsDisplay";
import TiebreakerCard from "../components/TiebreakerCard";

interface ItemScore {
  item: string;
  score: number;
  nrOfAppearances: number;
}

const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max);
};

export const Content = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [items, setItems] = useState<ItemScore[]>([]);
  const [currentPair, setCurrentPair] = useState<[string, string] | null>(null);
  const [isSelectionComplete, setIsSelectionComplete] = useState(false);
  const [tiedItems, setTiedItems] = useState<string[]>([]);
  const [isTiebreakerComplete, setIsTiebreakerComplete] = useState(false);

  useEffect(() => {
    const itemsParam = searchParams.get("items");
    if (itemsParam) {
      const decodedItems = decodeURIComponent(itemsParam).split(",");
      startTournament(decodedItems);
    }
  }, []);

  const updateURL = (updatedItems: ItemScore[]) => {
    const itemsString = updatedItems
      .map((item) => `${item.item}:${item.score}:${item.nrOfAppearances}`)
      .join(",");
    // TODO: do url update without router
    router.push(`?items=${encodeURIComponent(itemsString)}`);
  };

  const startTournament = (inputItems: string[]) => {
    if (inputItems.length < 2) {
      alert("Please enter at least two items to compare.");
      return;
    }
    const initialItems = inputItems.map((item) => {
      const [itemName, score, nrOfAppearances] = item.split(":");
      return {
        item: itemName,
        score: parseInt(score) || 0,
        nrOfAppearances: parseInt(nrOfAppearances) || 0,
      };
    });
    setItems(shuffleArray(initialItems));
    setIsSelectionComplete(false);
    setIsTiebreakerComplete(false);
    updateURL(initialItems);
  };

  // TODO: check if the shuffle could be done better
  const shuffleArray = <T,>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  // TODO: change this, it does not need to be a use effect
  useEffect(() => {
    if (items.length > 0 && !isSelectionComplete) {
      getNextPair();
    }
  }, [items, isSelectionComplete]);

  const getNextPair = () => {
    const availableItems = items.filter((item) => item.nrOfAppearances < 2);
    if (availableItems.length === 1) {
      // only one item left, take a random item and add it so it can be compared
      const finishedItems = items.filter(
        (item) => item.item != availableItems[0].item
      );

      availableItems.push(
        finishedItems[getRandomInt(finishedItems.length - 1)]
      );
    } else if (availableItems.length === 0) {
      setIsSelectionComplete(true);
      checkForTies();
      return;
    }
    const [item1, item2] = availableItems.slice(0, 2);
    setCurrentPair([item1.item, item2.item]);
  };

  const selectItem = (selectedItem: string) => {
    setItems((prevItems) => {
      const updatedItems = prevItems.map((item) => {
        if (item.item === selectedItem) {
          return {
            ...item,
            score: item.score + 1,
            nrOfAppearances: item.nrOfAppearances + 1,
          };
        }
        if (currentPair && currentPair.includes(item.item)) {
          return { ...item, nrOfAppearances: item.nrOfAppearances + 1 };
        }
        return item;
      });
      const shuffledItems = shuffleArray(updatedItems);
      updateURL(shuffledItems);
      return shuffledItems;
    });
  };

  const checkForTies = () => {
    const sortedItems = [...items].sort((a, b) => b.score - a.score);
    const highestScore = sortedItems[0].score;
    const tiedItems = sortedItems.filter((item) => item.score === highestScore);

    if (tiedItems.length > 1) {
      setTiedItems(tiedItems.map((item) => item.item));
    } else {
      setIsTiebreakerComplete(true);
    }
  };

  const selectTiebreakerWinner = (winner: string) => {
    setItems((prevItems) => {
      const updatedItems = prevItems.map((item) =>
        item.item === winner ? { ...item, score: item.score + 1 } : item
      );
      updateURL(updatedItems);
      return updatedItems;
    });
    setTiedItems([]);
    setIsTiebreakerComplete(true);
  };

  return (
    <main className="flex gap-10 min-h-full flex-col items-center justify-center p-4">
      {items.length === 0 && <ItemInput onSubmit={startTournament} />}
      {currentPair && !isSelectionComplete && (
        <ComparisonCard
          item1={currentPair[0]}
          item2={currentPair[1]}
          onSelect={selectItem}
        />
      )}
      {isSelectionComplete && tiedItems.length > 0 && (
        <TiebreakerCard items={tiedItems} onSelect={selectTiebreakerWinner} />
      )}
      {isSelectionComplete && isTiebreakerComplete && (
        <ResultsDisplay items={items} />
      )}
    </main>
  );
};
