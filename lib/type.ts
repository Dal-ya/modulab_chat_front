export interface PaintData {
  author: string;
  description: string;
}

export interface ResultPaintData {
  url: string;
}

export interface ResponseFineTuneModel {
  id: string;
  fine_tuned_model?: string; // 생성된 파인 튜닝 모델명
  model?: string; // base model (curie...)
  status?: 'succeeded' | string;
  created_at?: number;
  updated_at?: number;
}
