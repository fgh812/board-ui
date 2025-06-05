import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {getBoardDetail, deleteBoard} from '../api/board';
import type {BoardResultDTO} from '../types/board';

function formatDate(dateTimeString: string) {
    const date = new Date(dateTimeString);
    return date.toISOString().split('T')[0];
}

export default function DetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState<BoardResultDTO | null>(null);

    const loadData = () => {
        getBoardDetail(Number(id))
            .then(res => setData(res.data.boardResultDTO))
            .catch(err => {
                alert(err.response?.data?.message || '게시글을 불러오는 중 오류가 발생했습니다.')
            });
    };

    useEffect(() => {
        loadData();
    }, [id]);

    const handleDelete = async () => {
        if (!id) return;
        if (!window.confirm('정말 삭제하시겠습니까?')) return;

        try {
            await deleteBoard(Number(id));
            alert('삭제되었습니다.');
            navigate('/');
        } catch (err: any) {
            alert(err.response?.data?.message || '삭제 중 오류가 발생했습니다.');
        }
    };

    // TODO. 추천 수 증가

    return (
        <main className="min-h-screen bg-blue-50 text-gray-900 py-10 px-4">
            <section className="max-w-3xl mx-auto">
                <header className="mb-6 border-b pb-3 border-blue-300">
                    <h1 className="text-3xl font-bold text-blue-700">게시글 상세</h1>
                </header>

                {data ? (
                            <article className="bg-white rounded shadow border border-blue-100 p-6 space-y-6">
                                <div className="space-y-2 border-b pb-4">
                                    <h2 className="text-lg font-semibold border-l-4 border-blue-400 pl-2 text-left">제목</h2>
                                    <p className="text-gray-800 ml-1">{data.title}</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-700 border-b pb-4">
                                    <div className="flex items-center space-x-2">
                                        <span className="font-semibold">작성자:</span>
                                        <span>{data.regId}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <span className="font-semibold">작성일:</span>
                                        <span>{formatDate(data.regDt)}</span>
                                    </div>
                                    <div className="flex justify-end items-center space-x-2">
                                        <span className="font-semibold">추천수:</span>
                                        <span>-</span>
                                        <button
                                            className="ml-2 px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm"
                                        >
                                            추천하기
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <h3 className="text-lg font-semibold border-l-4 border-blue-400 pl-2 text-left">내용</h3>
                                    <div
                                        className="whitespace-pre-wrap bg-gray-100 p-4 rounded border border-gray-200 text-gray-800">
                                        {data.content}
                                    </div>
                                </div>

                                <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                                    <button
                                        onClick={() => navigate(-1)}
                                        className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-800"
                                    >
                                        뒤로가기
                                    </button>
                                    <button
                                        onClick={() => navigate(`/edit/${id}`)}
                                        className="px-4 py-2 rounded bg-yellow-400 hover:bg-yellow-500 text-white"
                                    >
                                        수정
                                    </button>
                                    <button
                                        onClick={handleDelete}
                                        className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white"
                                    >
                                        삭제
                                    </button>
                                </div>
                            </article>
                        ) : (
                            <p>로딩 중...</p>
                )}


            </section>
        </main>
    );
}