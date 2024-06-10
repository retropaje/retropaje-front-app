export enum Category {
  Shirt = 1,
  Pants = 2,
  Flannel = 3,
  Skirt = 4,
  Lycra = 5,
}

export const CategoryLabel = new Map<number, string>([
  [Category.Shirt, "Camisa"],
  [Category.Pants, "Pantalon"],
  [Category.Flannel, "Franela"],
  [Category.Skirt, "Falda"],
  [Category.Lycra, "Licra"],
]);

export const CategoryOptions = [
  { value: Category.Shirt, label: CategoryLabel.get(Category.Shirt) ?? "" },
  { value: Category.Pants, label: CategoryLabel.get(Category.Pants) ?? "" },
  { value: Category.Flannel, label: CategoryLabel.get(Category.Flannel) ?? "" },
  { value: Category.Skirt, label: CategoryLabel.get(Category.Skirt) ?? "" },
  { value: Category.Lycra, label: CategoryLabel.get(Category.Lycra) ?? "" },
];
