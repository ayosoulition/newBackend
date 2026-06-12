const IMG_BASE = `${process.env.BASE_URL || "http://localhost:3005"}/uploads/`;

const menuData = {
  boissons: [
    [
      {
        title: "Café Italiano",
        description: "Espresso intense au goût corsé et à la crème onctueuse",
        img: `${IMG_BASE}italiano.jpg`,
        type: "boissons",
        price: 10,
        id: 1,
      },
      {
        title: "Café Americano",
        description: "Espresso allongé, doux et équilibré",
        img: `${IMG_BASE}italiano.jpg`,
        type: "boissons",
        price: 10,
        id: 2,
      },
    ],

    [
      {
        title: "Café Italiano",
        description: "Espresso intense au goût corsé et à la crème onctueuse",
        img: `${IMG_BASE}italiano.jpg`,
        type: "boissons",
        price: 10,
        id: 3,
      },
      {
        title: "Café Americano",
        description: "Espresso allongé, doux et équilibré",
        img: `${IMG_BASE}italiano.jpg`,
        type: "boissons",
        price: 10,
        id: 4,
      },
    ],
    [
      {
        title: "Jus de Mangue",
        description: "Jus de mangue fraîche pressée, sucré et tropical",
        img: `${IMG_BASE}mangoJuice.jpg`,
        type: "boissons",
        price: 13,
        id: 5,
      },
      {
        title: "Jus de Kiwi",
        img: `${IMG_BASE}kiwiJuice.jpg`,
        type: "boissons",
        description: "Jus de kiwi rafraîchissant, riche en vitamine C",
        price: 13,
        id: 6,
      },
    ],
    [
      {
        title: "Jus d'Orange",
        img: `${IMG_BASE}OrangeJuice.jpg`,
        description: "Jus d'orange pressé minute, naturel et vitaminé",
        type: "boissons",
        price: 22,
        id: 7,
      },
      {
        title: "Jus de Citron",
        description: "Citronnade fraîche légèrement sucrée et désaltérante",
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
        title: "Crème d'Amande Mini",
        description: "Viennoiserie feuilletée garnie de crème d'amande dorée",
        img: `${IMG_BASE}cremeAmande.jpg`,
        type: "boulangerie",
        price: 2.5,
        id: 8,
      },
      {
        title: "Pain Suisse Mini",
        description: "Pain suisse moelleux aux pépites de chocolat et crème pâtissière",
        img: `${IMG_BASE}painSuisse.jpg`,
        type: "boulangerie",
        price: 2.5,
        id: 9,
      },
    ],
    [
      {
        title: "Crème d'Amande Grand",
        description: "Grande viennoiserie feuilletée généreusement garnie de crème d'amande",
        img: `${IMG_BASE}cremeAmande.jpg`,
        type: "boulangerie",
        price: 5,
        id: 1,
      },
      {
        title: "Pain Suisse Grand",
        description: "Grand pain suisse moelleux aux pépites de chocolat et crème pâtissière",
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
        title: "Petit Déjeuner Continental",
        description: "Café, jus d'orange, viennoiserie, beurre et confiture",
        img: `${IMG_BASE}continentalBreakFast.jpg`,
        type: "petitDejeuner",
        price: 20,
        id: 11,
      },
      {
        title: "Petit Déjeuner Américain",
        description: "Œufs, bacon, toast, pancakes et café ou jus de fruits",
        img: `${IMG_BASE}americanBreakFast.jpg`,
        type: "petitDejeuner",
        price: 25,
        id: 12,
      },
    ],
    [
      {
        title: "Petit Déjeuner Asiatique",
        description: "Sélection de mets asiatiques légers, idéale pour bien démarrer la journée",
        img: `${IMG_BASE}chineeseBreakFast.jpg`,
        type: "petitDejeuner",
        price: 30,
        id: 13,
      },

      {
        title: "Petit Déjeuner Asiatique",
        description: "Sélection de mets asiatiques légers, idéale pour bien démarrer la journée",
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
        title: "Glace Chocolat",
        description: "Glace onctueuse au chocolat noir belge, intense et gourmande",
        img: `${IMG_BASE}chocolateIceCream.jpg`,
        type: "glaces",
        price: 30,
        id: 17,
      },
      {
        title: "Glace Pistache",
        description: "Glace crémeuse à la pistache de Sicile, douce et parfumée",
        img: `${IMG_BASE}pistashuIceCream.jpg`,
        type: "glaces",
        price: 40,
        id: 18,
      },
    ],
    [
      {
        title: "Glace Vanille",
        description: "Glace à la vanille de Madagascar, douce et fondante",
        img: `${IMG_BASE}vanillaIceCream.jpg`,
        type: "glaces",
        price: 30,
        id: 19,
      },
      {
        title: "Glace Fraise",
        description: "Glace aux fraises fraîches, légère et acidulée",
        img: `${IMG_BASE}strawberryIceCream.jpg`,
        type: "glaces",
        price: 30,
        id: 20,
      },
    ],
  ],
};

module.exports = menuData;
