import axios from 'axios';
import useSWR, { useSWRConfig } from 'swr';
import dayjs from 'dayjs';
import { ResponseFineTuneModel } from '../../lib/type';
import { FileInput, rem, Input } from '@mantine/core';
import { IconUpload } from '@tabler/icons-react';
import Swal from 'sweetalert2';
import { ChangeEvent, Dispatch, SetStateAction, useState, FormEvent } from 'react';

const utc = require('dayjs/plugin/utc');
dayjs.extend(utc);

const fetcher = (url: string) => axios.get(url).then((res) => res.data);
const FETCH_API_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/list-fine-tune`;

const FineTuneModelList = ({
  setIsFineTuneCreateLoading,
}: {
  setIsFineTuneCreateLoading: Dispatch<SetStateAction<boolean>>;
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [fileValue, setFileValue] = useState<File | null>(null);
  const [modelName, setModelName] = useState('');
  const [removingModel, setRemovingModel] = useState<string[]>([]);
  const { isLoading, data, error } = useSWR(FETCH_API_URL, fetcher);
  const { mutate } = useSWRConfig();

  const onCreateFineTune = async (e: FormEvent) => {
    try {
      e.preventDefault();

      if (!fileValue || !modelName) {
        alert('파일과 모델명을 입력하세요');
        return;
      }

      const formData = new FormData();
      formData.append('file', fileValue);
      formData.append('modelName', modelName);

      setIsFineTuneCreateLoading(true);
      setModalOpen(false);

      const response = await axios({
        method: 'POST',
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/create-fine-tune`,
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      await Swal.fire({
        text: '모델 생성에 성공하였습니다. 목록 페이지에서 활용하세요',
        confirmButtonText: '확인',
      });

      await mutate(FETCH_API_URL);

      setIsFineTuneCreateLoading(false);
    } catch (err) {
      console.log(err);
      alert('에러. 다시 시도해주세요');
      setIsFineTuneCreateLoading(false);
    }
  };

  const onRemoveFineTuneModel = async (fineTuneModel: string) => {
    try {
      const result = await Swal.fire({
        text: '정말 삭제하시겠습니까?',
        showCancelButton: true,
        confirmButtonText: '네',
        cancelButtonText: '아니오',
      });

      if (!result.isConfirmed) {
        return;
      }

      setRemovingModel((prevList) => [...prevList, fineTuneModel]);

      const formData = new FormData();
      formData.append('fineTuneModel', fineTuneModel);

      const response = await axios({
        method: 'DELETE',
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/delete-fine-tune`,
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      await Swal.fire({
        text: '삭제 성공',
        confirmButtonText: '확인',
      });

      setRemovingModel((prevList) => prevList.filter((model) => model !== fineTuneModel));

      await mutate(FETCH_API_URL);
    } catch (err) {
      console.log(err);
      alert('에러. 다시 시도해 주세요');
      setRemovingModel((prevList) => prevList.filter((model) => model !== fineTuneModel));
    }
  };

  if (isLoading) {
    return <div className="mt-4">모델 목록을 가져오고 있습니다...</div>;
  }

  if (error) {
    return <div className="mt-4">에러. 다시 시도해 주세요.</div>;
  }

  if (!data.success) {
    return (
      <div className="mt-4">
        <p>모델 목록을 가져오는 것에 실패하였습니다. 다시 시도해 주세요</p>
        <small>{data.message}</small>
      </div>
    );
  }

  if (!data.data.length) {
    return (
      <div className="mt-4">
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th></th>
                <th>모델명</th>
                <th>상태</th>
                <th>생성일</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={5} className="text-center">
                  데이터가 없습니다.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mt-4">
        <button
          className="btn btn-success text-white mb-2"
          onClick={() => {
            setModalOpen(true);
          }}
        >
          생성하기
        </button>

        <div className="overflow-x-auto">
          <table className="table table-sm">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>모델명</th>
                <th>상태</th>
                <th>생성일</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.data.map((model: ResponseFineTuneModel, idx: number) => {
                return (
                  <tr key={model.id}>
                    <th>{idx + 1}</th>
                    <td>{model.fine_tuned_model}</td>
                    <td>{model.status}</td>
                    <td>{dayjs.unix(model.updated_at as number).format('YYYY-MM-DD HH:mm:ss')}</td>
                    <td>
                      <button
                        className="btn btn-primary mr-2"
                        disabled={model.status !== 'succeeded'}
                      >
                        활용
                      </button>
                      <button
                        className="btn btn-error"
                        disabled={
                          model.status !== 'succeeded' ||
                          removingModel.includes(model.fine_tuned_model ?? '')
                        }
                        onClick={() => {
                          onRemoveFineTuneModel(model.fine_tuned_model ?? '');
                        }}
                      >
                        삭제
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/*  modal  */}
      {modalOpen && (
        <div id="create_fine_tune_modal" className="modal modal-open">
          <form method="dialog" className="modal-box" onSubmit={onCreateFineTune}>
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => {
                setModalOpen(false);
                setFileValue(null);
                setModelName('');
              }}
            >
              ✕
            </button>
            <h3 className="font-bold text-lg">Fine Tune 생성하기</h3>
            <p className="py-4">*파인 튜닝할 텍스트 파일만 올려주세요</p>
            <FileInput
              value={fileValue}
              onChange={setFileValue}
              placeholder="클릭하세요"
              withAsterisk
              icon={<IconUpload size={rem(14)} />}
            />

            <div className="mt-4">
              <label htmlFor="model_name">모델명(영어)</label>
              <br />
              <input
                id="model_name"
                type="text"
                placeholder="원하는 모델명을 입력해 주세요"
                className="input input-bordered w-full max-w-lg"
                value={modelName}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setModelName(e.target.value);
                }}
              />
            </div>

            <button type="submit" className="mt-4 btn">
              모델 생성하기
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default FineTuneModelList;
