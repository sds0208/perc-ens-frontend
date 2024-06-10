import { useParams, useLoaderData } from "react-router-dom";
import ListRow from "../components/ListRow";
import MediaPlayer from "../components/MediaPlayer";

const EnsemblePage = () => {
  const { id } = useParams();
  const ensemble = useLoaderData();

  return (
    <div className="ensemble-page">
      <ListRow key={id} ens={ensemble} isList={false} />
      <MediaPlayer audioSrc={ensemble.audio} isEnsemblePage={true}/>
    </div>
  );
};

const ensembleLoader = async ({ params }) => {
  try {
    const res = await fetch(
      `https://perc-ens-db-18ac1191785c.herokuapp.com/api/v1/ensembles/${params.id}`
    );
    const data = await res.json();
    return data[0];
  } catch (error) {
    console.error("Error in fetch call for percussion ensembles.", error);
  }
};

export { EnsemblePage as default, ensembleLoader };
