
import { Item } from "@/types/types";
import data from "@/data/data.json";

export const groupByCategory = (items: Item[]) => {
  return items.reduce((acc: Record<string, Item[]>, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});
};

export const itemsWithId: Item[] = (data as any[]).map((item, index) => ({
  ...item,
  id: `${item.category}-${index}`,
}));

export const groupedData = groupByCategory(itemsWithId);


export const getProductsByCategory = (category: string, excludeId?: string): Item[] => {
  const products = groupedData[category] || [];
  if (excludeId) {
    return products.filter(item => item.id !== excludeId);
  }
  return products;
};