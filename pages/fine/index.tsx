import FineTuneModelList from '../../components/FineTune/FineTuneModelList';
import FineTuneCreateLoading from '../../components/Loading';
import { useState } from 'react';

const FineTunePage = () => {
  const [isFineTuneCreateLoading, setIsFineTuneCreateLoading] = useState(false);

  return (
    <div className="container mx-auto px-4 max-w-4xl bg-amber-50 rounded-lg mt-4 pb-8 pt-8">
      <h1 className="text-xl text-slate-500 font-bold text-center mb-4">Fine Tune Model</h1>
      <hr />
      <div>
        <FineTuneModelList setIsFineTuneCreateLoading={setIsFineTuneCreateLoading} />
      </div>
      {isFineTuneCreateLoading && <FineTuneCreateLoading />}
    </div>
  );
};

export default FineTunePage;
