import { PuffLoader } from 'react-spinners';

function Loader() {
  const loaderCSSOverride = {
    marginTop: '200px',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  };
  return (
    <PuffLoader color={'orange'} size={100} cssOverride={loaderCSSOverride} />
  );
}

export default Loader;
