export const mapstyle = (state, payload) => {
  state.mapStyle = payload;
  state.history.push("mapstyle");
};
