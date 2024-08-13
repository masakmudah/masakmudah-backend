export type Password = {
  id: string;
  userId: string;
  hash: string;
};

export type User = {
  id: string;
  username: string;
  fullname: string;
  email: string;
  password: string;
};

export const users: User[] = [
  {
    id: "user-1",
    username: "johndoe",
    fullname: "John Doe",
    email: "john.doe@example.com",
    password: "Admin1234",
  },
  {
    id: "user-2",
    username: "janesmit",
    fullname: "Jane Smith",
    email: "jane.smith@example.com",
    password: "Admin1234",
  },
  {
    id: "user-3",
    username: "mikebrown",
    fullname: "Mike Brown",
    email: "mike.brown@example.com",
    password: "Admin1234",
  },
  {
    id: "user-4",
    username: "emilywong",
    fullname: "Emily Wong",
    email: "emily.wong@example.com",
    password: "Admin1234",
  },
  {
    id: "user-5",
    username: "alexlee",
    fullname: "Alex Lee",
    email: "alex.lee@example.com",
    password: "Admin1234",
  },
  {
    id: "user-6",
    username: "sarahjones",
    fullname: "Sarah Jones",
    email: "sarah.jones@example.com",
    password: "Admin1234",
  },
  {
    id: "user-7",
    username: "davidkim",
    fullname: "David Kim",
    email: "david.kim@example.com",
    password: "Admin1234",
  },
  {
    id: "user-8",
    username: "lisachen",
    fullname: "Lisa Chen",
    email: "lisa.chen@example.com",
    password: "Admin1234",
  },
  {
    id: "user-9",
    username: "tomwilson",
    fullname: "Tom Wilson",
    email: "tom.wilson@example.com",
    password: "Admin1234",
  },
  {
    id: "user-10",
    username: "annagarcia",
    fullname: "Anna Garcia",
    email: "anna.garcia@example.com",
    password: "Admin1234",
  },
];
