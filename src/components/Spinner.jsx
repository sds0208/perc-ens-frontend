import DotLoader from "react-spinners/DotLoader";

const override = {
  display: "block",
  margin: "100px auto",
};

const Spinner = ({ loading }) => {
  console.log("loading spinner");
  return (
    <DotLoader
      color="#91fa9b"
      loading={loading}
      cssOverride={override}
      size={80}
    />
  );
};

export default Spinner;
