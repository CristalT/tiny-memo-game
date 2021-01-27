const images = [
  { id: 1, src: '/images/card1.jpg' },
  { id: 2, src: '/images/card2.jpg' },
  { id: 3, src: '/images/card3.jpg' },
  { id: 4, src: '/images/card4.jpg' },
  { id: 5, src: '/images/card5.jpg' },
  { id: 6, src: '/images/card6.jpg' }
];

export function imgShuffle() {
  const dupImages = images.concat(images);
  return dupImages.sort(() => 0.5 - Math.random());
}
