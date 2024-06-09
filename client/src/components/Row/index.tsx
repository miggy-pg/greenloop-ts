interface Row {
  children: React.ReactNode;
  type: keyof RowType | "name";
}

interface RowType {
  actionButton: string;
  default: string;
}

const rowType: RowType = {
  actionButton: "space-x-2 whitespace-nowrap p-8 text-sm sm:text-sm lg:text-lg",
  default:
    "whitespace-nowrap p-8 text-xs font-medium text-gray-900 sm:text-sm md:text-md lg:text-lg",
};

function Row({ children, type }: Row) {
  if (type === "name")
    return (
      <td className="whitespace-nowrap p-8 text-sm font-normal text-gray-500">
        <div className="flex items-center">{children}</div>
      </td>
    );
  return <td className={rowType[type]}>{children}</td>;
}

export default Row;
