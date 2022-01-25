/* eslint-disable eol-last */
/* eslint-disable comma-dangle */
const roversItems = [
  {
    name: 'curiosity',
    label: 'Curiosity',
  },
  {
    name: 'opportunity',
    label: 'Opportunity',
  },
  {
    name: 'Spirit',
    label: 'Spirit',
  },
];
export default function filterFormatter(roverData) {
  return {
    max_sol: roverData.max_sol,
    cameras: roverData.cameras,
    max_date: roverData.max_date,
    rovers: roversItems,
  };
}
