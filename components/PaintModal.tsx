import Image from 'next/image';

const PaintModal = ({
  paintUrl,
  onHandleModal,
  onPaintDownload,
  paintBlobData,
}: {
  paintUrl: string;
  onHandleModal: (isShow: boolean) => void;
  onPaintDownload: () => void;
  paintBlobData: Blob | null;
}) => {
  return (
    <div>
      <div className="modal modal-open">
        <div className="modal-box">
          <h3 className="font-bold text-lg">그림을 감상해 보세요</h3>
          <div className="py-4">
            <Image src={paintUrl} width={500} height={500} alt={'dall-e'} />
          </div>

          <div className="modal-action">
            <button
              className="btn btn-active btn-ghost"
              onClick={onPaintDownload}
              disabled={!paintBlobData}
            >
              다운로드
            </button>
            <button className="btn btn-active btn-ghost" disabled={!paintBlobData}>
              저장하기
            </button>
            <button
              className="btn"
              onClick={() => {
                onHandleModal(false);
              }}
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaintModal;
