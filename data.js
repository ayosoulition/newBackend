const IMG_BASE = "http://localhost:3005/uploads/";

const menuData = {
  boissons: [
    [
      {
        title: "Italiano",
        description: "description goes here",
        img: `${IMG_BASE}italiano.jpg`,
        type: "boissons",
        price: 10,
        id: 1,
      },
      {
        title: "Americano",
        description: "description goes here",
        img: `${IMG_BASE}italiano.jpg`,
        type: "boissons",
        price: 10,
        id: 2,
      },
    ],

    [
      {
        title: "Italiano",
        description: "description goes here",
        img: `${IMG_BASE}italiano.jpg`,
        type: "boissons",
        price: 10,
        id: 3,
      },
      {
        title: "Americano",
        description: "description goes here",
        img: `${IMG_BASE}italiano.jpg`,
        type: "boissons",
        price: 10,
        id: 4,
      },
    ],
    [
      {
        title: "mangoJuice",
        description: "description goes here",
        img: `${IMG_BASE}mangoJuice.jpg`,
        type: "boissons",
        price: 13,
        id: 5,
      },
      {
        title: "Kiwi Juice",
        img: `${IMG_BASE}kiwiJuice.jpg`,
        type: "boissons",
        description: "description goes here",
        price: 13,
        id: 6,
      },
    ],
    [
      {
        title: "Orange Juice",
        img: `${IMG_BASE}OrangeJuice.jpg`,
        description: "description goes here",
        type: "boissons",
        price: 22,
        id: 7,
      },
      {
        title: "Lemon Juice",
        description: "description goes here",
        img: `${IMG_BASE}lemonJuice.jpg`,
        type: "boissons",
        price: 24,
        id: 8,
      },
    ],
  ],

  boulangerie: [
    [
      {
        title: "Creme Amande mini",
        description: "description goes here",
        img: `${IMG_BASE}cremeAmande.jpg`,
        type: "boulangerie",
        price: 2.5,
        id: 8,
      },
      {
        title: "Pain suisse mini",
        description: "description goes here",
        img: `${IMG_BASE}painSuisse.jpg`,
        type: "boulangerie",
        price: 2.5,
        id: 9,
      },
    ],
    [
      {
        title: "Creme Amande big",
        description: "description goes here",
        img: `${IMG_BASE}cremeAmande.jpg`,
        type: "boulangerie",
        price: 5,
        id: 1,
      },
      {
        title: "Pain suise big",
        description: "description goes here",
        img: `${IMG_BASE}painSuisse.jpg`,
        type: "boulangerie",
        price: 8,
        id: 10,
      },
    ],
  ],

  petitDejeuner: [
    [
      {
        title: "Continental BreakFast",
        description: "description goes here",
        img: `${IMG_BASE}continentalBreakFast.jpg`,
        type: "petitDejeuner",
        price: 20,
        id: 11,
      },
      {
        title: "American BreakFast",
        description: "description goes here",
        img: `${IMG_BASE}americanBreakFast.jpg`,
        type: "petitDejeuner",
        price: 25,
        id: 12,
      },
    ],
    [
      {
        title: "Chineese petitDejeuner",
        description: "Chineese petitDejeuner perfect for the morning ",
        img: `${IMG_BASE}chineeseBreakFast.jpg`,
        type: "petitDejeuner",
        price: 30,
        id: 13,
      },

      {
        title: "Chineese petitDejeuner",
        description: "Chineese petitDejeuner perfect for the morning ",
        img: `${IMG_BASE}chineeseBreakFast.jpg`,
        type: "petitDejeuner",
        price: 30,
        id: 14,
      },
    ],
  ],

  glaces: [
    [
      {
        title: "Chocolate",
        description: "description goes here",
        img: `${IMG_BASE}chocolateIceCream.jpg`,
        type: "glaces",
        price: 30,
        id: 17,
      },
      {
        title: "Pistashu",
        description: "description goes here",
        img: `${IMG_BASE}pistashuIceCream.jpg`,
        type: "glaces",
        price: 40,
        id: 18,
      },
    ],
    [
      {
        title: "Vanilla",
        description: "description goes here",
        img: `${IMG_BASE}vanillaIceCream.jpg`,
        type: "glaces",
        price: 30,
        id: 19,
      },
      {
        title: "Strawberry",
        description: "description goes here",
        img: `${IMG_BASE}strawberryIceCream.jpg`,
        type: "glaces",
        price: 30,
        id: 20,
      },
    ],
  ],
};

module.exports = menuData;
