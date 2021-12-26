const fetchEvents = ({ date, pitchId }) => {
  let urlDate = convertDate(new Date(date));
  let backEndUrl = process.env.backEndUrl || "http://localhost:8080";
  return fetch(
    `${backEndUrl}/pitch/${pitchId}/${urlDate}/sessions/days`,
    {
      method: "GET",
    }
  )
    .then((res) => {
      if (!res.ok) {
        throw new Error(res.status);
      }
      return res.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Unable to fetch events ", error);
      return [[], []];
    });
};

const convertDate = (date) => {
  let yyyy = date.getFullYear().toString();
  let mm = (date.getMonth() + 1).toString();
  let dd = date.getDate().toString();

  let mmChars = mm.split("");
  let ddChars = dd.split("");

  return (
    yyyy +
    "-" +
    (mmChars[1] ? mm : "0" + mmChars[0]) +
    "-" +
    (ddChars[1] ? dd : "0" + ddChars[0])
  );
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

module.exports = {
  topShiftMultiplier,
  fetchEvents,
  convertDate,
};
