import { Session } from "next-auth";

export interface UserProps {
  sessionUser: NonNullable<Session["user"]>;
};
