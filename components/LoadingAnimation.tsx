import Lottie from 'react-lottie-player';
import loadingJson from '../public/loading_painting.json';

const LoadingAnimation = () => {
  return (
    <div>
      <Lottie
        className="absolute top-0 left-0 z-20 w-full h-full"
        loop
        animationData={loadingJson}
        play
      />
      <div className="absolute top-0 left-0 z-10 w-full h-full bg-slate-50/90"></div>
    </div>
  );
};

export default LoadingAnimation;
