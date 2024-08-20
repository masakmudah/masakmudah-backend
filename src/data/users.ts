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
    username: "chian",
    fullname: "Chian Yung",
    email: "chian@example.com",
    password: "Admin1234",
  },
  {
    id: "spfilbroj5xoa0aoghyh5t40",
    username: "sidiqcahyono",
    fullname: "Sidiq Cahyono",
    email: "sidiqcahyono@example.com",
    password: "Admin1234",
  },
  {
    id: "mjyfrhp5igij4ji0oonu83r7",
    username: "shiwilsahid",
    fullname: "Shiwil Sahid",
    email: "shiwilsahid@example.com",
    password: "Admin1234",
  },
  {
    id: "e5i2m5lwgjg686auesbc7okb",
    username: "rido",
    fullname: "Rido Atmanto",
    email: "rido@example.com",
    password: "Admin1234",
  },
  {
    id: "j95umgj7q06n3ji2z504k9iq",
    username: "chefarnold",
    fullname: "Chef Arnold Poernomo",
    email: "chefarnold@example.com",
    password: "Admin1234",
  },
  {
    id: "qwfvprhh49n6q4oo3ex10r4j",
    username: "chefreynold",
    fullname: "Chef Reynold Poernomo",
    email: "chefreynold@example.com",
    password: "Admin1234",
  },
  {
    id: "u2ej0i7qw4jcccpivlybdxf8",
    username: "cheffarah",
    fullname: "Chef Farah Quinn",
    email: "cheffarah@example.com",
    password: "Admin1234",
  },
  {
    id: "r5di8gif7a3g2yhv8al0yury",
    username: "chefrinrin",
    fullname: "Chef Rinrin Marinka",
    email: "chefrinrin@example.com",
    password: "Admin1234",
  },
  {
    id: "ntnex4vjjej73u35kp8isoiw",
    username: "chefjuna",
    fullname: "Chef Juna Rorimpandey",
    email: "chefjuna@example.com",
    password: "Admin1234",
  },
  {
    id: "c94hxhppivybd788xe079ct6",
    username: "chefrenatta",
    fullname: "Chef Renatta Moeloek",
    email: "chefrenatta@example.com",
    password: "Admin1234",
  },
];
