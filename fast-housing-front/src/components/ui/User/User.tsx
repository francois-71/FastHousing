import { ExtendedUser } from "../../../../next-auth";

interface UserInfoProps {
  user?: ExtendedUser;
  label: string;
}

export const UserInfo = ({ user, label }: UserInfoProps) => {
  return (
    <div>
      <h2>{label}</h2>
      <p>{user?.email}</p>
      <p>{user?.name}</p>
      <p>{user?.image}</p>
    </div>
  );
};
