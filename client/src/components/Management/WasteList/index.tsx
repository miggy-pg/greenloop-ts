import Table from "../../Common/Table";
import StyledButton from "../../Common/Button/StyledButton";
import { WasteCardProps } from "../../../types/waste.type";

interface WasteList {
  waste: WasteCardProps;
  handleGetWaste: (wasteId: string | undefined) => void;
  handleDeleteWaste: (wasteId: string | undefined) => void;
}

export default function WasteList({
  waste,
  handleGetWaste,
  handleDeleteWaste,
}: WasteList) {
  const { id: wasteId, image: wasteImage, description, category } = waste;

  return (
    <tr className="hover:bg-gray-100">
      <Table.Row type="default">
        <img
          src={wasteImage?.url ? wasteImage.url : undefined}
          className="w-10 h-10"
        />
      </Table.Row>
      <Table.Row type="default">{description}</Table.Row>
      <Table.Row type="default">{category}</Table.Row>

      <Table.Row type="actionButton">
        <StyledButton
          $variations="primaryBlue"
          $size="small"
          onClick={() => {
            handleGetWaste(wasteId);
          }}
        >
          Update
        </StyledButton>
      </Table.Row>
      <Table.Row type="actionButton">
        <StyledButton
          $variations="danger"
          $size="small"
          onClick={() => handleDeleteWaste(wasteId)}
        >
          Delete
        </StyledButton>
      </Table.Row>
    </tr>
  );
}
