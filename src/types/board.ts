export interface BoardResultDTO {
    id: number;
    title: string;
    content: string;
    regId: string;
    regDt: string;
    upId?: string;
    upDt?: string;
    recmmCnt?: number;
}