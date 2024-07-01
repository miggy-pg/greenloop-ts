import { useNavigate } from "react-router-dom";

import Table from "../../Common/Table";
import StyledButton from "../../Common/Button/StyledButton";
import defaultImage from "../../../assets/images/default-image.jpg";
import { UserProps } from "../../../types/user.type";

interface UserList {
  company: UserProps;
  handleGetUser: (userId: string | undefined) => void;
  handleDeleteUser: (commpanyId: string | undefined) => void;
}

function UserList({ company, handleGetUser, handleDeleteUser }: UserList) {
  const navigate = useNavigate();
  const {
    image,
    fullName,
    email,
    organization,
    province,
    username,
    city,
    id: userId,
  } = company;

  const userImage = image as string;

  return (
    <tr className="hover:bg-gray-100">
      <Table.Row type="default">
        <img
          src={userImage ? userImage : defaultImage}
          className="rounded-full w-10 h-10"
        />
      </Table.Row>
      <Table.Row type="name">
        <div className="text-sm font-semibold text-gray-900 sm:text-md md:text-sm lg:text-sm">
          {fullName}
        </div>
      </Table.Row>
      <Table.Row type="default">{email}</Table.Row>
      <Table.Row type="default">{username}</Table.Row>
      <Table.Row type="default">************</Table.Row>
      <Table.Row type="default">{organization}</Table.Row>
      <Table.Row type="default">{province}</Table.Row>
      <Table.Row type="default">{city}</Table.Row>

      <Table.Row type="actionButton">
        <StyledButton
          $variations="primaryBlue"
          $size="small"
          onClick={() => handleGetUser(userId)}
        >
          Update
        </StyledButton>
      </Table.Row>
      <Table.Row type="actionButton">
        <StyledButton
          $variations="danger"
          $size="small"
          onClick={() => handleDeleteUser(userId)}
        >
          Delete
        </StyledButton>
      </Table.Row>
      <Table.Row type="actionButton">
        <StyledButton
          $variations="secondary"
          $size="small"
          onClick={() => navigate(`/profile/${userId}`)}
        >
          Details
        </StyledButton>
      </Table.Row>
    </tr>
  );
}

export default UserList;
