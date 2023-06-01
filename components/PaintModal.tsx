import { useState } from 'react';

const PaintModal = () => {
  const [isShowModal, setIsShowModal] = useState(true);

  const onChangeShowModal = () => {
    setIsShowModal(!isShowModal);
  };

  return (
    <div>
      {/*<label htmlFor="my-modal-5" className="btn">*/}
      {/*  open modal*/}
      {/*</label>*/}
      {/*<input type="checkbox" id="my-modal-5" className="modal-toggle" checked={isShowModal} />*/}
      <div className="modal modal-open">
        <div className="modal-box w-11/12 max-w-5xl">
          <h3 className="font-bold text-lg">Congratulations random Internet user!</h3>
          <p className="py-4">
            You've been selected for a chance to get one year of subscription to use Wikipedia for
            free!
          </p>
          <div className="modal-action">
            {/*<label htmlFor="my-modal-5" className="btn">*/}
            {/*  Yay!*/}
            {/*</label>*/}
            <button className="btn" onClick={onChangeShowModal} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaintModal;
