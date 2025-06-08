import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createBoard, getBoardDetail, updateBoard } from '../api/board';

export default function BoardFormPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = Boolean(id);
    const [form, setForm] = useState({ title: '', content: '', regId: '', upId: ''});

    useEffect(() => {
        if (isEdit) {
            getBoardDetail(Number(id)).then(res => {
                const d = res.data.boardResultDTO;
                setForm({ title: d.title, content: d.content, regId: d.regId, upId: d.upId });
            });
        }
    }, [id, isEdit]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isEdit && id) {
            await updateBoard({ id: Number(id), ...form});
            alert("수정 완료하였습니다.")
        } else {
            await createBoard(form);
            alert("등록 완료하였습니다.");
        }
        navigate("/");
    };

    return (
        <main className="min-h-screen bg-blue-50 text-gray-900 py-10 px-4">
            <section className="max-w-3xl mx-auto">
                <header className="mb-6 border-b pb-3 border-blue-300">
                    <h1 className="text-3xl font-bold text-blue-700">{isEdit ? '게시글 수정' : '게시글 작성'}</h1>
                </header>

                <form onSubmit={handleSubmit} className="bg-white rounded shadow border border-blue-100 p-6 space-y-6">
                    <div>
                        <label className="block font-semibold mb-1 text-left">제목</label>
                        <input
                            type="text"
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            className="w-full p-2 border rounded border-gray-300"
                            required
                        />
                    </div>

                    <div>
                        <label className="block font-semibold mb-1 text-left">내용</label>
                        <textarea
                            name="content"
                            value={form.content}
                            onChange={handleChange}
                            className="w-full p-2 border rounded border-gray-300"
                            rows={8}
                            required
                        />
                    </div>

                    <div>
                        <label className="block font-semibold mb-1 text-left">작성자</label>
                        <input
                            type="text"
                            name="regId"
                            value={form.regId}
                            onChange={handleChange}
                            className="w-full p-2 border rounded border-gray-300"
                            required={!isEdit}
                            disabled={isEdit}
                        />
                    </div>

                    {isEdit && (
                        <div>
                            <label className="block font-semibold mb-1 text-left">수정자</label>
                            <input
                                type="text"
                                name="upId"
                                value={form.upId}
                                onChange={handleChange}
                                className="w-full p-2 border rounded border-gray-300"
                                required
                            />
                        </div>
                    )}

                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-800"
                        >
                            취소
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 text-white"
                        >
                            저장
                        </button>
                    </div>
                </form>
            </section>
        </main>
    );
}
