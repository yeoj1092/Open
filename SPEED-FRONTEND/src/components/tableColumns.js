// eslint-disable-next-line no-sparse-arrays
export const tableColumns = [
  {
    id: "title",
    label: "Title",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "authors",
    label: "Authors",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "source",
    label: "Source",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "pubyear",
    label: "Pub. Year",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "doi",
    label: "DOI",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
];

export const moderatorTableColumns = [
  ...tableColumns,
  {
    id: "action",
    label: "Action",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
];

export const analystTableColumns = [
  ...tableColumns,
  {
    id: "review",
    label: "Review",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
];
