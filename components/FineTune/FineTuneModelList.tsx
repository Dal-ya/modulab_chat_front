import axios from 'axios';
import useSWR from 'swr';
import dayjs from 'dayjs';
import { ResponseFineTuneModel } from '../../lib/type';
const utc = require('dayjs/plugin/utc');
dayjs.extend(utc);

const fetcher = (url: string) => axios.get(url).then((res) => res.data);
const API_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/list-fine-tune`;

const FineTuneModelList = () => {
  const { isLoading, data, error } = useSWR(API_URL, fetcher);

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
        <button className="btn btn-success text-white mb-2">생성하기</button>
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
                  <tr>
                    <th>{idx + 1}</th>
                    <td>{model.fine_tuned_model}</td>
                    <td>{model.status}</td>
                    <td>{dayjs.unix(model.created_at as number).format('YYYY-MM-DD HH:mm:ss')}</td>
                    <td>
                      <button className="btn btn-primary mr-2" disabled={}>
                        활용
                      </button>
                      <button className="btn btn-error">삭제</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FineTuneModelList;
