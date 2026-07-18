import type { Recipe } from "../types/recipe";

export const menu: Recipe[] = [
  {
    id: 101,
    title: "Chola",
    image:
      "https://i.pinimg.com/736x/6f/a7/37/6fa737b93d140688279133cf571add64.jpg",
    category: "North Indian",
    ingredients: ["Chickpeas", "Spices"],
    instructions: ["Delicious Chole Bhature served with pickle and onions."],
  },
  {
    id: 102,
    title: "Idli",
    image:
      "https://i.pinimg.com/736x/e3/0e/bf/e30ebf20f92a67a2eefb009aabf2d355.jpg",
    category: "South Indian",
    ingredients: ["Rice", "Urad Dal"],
    instructions: [
      "Soft and fluffy idlis served with coconut chutney and sambhar.",
    ],
  },
  {
    id: 103,
    title: "Masala Dosa",
    image:
      "https://i.pinimg.com/736x/f6/3f/9e/f63f9e32f7c9cae39f5b1c385dbd1c38.jpg",
    category: "South Indian",
    ingredients: ["Rice", "Potato"],
    instructions: [
      "Masala dosa with a spicy potato filling and crispy texture.",
    ],
  },
  {
    id: 104,
    title: "Paneer",
    image:
      "https://i.pinimg.com/736x/72/9a/0e/729a0e51c25be429276a01428a5e6fbf.jpg",
    category: "Curry",
    ingredients: ["Paneer", "Spices"],
    instructions: [
      "Creamy paneer curry with rich flavors of spices and butter.",
    ],
  },
  {
    id: 105,
    title: "Maharashtrian Thali",
    image:
      "https://i.pinimg.com/736x/c3/75/d4/c375d41635d85d0c18018add3a70781c.jpg",
    category: "Thali",
    ingredients: ["Potato", "Roti", "Sabzi"],
    instructions: [
      "Traditional Maharashtrian thali with Potato bhaji, roti, sabzi, and sweets.",
    ],
  },
];

export default menu;
