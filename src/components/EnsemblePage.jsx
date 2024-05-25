import { useParams, useLoaderData } from 'react-router-dom';
import ListRow from './ListRow';

const EnsemblePage = () => {
  const { id } = useParams();
  const ensemble = useLoaderData();
  
  return (
		<div className="ensemble-page">
			<ListRow key={id} ens={ensemble} />
		</div>
  )
}

const ensembleLoader = async ({ params }) => {
    try {
		console.log(params.id)
        const res = await fetch(`http://localhost:3000/api/v1/ensembles/${params.id}`);
        const data = await res.json();
		return data[0];
    } catch (error) {
        console.error('Error in fetch call for percussion ensembles.', error);
    } 
  }

export { EnsemblePage as default, ensembleLoader };