import PaintForm from '../components/PaintForm';
import { PaintData } from '../lib/type';
import usePaint from '../hooks/usePaint';
import { useEffect, useState } from 'react';
import LoadingAnimation from '../components/LoadingAnimation';
import Portal from '../components/Portal';
import PaintModal from '../components/PaintModal';
import { convertUrlToBlob } from '../utils/helpers';

const Home = () => {
  const [paintUrl, setPaintUrl] = useState('');
  const [isShowLoading, setIsShowLoading] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [paintBlobData, setPaintBlobData] = useState<Blob | null>(null);
  const { trigger, isMutating } = usePaint();
  const onCreatePaint = async (payload: PaintData) => {
    // init
    setPaintUrl('');
    setPaintBlobData(null);

    // @ts-ignore
    const response = await trigger(payload);

    // 이미지 url 이 없는 경우
    if (!response?.data.url) {
      alert('생성된 이미지가 없습니다. 다시 시도해 주세요.');
      return;
    }

    // limit 초과된 경우
    if (response?.data.url === 'LIMIT') {
      alert('사용량이 초과되었습니다.');
      return;
    }

    setPaintUrl(response?.data.url);

    // 저장하기, 다운로드를 위해 미리 blob 파일 준비하기
    const blobData = await convertUrlToBlob(response?.data.url);
    if (blobData) {
      setPaintBlobData(blobData);
    } else {
      setPaintBlobData(null);
    }
  };

  const onPaintDownload = () => {
    if (paintBlobData) {
      const url = URL.createObjectURL(paintBlobData);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'paint_by_gpt.png';
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } else {
      alert('잠시 후 다시 시도해 주세요.');
    }
  };

  useEffect(() => {
    let sid: NodeJS.Timeout;

    if (isMutating) {
      sid = setTimeout(() => {
        setIsShowLoading(true);
      }, 1300);
    } else {
      setIsShowLoading(false);
    }
    return () => {
      clearTimeout(sid);
    };
  });

  useEffect(() => {
    if (paintUrl) {
      setIsShowModal(true);
    } else {
      setIsShowModal(false);
    }
  }, [paintUrl]);

  return (
    <div className="container mx-auto px-4 max-w-3xl bg-amber-50 rounded-lg mt-4 pb-8 pt-8">
      <p>
        <small>*데스크톱 화면(1260px)에 맞추어 제작 되었습니다.</small>
      </p>
      <h1 className="text-3xl text-black font-bold p-4 text-center mb-10">
        화가 스타일로 그림 만들기&nbsp;
        <span className="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-pink-500 relative inline-block">
          <span className="relative text-white">with GPT-3.5</span>
        </span>
      </h1>

      <PaintForm onCreatePaint={onCreatePaint} isLoading={isMutating} />

      {isShowLoading && (
        <Portal>
          <LoadingAnimation />
        </Portal>
      )}

      {isShowModal && (
        <PaintModal
          paintUrl={paintUrl}
          onHandleModal={setIsShowModal}
          onPaintDownload={onPaintDownload}
          paintBlobData={paintBlobData}
        />
      )}
    </div>
  );
};

export default Home;
