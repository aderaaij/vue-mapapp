const url =
  "https://s3-us-west-2.amazonaws.com/s.cdpn.io/22914/map_dark-matter.json";

export const setMapStyle = ({ commit }) => {
  fetch(url)
    .then(response => response.json())
    .then(json => commit("mapstyle", json));
};
