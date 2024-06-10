export enum Roles {
  Admin = 1,
  SalesAgent = 2,
}

export const RolesLabel = new Map<number, string>([
  [Roles.Admin, "Administrator"],
  [Roles.SalesAgent, "Vendedor"],
]);

export const RolesOptions = [
  { value: Roles.Admin, label: RolesLabel.get(Roles.Admin) ?? "" },
  { value: Roles.SalesAgent, label: RolesLabel.get(Roles.SalesAgent) ?? "" },
];
