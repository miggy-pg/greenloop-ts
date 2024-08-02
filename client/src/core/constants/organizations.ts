export interface OrganizationOption {
  value: string;
  label: string;
}

const organizations: OrganizationOption[] = [
  { value: "Waste Generator", label: "Waste Generator" },
  { value: "Recycling Startup", label: "Recycling Startup" },
  { value: "Informal Waste Sector", label: "Informal Waste Sector" },
];

export default organizations;
