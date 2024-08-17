export type Password = {
  id: string;
  userId: string;
  hash: string;
};

export type User = {
  id?: string;
  username: string;
  fullname: string;
  email: string;
  password: string;
};

export const users: User[] = [
  {
    id: "f58ch2o6z749s7wj4cwbc7jg",
    username: "johndoe",
    fullname: "John Doe",
    email: "john.doe@example.com",
    password: "Admin1234",
  },
  {
    id: "spfilbroj5xoa0aoghyh5t40",
    username: "janesmit",
    fullname: "Jane Smith",
    email: "jane.smith@example.com",
    password: "Admin1234",
  },
  {
    id: "mjyfrhp5igij4ji0oonu83r7",
    username: "mikebrown",
    fullname: "Mike Brown",
    email: "mike.brown@example.com",
    password: "Admin1234",
  },
  {
    id: "e5i2m5lwgjg686auesbc7okb",
    username: "emilywong",
    fullname: "Emily Wong",
    email: "emily.wong@example.com",
    password: "Admin1234",
  },
  {
    id: "j95umgj7q06n3ji2z504k9iq",
    username: "alexlee",
    fullname: "Alex Lee",
    email: "alex.lee@example.com",
    password: "Admin1234",
  },
  {
    id: "qwfvprhh49n6q4oo3ex10r4j",
    username: "sarahjones",
    fullname: "Sarah Jones",
    email: "sarah.jones@example.com",
    password: "Admin1234",
  },
  {
    id: "u2ej0i7qw4jcccpivlybdxf8",
    username: "davidkim",
    fullname: "David Kim",
    email: "david.kim@example.com",
    password: "Admin1234",
  },
  {
    id: "r5di8gif7a3g2yhv8al0yury",
    username: "lisachen",
    fullname: "Lisa Chen",
    email: "lisa.chen@example.com",
    password: "Admin1234",
  },
  {
    id: "ntnex4vjjej73u35kp8isoiw",
    username: "tomwilson",
    fullname: "Tom Wilson",
    email: "tom.wilson@example.com",
    password: "Admin1234",
  },
  {
    id: "c94hxhppivybd788xe079ct6",
    username: "annagarcia",
    fullname: "Anna Garcia",
    email: "anna.garcia@example.com",
    password: "Admin1234",
  },
];
