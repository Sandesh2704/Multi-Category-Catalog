export type ItemProp = {
  label: string;
  value: string;
};

export type Item = {
  id: string;
  itemname: string;
  category: string;
  image: string;
  itemprops: ItemProp[];
};
