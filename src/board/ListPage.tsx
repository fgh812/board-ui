import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBoardList } from '../api/board';
import type { BoardResultDTO } from '../types/board';

function formatDate(dateTimeString: string) {
    const date = new Date(dateTimeString);
    return date.toISOString().split('T')[0];
}

export default function ListPage() {
    const [list, setList] = useState<BoardResultDTO[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        getBoardList().then(res => setList(res.data.boardResultDTOList));
    }, []);

    return (
        <div className="min-h-screen bg-blue-50 text-gray-900 p-8">
            <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-6 border border-blue-200">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-blue-700 mb-4">자유게시판</h2>
                    <div className="flex justify-end">
                        <button
                            onClick={() => navigate('/create')}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            글 작성
                        </button>
                    </div>
                </div>
                <table className="w-full text-sm border border-blue-200 shadow-sm">
                    <thead className="bg-blue-100 text-blue-800">
                    <tr>
                        <th className="border-b border-blue-200 p-3 text-center">ID</th>
                        <th className="border-b border-blue-200 p-3 text-center">제목</th>
                        <th className="border-b border-blue-200 p-3 text-center">작성자</th>
                        <th className="border-b border-blue-200 p-3 text-center">작성일</th>
                        <th className="border-b border-blue-200 p-3 text-center">추천수</th>
                    </tr>
                    </thead>
                    <tbody>
                    {list.map(item => (
                        <tr
                            key={item.id}
                            className="hover:bg-blue-100 transition-colors"
                        >
                            <td className="border-b border-blue-100 p-3 text-center">{item.id}</td>
                            <td className="border-b border-blue-100 p-3">
                              <span
                                  onClick={() => navigate(`/detail/${item.id}`)}
                                  className="text-blue-600 hover: cursor-pointer font-medium"
                              >
                                {item.title}
                              </span>
                            </td>
                            <td className="border-b border-blue-100 p-3 text-center">{item.regId}</td>
                            <td className="border-b border-blue-100 p-3 text-center">{formatDate(item.regDt)}</td>
                            <td className="border-b border-blue-100 p-3 text-center">{item.recmmCnt ?? 0}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}