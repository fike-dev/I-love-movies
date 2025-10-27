import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// import StarRating from "./StartRating";

// function Test({ defaultRating = 0 }) {
//   const [movieRating, setMovieRating] = useState(defaultRating);

//   return (
//     <div>
//       <StarRating
//         color="blue"
//         maxRating={10}
//         defaultRating={defaultRating}
//         onSetRating={setMovieRating}
//       />
//       <p>Your rating is {movieRating}</p>
//     </div>
//   );
// }

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    {/* <StarRating
      maxRating={5}
      messages={["Terrible", "Bad", "Okay", "Good", "Amazing"]}
    />
    <StarRating
      size={24}
      color="green"
      className="container"
      defaultRating={3}
    />
    <Test defaultRating={3} /> */}
  </React.StrictMode>
);
