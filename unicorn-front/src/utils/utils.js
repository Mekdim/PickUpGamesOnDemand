const addDay = ({ date, numberOfDays = 1 }) => {
  let currentDate = new Date(date);
  currentDate.setDate(currentDate.getDate() + numberOfDays);
  return currentDate.toDateString();
};

const subtractDay = ({ date, numberOfDays = 1 }) => {
  let currentDate = new Date(date);
  currentDate.setDate(currentDate.getDate() - numberOfDays);
  return currentDate.toDateString();
};

const convertToDateString = (date) => {
  return new Date(date).toDateString();
};

const getDate = (date) => {
  return date ? date.split("T")[0] : "";
};

const topShiftMultiplier = (minute) => {
  let shift;
  switch (minute) {
    case 0:
      shift = 0;
      break;
    case 15:
      shift = 1;
      break;
    case 30:
      shift = 2;
      break;
    case 45:
      shift = 3;
      break;
    default:
      break;
  }
  return shift;
};

const countUnique = (iterable) => {
  let set = new Set();
  iterable.forEach((player) => {
    if (player.player_id !== null) {
      set.add(player.player_id);
    }
  });
  return set.size;
};

module.exports = {
  addDay,
  subtractDay,
  convertToDateString,
  topShiftMultiplier,
  getDate,
  countUnique,
};
