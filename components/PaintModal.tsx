import Image from 'next/image';
import Swal from 'sweetalert2';

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
            {/* TODO: 이미지 클라이언트에 저장해보기 */}
            {/*<button className="btn btn-active btn-ghost" disabled={!paintBlobData}>*/}
            {/*  저장하기*/}
            {/*</button>*/}
            <button
              className="btn"
              onClick={() => {
                Swal.fire({
                  text: '정말 닫으시겠습니까?',
                  showCancelButton: true,
                  confirmButtonText: '네',
                  cancelButtonText: '아니오',
                }).then((result) => {
                  if (result.isConfirmed) {
                    onHandleModal(false);
                  }
                });
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
