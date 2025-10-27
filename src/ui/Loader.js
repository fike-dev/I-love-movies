import icons from "../icons.svg";

export default function Loader() {
  return (
    <div className="loader">
      <svg>
        <use href={`${icons}#icon-loader`}></use>
      </svg>
    </div>
  );
}
