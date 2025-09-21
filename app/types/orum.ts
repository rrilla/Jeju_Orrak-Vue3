export type Season = '봄' | '여름' | '가을' | '겨울';

export interface OrumEntrance {
  /** 표시용 메인 텍스트(첫 항목) */
  main: string;
  /** 지도 검색용, 괄호/부가정보 제거한 순수 주소 */
  address: string;
}

export interface OrumDurationOneWay {
  /** 정상까지 편도 소요시간(분). 없으면 undefined */
  summit?: number;
  /** 코스(둘레/순환) 편도 소요시간(분). 없으면 undefined */
  course?: number;
}

export interface OrumParking {
  /** 주차 가능 여부 */
  has_parking: boolean;
  /** 원문을 '-' 기준으로 나눈 리스트 */
  parking: string[];
}

export interface OrumUsageAndFees {
  /** 입장료 존재 여부 */
  has_admission_fee: boolean;
  /** 이용시간/입장료 원문을 '-' 기준으로 나눈 리스트 */
  hours_and_fees: string[];
}

export interface Orum {
  /** 오름명 */
  name: string;
  /** 설명 */
  description: string;

  /** 입구 정보(메인/주소) */
  entrance: OrumEntrance;

  /** 편도 기준 분단위 소요시간 (정상/코스 중 있는 값만) */
  duration_minutes_one_way: OrumDurationOneWay;

  /** 난이도(자유 텍스트: "상/중/하" 등) */
  difficulty: string;

  /** 추천 시기 (봄/여름/가을/겨울 중 복수) */
  seasons: Season[];

  /** 주차 정보 */
  parking: OrumParking;

  /** 이용시간과 입장료 */
  usage_and_fees: OrumUsageAndFees;

  /** 명칭 유래: '-' 분리 리스트 */
  name_origin: string[];

  /** 주요 특징: '-' 분리 리스트 */
  features: string[];

  /** 주의사항: '-' 분리 리스트 */
  cautions: string[];

  /** 추천사항: '-' 분리 리스트 */
  tips: string[];

  /** 특이사항: '-' 분리 리스트 */
  notes: string[];
}

/** JSON 루트 타입 */
export type OrumDataset = Orum[];
