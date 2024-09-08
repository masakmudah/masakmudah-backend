import { getCategoryIdBySlug } from "../../src/utils/get-category-id-by-slug";

export const recipes = [
  {
    id: "ksx12anz5kkwx663disf08kv",
    name: "Nasi Goreng",
    description: "Resep nasi goreng spesial.",
    cookingTime: "30 menit",
    imageURL:
      "https://ucarecdn.com/aa5a051e-4c79-425c-8ea7-8b38cc9307f1/nasigoreng.png",
    userId: "f58ch2o6z749s7wj4cwbc7jg",
    ingredientItems: [
      {
        quantity: 2,
        measurement: "piring",
        sequence: 1,
        ingredient: {
          name: "Nasi Putih",
          slug: "nasi-putih",
        },
      },
      {
        quantity: 2,
        measurement: "siung",
        sequence: 2,
        ingredient: {
          name: "Bawang Putih",
          slug: "bawang-putih",
        },
      },
      {
        quantity: 3,
        measurement: "siung",
        sequence: 3,
        ingredient: {
          name: "Bawang Merah",
          slug: "bawang-merah",
        },
      },
      {
        quantity: 1,
        measurement: "butir",
        sequence: 4,
        ingredient: {
          name: "Telur",
          slug: "telur",
        },
      },
      {
        quantity: 2,
        measurement: "sdm",
        sequence: 5,
        ingredient: {
          name: "Kecap Manis",
          slug: "kecap-manis",
        },
      },
    ],
    instructions: [
      {
        step: 1,
        description:
          "Panaskan minyak, tumis bawang putih dan bawang merah hingga harum.",
      },
      { step: 2, description: "Masukkan telur, orak-arik hingga matang." },
      { step: 3, description: "Tambahkan nasi putih, aduk rata." },
      { step: 4, description: "Tuangkan kecap manis, aduk hingga merata." },
      {
        step: 5,
        description:
          "Sajikan nasi goreng dengan pelengkap suwiran ayam atau sosis sesuai selera.",
      },
    ],
    categoryIds: getCategoryIdBySlug(["ayam"]),
  },
  {
    id: "fe5unxwewzzm0klnic56g1wn",
    name: "Sate Ayam",
    description: "Resep sate ayam dengan bumbu kacang.",
    cookingTime: "30 menit",
    imageURL:
      "https://ucarecdn.com/469012c8-ddc1-449c-a697-421a434864ea/sateayam.png",
    userId: "f58ch2o6z749s7wj4cwbc7jg",
    ingredientItems: [
      {
        quantity: 500,
        measurement: "gram",
        sequence: 1,
        ingredient: {
          name: "Daging Ayam",
          slug: "daging-ayam",
        },
      },
      {
        quantity: 100,
        measurement: "gram",
        sequence: 2,
        ingredient: {
          name: "Kacang Tanah",
          slug: "kacang-tanah",
        },
      },
      {
        quantity: 3,
        measurement: "siung",
        sequence: 3,
        ingredient: {
          name: "Bawang Putih",
          slug: "bawang-putih",
        },
      },
      {
        quantity: 2,
        measurement: "sdm",
        sequence: 4,
        ingredient: {
          name: "Kecap Manis",
          slug: "kecap-manis",
        },
      },
      {
        quantity: 1,
        measurement: "sdm",
        sequence: 5,
        ingredient: {
          name: "Gula Merah",
          slug: "gula-merah",
        },
      },
    ],
    instructions: [
      {
        step: 1,
        description: "Potong daging ayam, tusuk dengan tusukan sate.",
      },
      {
        step: 2,
        description: "Haluskan kacang tanah, bawang putih, dan bumbu lainnya.",
      },
      {
        step: 3,
        description: "Olesi sate dengan bumbu kacang, bakar hingga matang.",
      },
      { step: 4, description: "Sajikan sate ayam dengan bumbu kacang." },
    ],
    categoryIds: getCategoryIdBySlug(["ayam"]),
  },
  {
    id: "xlltcvjp1n2ehpddgf0vbajd",
    name: "Rendang Daging",
    description: "Resep rendang daging khas Padang.",
    cookingTime: "2 jam",
    imageURL:
      "https://ucarecdn.com/5d20a762-8940-4f8e-8e86-ae6144a4c22a/rendangdaging.png",
    userId: "f58ch2o6z749s7wj4cwbc7jg",
    ingredientItems: [
      {
        quantity: 1,
        measurement: "kg",
        sequence: 1,
        ingredient: {
          name: "Daging Sapi",
          slug: "daging-sapi",
        },
      },
      {
        quantity: 200,
        measurement: "ml",
        sequence: 2,
        ingredient: {
          name: "Santan",
          slug: "santan",
        },
      },
      {
        quantity: 5,
        measurement: "buah",
        sequence: 3,
        ingredient: {
          name: "Cabai Merah",
          slug: "cabai-merah",
        },
      },
      {
        quantity: 2,
        measurement: "siung",
        sequence: 4,
        ingredient: {
          name: "Bawang Putih",
          slug: "bawang-putih",
        },
      },
      {
        quantity: 6,
        measurement: "siung",
        sequence: 5,
        ingredient: {
          name: "Bawang Merah",
          slug: "bawang-merah",
        },
      },
    ],
    instructions: [
      { step: 1, description: "Potong daging sapi sesuai selera." },
      { step: 2, description: "Tumis bumbu halus hingga harum." },
      {
        step: 3,
        description: "Masukkan daging sapi, aduk hingga berubah warna.",
      },
      {
        step: 4,
        description: "Tambahkan santan, masak dengan api kecil hingga meresap.",
      },
      {
        step: 5,
        description:
          "Masak hingga rendang mengering dan bumbu meresap sempurna.",
      },
    ],
    categoryIds: getCategoryIdBySlug(["daging"]),
  },
  {
    id: "mqc8by4941kbxipuldyu1ymz",
    name: "Gado-Gado",
    description: "Resep gado-gado sayur dengan saus kacang.",
    cookingTime: "20 menit",
    imageURL:
      "https://ucarecdn.com/b0809cbc-cf56-4f9b-acb4-0dbe013d7a34/gadogado.png",
    userId: "f58ch2o6z749s7wj4cwbc7jg",
    ingredientItems: [
      {
        quantity: 200,
        measurement: "gram",
        sequence: 1,
        ingredient: {
          name: "Tauge",
          slug: "tauge",
        },
      },
      {
        quantity: 100,
        measurement: "gram",
        sequence: 2,
        ingredient: {
          name: "Kacang Panjang",
          slug: "kacang-panjang",
        },
      },
      {
        quantity: 2,
        measurement: "butir",
        sequence: 3,
        ingredient: {
          name: "Telur",
          slug: "telur",
        },
      },
      {
        quantity: 100,
        measurement: "gram",
        sequence: 4,
        ingredient: {
          name: "Tahu",
          slug: "tahu",
        },
      },
      {
        quantity: 100,
        measurement: "gram",
        sequence: 5,
        ingredient: {
          name: "Tempe",
          slug: "tempe",
        },
      },
    ],
    instructions: [
      { step: 1, description: "Rebus semua sayuran hingga matang." },
      {
        step: 2,
        description: "Haluskan kacang tanah, bawang putih, dan bumbu lainnya.",
      },
      { step: 3, description: "Campur sayuran dengan saus kacang." },
      {
        step: 4,
        description: "Sajikan gado-gado dengan pelengkap sesuai selera.",
      },
    ],
    categoryIds: getCategoryIdBySlug(["sayuran"]),
  },
  {
    id: "em88a3piv8cpot3erhjod3wk",
    name: "Bakso",
    description: "Resep bakso daging sapi dengan kuah kaldu.",
    cookingTime: "60 menit",
    imageURL:
      "https://ucarecdn.com/9ad6a3ea-169c-4f2c-997d-50e8caa871fa/bakso.png",
    userId: "f58ch2o6z749s7wj4cwbc7jg",
    ingredientItems: [
      {
        quantity: 500,
        measurement: "gram",
        sequence: 1,
        ingredient: {
          name: "Daging Sapi",
          slug: "daging-sapi",
        },
      },
      {
        quantity: 100,
        measurement: "gram",
        sequence: 2,
        ingredient: {
          name: "Tepung Tapioka",
          slug: "tepung-tapioka",
        },
      },
      {
        quantity: 3,
        measurement: "siung",
        sequence: 3,
        ingredient: {
          name: "Bawang Putih",
          slug: "bawang-putih",
        },
      },
      {
        quantity: 1,
        measurement: "butir",
        sequence: 4,
        ingredient: {
          name: "Telur",
          slug: "telur",
        },
      },
      {
        quantity: 1,
        measurement: "sdm",
        sequence: 5,
        ingredient: {
          name: "Garam",
          slug: "garam",
        },
      },
    ],
    instructions: [
      {
        step: 1,
        description:
          "Campur daging sapi giling dengan tepung tapioka dan bumbu.",
      },
      { step: 2, description: "Bentuk adonan menjadi bola-bola bakso." },
      { step: 3, description: "Rebus bakso hingga mengapung." },
      {
        step: 4,
        description: "Sajikan bakso dengan kuah kaldu dan pelengkap.",
      },
    ],
    categoryIds: getCategoryIdBySlug(["daging"]),
  },
  {
    id: "dauk8w2d7e78av47l0xkgrng",
    name: "Mie Goreng",
    description: "Resep mie goreng dengan telur dan sayuran.",
    cookingTime: "10 menit",
    imageURL:
      "https://ucarecdn.com/a2071ec3-ffd2-470c-9dc2-605fedb52d05/miegoreng.png",
    userId: "spfilbroj5xoa0aoghyh5t40",
    ingredientItems: [
      {
        quantity: 200,
        measurement: "gram",
        sequence: 1,
        ingredient: {
          name: "Mie Telur",
          slug: "mie-telur",
        },
      },
      {
        quantity: 2,
        measurement: "butir",
        sequence: 2,
        ingredient: {
          name: "Telur",
          slug: "telur",
        },
      },
      {
        quantity: 100,
        measurement: "gram",
        sequence: 3,
        ingredient: {
          name: "Wortel",
          slug: "wortel",
        },
      },
      {
        quantity: 100,
        measurement: "gram",
        sequence: 4,
        ingredient: {
          name: "Kol",
          slug: "kol",
        },
      },
      {
        quantity: 2,
        measurement: "sdm",
        sequence: 5,
        ingredient: {
          name: "Kecap Manis",
          slug: "kecap-manis",
        },
      },
    ],
    instructions: [
      { step: 1, description: "Rebus mie telur hingga matang, tiriskan." },
      {
        step: 2,
        description: "Tumis bawang putih dan bawang merah hingga harum.",
      },
      { step: 3, description: "Masukkan telur, orak-arik hingga matang." },
      { step: 4, description: "Tambahkan sayuran, aduk rata." },
      {
        step: 5,
        description: "Masukkan mie dan kecap manis, aduk hingga merata.",
      },
    ],
    categoryIds: getCategoryIdBySlug(["sayuran"]),
  },
  {
    id: "vei3oeq8kuoz0aovk2poa3d4",
    name: "Soto Ayam",
    description: "Resep soto ayam kuah kuning.",
    cookingTime: "60 menit",
    imageURL:
      "https://ucarecdn.com/ce84574b-d931-4bbf-8488-758f5f3e71c6/sotoayam.png",
    userId: "spfilbroj5xoa0aoghyh5t40",
    ingredientItems: [
      {
        quantity: 500,
        measurement: "gram",
        sequence: 1,
        ingredient: {
          name: "Daging Ayam",
          slug: "daging-ayam",
        },
      },
      {
        quantity: 2,
        measurement: "batang",
        sequence: 2,
        ingredient: {
          name: "Serai",
          slug: "serai",
        },
      },
      {
        quantity: 3,
        measurement: "lembar",
        sequence: 3,
        ingredient: {
          name: "Daun Jeruk",
          slug: "daun-jeruk",
        },
      },
      {
        quantity: 2,
        measurement: "siung",
        sequence: 4,
        ingredient: {
          name: "Bawang Putih",
          slug: "bawang-putih",
        },
      },
      {
        quantity: 4,
        measurement: "siung",
        sequence: 5,
        ingredient: {
          name: "Bawang Merah",
          slug: "bawang-merah",
        },
      },
    ],
    instructions: [
      { step: 1, description: "Rebus daging ayam hingga matang, suwir-suwir." },
      { step: 2, description: "Tumis bumbu halus hingga harum." },
      {
        step: 3,
        description: "Masukkan serai, daun jeruk, dan bumbu lainnya.",
      },
      {
        step: 4,
        description: "Tambahkan air kaldu ayam, masak hingga mendidih.",
      },
      {
        step: 5,
        description: "Sajikan soto ayam dengan pelengkap sesuai selera.",
      },
    ],
    categoryIds: getCategoryIdBySlug(["ayam"]),
  },
  {
    id: "a7mba5y1hpbsxe3sgto3109c",
    name: "Pecel Lele",
    description: "Resep pecel lele dengan sambal terasi.",
    cookingTime: "30 menit",
    imageURL:
      "https://ucarecdn.com/0ec48b8f-b92a-41b5-9359-c522f80f4e67/pecellele.png",
    userId: "spfilbroj5xoa0aoghyh5t40",
    ingredientItems: [
      {
        quantity: 1,
        measurement: "kg",
        sequence: 1,
        ingredient: {
          name: "Lele",
          slug: "lele",
        },
      },
      {
        quantity: 5,
        measurement: "buah",
        sequence: 2,
        ingredient: {
          name: "Cabai Merah",
          slug: "cabai-merah",
        },
      },
      {
        quantity: 2,
        measurement: "siung",
        sequence: 3,
        ingredient: {
          name: "Bawang Putih",
          slug: "bawang-putih",
        },
      },
      {
        quantity: 4,
        measurement: "siung",
        sequence: 4,
        ingredient: {
          name: "Bawang Merah",
          slug: "bawang-merah",
        },
      },
      {
        quantity: 1,
        measurement: "sdm",
        sequence: 5,
        ingredient: {
          name: "Terasi",
          slug: "terasi",
        },
      },
    ],
    instructions: [
      { step: 1, description: "Bersihkan lele, goreng hingga matang." },
      {
        step: 2,
        description:
          "Haluskan cabai merah, bawang putih, bawang merah, dan terasi.",
      },
      { step: 3, description: "Tumis bumbu halus hingga matang." },
      { step: 4, description: "Sajikan lele goreng dengan sambal terasi." },
    ],
    categoryIds: getCategoryIdBySlug(["daging"]),
  },
  {
    id: "tjwofowa94ghzlhx421utlsf",
    name: "Gudeg Jogja",
    description: "Resep gudeg khas Jogja dengan nangka muda.",
    cookingTime: "60 menit",
    imageURL:
      "https://ucarecdn.com/7b5139e1-88d0-4b76-92e9-ca275bcfbb44/gudegjogja.png",
    userId: "spfilbroj5xoa0aoghyh5t40",
    ingredientItems: [
      {
        quantity: 1,
        measurement: "kg",
        sequence: 1,
        ingredient: {
          name: "Nangka Muda",
          slug: "nangka-muda",
        },
      },
      {
        quantity: 200,
        measurement: "ml",
        sequence: 2,
        ingredient: {
          name: "Santan",
          slug: "santan",
        },
      },
      {
        quantity: 5,
        measurement: "butir",
        sequence: 3,
        ingredient: {
          name: "Telur",
          slug: "telur",
        },
      },
      {
        quantity: 2,
        measurement: "siung",
        sequence: 4,
        ingredient: {
          name: "Bawang Putih",
          slug: "bawang-putih",
        },
      },
      {
        quantity: 6,
        measurement: "siung",
        sequence: 5,
        ingredient: {
          name: "Bawang Merah",
          slug: "bawang-merah",
        },
      },
    ],
    instructions: [
      { step: 1, description: "Potong nangka muda menjadi bagian kecil." },
      { step: 2, description: "Rebus nangka muda hingga empuk." },
      { step: 3, description: "Tumis bumbu halus hingga harum." },
      {
        step: 4,
        description: "Masukkan nangka muda dan santan, masak hingga meresap.",
      },
      { step: 5, description: "Tambahkan telur rebus, masak sebentar." },
    ],
    categoryIds: getCategoryIdBySlug(["sayuran"]),
  },
  {
    id: "aj5jh2ul890phzetx8ds01u2",
    name: "Nasi Uduk",
    description: "Resep nasi uduk dengan sambal kacang.",
    cookingTime: "60 menit",
    imageURL:
      "https://ucarecdn.com/537475d0-ea1c-4ee5-8e68-185ce5a0de9e/nasiuduk.png",
    userId: "spfilbroj5xoa0aoghyh5t40",
    ingredientItems: [
      {
        quantity: 500,
        measurement: "gram",
        sequence: 1,
        ingredient: {
          name: "Beras",
          slug: "beras",
        },
      },
      {
        quantity: 200,
        measurement: "ml",
        sequence: 2,
        ingredient: {
          name: "Santan",
          slug: "santan",
        },
      },
      {
        quantity: 2,
        measurement: "lembar",
        sequence: 3,
        ingredient: {
          name: "Daun Salam",
          slug: "daun-salam",
        },
      },
      {
        quantity: 1,
        measurement: "batang",
        sequence: 4,
        ingredient: {
          name: "Serai",
          slug: "serai",
        },
      },
      {
        quantity: 1,
        measurement: "sdm",
        sequence: 5,
        ingredient: {
          name: "Garam",
          slug: "garam",
        },
      },
    ],
    instructions: [
      { step: 1, description: "Cuci beras hingga bersih." },
      {
        step: 2,
        description: "Rebus santan dengan daun salam, serai, dan garam.",
      },
      { step: 3, description: "Masukkan beras, masak hingga santan meresap." },
      { step: 4, description: "Kukus nasi hingga matang." },
      {
        step: 5,
        description: "Sajikan nasi uduk dengan sambal kacang dan pelengkap.",
      },
    ],
    categoryIds: getCategoryIdBySlug(["sayuran"]),
  },
];
