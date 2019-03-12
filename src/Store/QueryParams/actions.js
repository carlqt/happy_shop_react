export function setFilters(filters) {
  return (dispatch) => {
    dispatch({
      type: "SET_PARAMS",
      data: filters,
    });
  }
}
