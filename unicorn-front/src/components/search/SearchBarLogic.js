import { actionTypes } from "../../reducer";

const dayofweek = {
  1: "monday",
  2: "tuesday",
  3: "wednesday",
  4: "thursday",
  5: "friday",
  6: "saturday",
  7: "sunday",
};

// search pitches based on date and location selected
export const getPitches = ({
  date,
  locationSelected,
  setLoading,
  dispatch,
  history,
}) => {
  if (!date) {
    alert("please select date to search");
    return;
  }
  let backEndUrl = process.env.backEndUrl || "http://localhost:8080";
  let url = `${backEndUrl}/pitch/pitches/`;
  const formatedDate = date.format("YYYY-MM-DD");
  if (locationSelected) {
    url = `${url}${locationSelected.id}/`;
  }

  setLoading(true);
  // date.isoweekeday returns 1-7 starting from monday
  fetch(url + dayofweek[date.isoWeekday()], {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
    //phone number has to be inserted properly as well on sign up
  })
    .then((response) => {
      if (!response.ok) {
        // throw the promise to catch and
        // display message from backend API
        throw response;
      } else return response.json();
    })
    .then((result) => {
      if (result.length > 0) {
        for (let i = 0; i < result.length; i++) {
          // append this value on results so we can use it on pitch card
          result[i]["dateSearched"] = formatedDate;
        }
        dispatch({
          // for now let me ignore the result here
          type: actionTypes.SET_HOME_FIELDS,
          homeFields: {
            fields: result,
          },
        });
        dispatch({
          type: actionTypes.SET_SELECTED_DATE,
          selectedDate: date,
        });
        dispatch({
          type: actionTypes.SET_PITCH_SEARCHED,
          pitchSearched: locationSelected,
        });
      } else {
        dispatch({
          // else dispatch so no field are shown
          type: actionTypes.SET_HOME_FIELDS,
          homeFields: null,
        });
        dispatch({
          type: actionTypes.SET_SELECTED_DATE,
          selectedDate: date,
        });
        dispatch({
          type: actionTypes.SET_PITCH_SEARCHED,
          pitchSearched: locationSelected,
        });
        
      }
      setLoading(false);
      history.push("/search_results");
    })
    .catch((error) => {
      setLoading(false);
      // error can come from rejected Promise fetch api error or from backend API
      // console.log(error.status)
      alert(
        "Sorry, Some server error happened while fetching pitches for the selected date and location!"
      );
      // if error comes from backend API - we can grab the mesage here or send it to logger in the future
      if (typeof error.json === "function") {
        error
          .json()
          .then((error) => {
            //console.log("An API error from backend API while fetching pitch options for userid XXX");
          })
          .catch((genericError) => {
            //console.log("Another error ");
          });
      } else {
        // error status undefined here
        //console.log("some sort of fetch error happended")
      }
    });
};
