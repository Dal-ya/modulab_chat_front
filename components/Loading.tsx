import loadingJson from '../public/spinner-loading.json';
import Lottie from 'react-lottie-player';

const Loading = () => {
  return (
    <div>
      <Lottie
        className="absolute top-0 left-0 z-30 w-full h-full"
        loop
        animationData={loadingJson}
        play
      />
      <div className="absolute top-0 left-0 z-20 w-full h-full bg-slate-900/90"></div>
    </div>
  );
};

export default Loading;
