const createBody = (data) => {
  return {
    hostId: data.hostId,
    name: data.name,
    type: data.type,
    city: 'Addis Ababa',
    country: 'Ethiopia',
    latitude: data.lat,
    longitude: data.lon,
    description: data.description,
    price: data.price,
    capacity: data.minMax[1],
    url: data.url,
    openingHours: {
      Monday: data.Monday,
      Tuesday: data.Tuesday,
      Thursday: data.Thursday,
      Wednesday: data.Wednesday,
      Friday: data.Friday,
      Saturday: data.Saturday,
      Sunday: data.Sunday,
    },
    specialHours: {
      raw: data,
    },
  };
};

export const createPitch = (formData) => {
  let backEndUrl = process.env.REACT_APP_backEndUrl || 'http://localhost:8080';
  let url = `${backEndUrl}/pitch/create`;
  let body = createBody(formData);
  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }).then((res) => {
    if (!res.ok) {
      const error = new Error('Unable to create Pitch');
      error.status = res.status;
      throw error;
    }
    return res.json();
  });
};
