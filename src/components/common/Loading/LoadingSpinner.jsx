import { TailSpin } from 'react-loader-spinner';
import './LoadingSpinner.css';

export const LoadingSpinner = () => {
  return (
    <div className="loading-spinner">
      <div className="spinner"></div>
    </div>
  );
};

export const ButtonLoader = ({color}) => {
  return (
     <div className="flex items-center justify-center">
     <TailSpin
visible={true}
height="15"
width="15"
color={color || "#fff"}
ariaLabel="tail-spin-loading"
radius="1"
wrapperStyle={{}}
wrapperClass=""
/>
    </div>
  );
}
