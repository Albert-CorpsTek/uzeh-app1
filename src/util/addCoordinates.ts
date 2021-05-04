const R_EARTH = 6378000;

const addCoordinates = (latLng, d) => {
  const {latitude, longitude} = latLng;

  const newLatitude = latitude + (d / R_EARTH) * (180 / Math.PI);
  const newLongitude = longitude + (d / R_EARTH) * (180 / Math.PI) / Math.cos(latitude * Math.PI / 180);

  return {
    latitude: newLatitude, 
    longitude: newLongitude
  };
};

export default addCoordinates;