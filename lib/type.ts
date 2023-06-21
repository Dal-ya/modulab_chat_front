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
  status?: 'succeeded' | 'pending' | string;
  created_at?: number;
  updated_at?: number;
}

export interface LoginForm {
  email: string;
  password: string;
}

export interface SignUpForm {
  name: string;
  email: string;
  password: string;
  secret: string;
}

export interface Chat {
  id: string;
  botMsg: string;
  userMsg: string;
}
