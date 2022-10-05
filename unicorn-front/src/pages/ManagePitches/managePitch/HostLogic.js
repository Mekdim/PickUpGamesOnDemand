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

export const createHours = (hours) => {
  const result = [];
  for (const key in hours) {
    let line = [];
    let value = hours[key];
    line.push(value.id);
    line.push(value.startTime);
    line.push(value.endTime);
    line.push(value.enabled);
    result.push(line);
  }
  return result;
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

export const updatePitchData = (pitchData, pitchId, path) => {
  let backEndUrl = process.env.REACT_APP_backEndUrl || 'http://localhost:8080';
  let url = `${backEndUrl}/${path}/${pitchId}`;
  console.log('URL ', url);
  return fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(pitchData),
  }).then((res) => {
    if (!res.ok) {
      const error = new Error('Unable to update Pitch details');
      error.status = res.status;
      throw error;
    }
    return res.json();
  });
};
