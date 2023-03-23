import axios from "axios";

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

export function getUser(id?: number) {
  return axios
    .get<User>(`http://localhost:3000/users/${id}`)
    .then((res) => res.data);
}
