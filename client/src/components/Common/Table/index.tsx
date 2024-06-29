import userTableColumn from "../../../constants/userTableColumn";

type RowTypeKeys = "checkbox" | "actionButton" | "status" | "default" | "name";

interface RowType {
  checkbox: string;
  actionButton: string;
  status: string;
  default: string;
}
interface Table {
  children: React.ReactNode;
}

interface Row {
  children: React.ReactNode;
  type: keyof RowType | RowTypeKeys;
}

interface Column {
  header: string[];
}

interface Header {
  data: string[];
  render: (header: typeof userTableColumn, index: string) => JSX.Element;
}

interface Body {
  children: React.ReactNode;
}

const rowTypes: RowType = {
  checkbox: "w-4 p-8",
  actionButton: "whitespace-nowrap rounded-full bg-red-500",
  status:
    "mr-2 rounded-md border border-green-100 bg-green-100 px-1 py-0.5 text-2xl font-medium text-green-800 ",
  default:
    "whitespace-nowrap pt-4 text-sm text-left flex font-medium text-gray-900 sm:text-md md:text-sm lg:text-sm",
};

export default function Table({ children }: Table) {
  return (
    <table className="min-w-full overflow-x-scroll table-fixed divide-y divide-gray-200">
      {children}
    </table>
  );
}

function Column({ header }: Column) {
  return (
    <th
      scope="col"
      className="cursor-pointer p-2 text-left text-sm font-medium uppercase tracking-wider text-gray-500 hover:bg-zinc-200 sm:text-md md:text-sm lg:text-sm"
    >
      {header}
    </th>
  );
}

function Header({ data, render }: Header) {
  return (
    <thead className="bg-gray-100 rounded-full lg:text-sm">
      {data.map(render)}
    </thead>
  );
}

function Row({ children, type }: Row) {
  if (type === "name")
    return (
      <td className="text-wrap p-4 text-sm font-normal text-gray-500">
        <span className="flex items-center">{children}</span>
      </td>
    );

  if (type === "actionButton")
    return (
      <td className="text-wrap p-2 space-x-0">
        <span className={rowTypes[type]}>{children}</span>
      </td>
    );
  return (
    <td className="text-wrap p-4">
      <span className={rowTypes[type]}>{children}</span>
    </td>
  );
}

function Body({ children }: Body) {
  return (
    <tbody className="divide-y divide-gray-200 bg-white rounded-full">
      {children}
    </tbody>
  );
}

Table.Header = Header;
Table.Row = Row;
Table.Column = Column;
Table.Body = Body;
