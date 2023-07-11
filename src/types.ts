import { Collector } from './helpers/collector';

export type TConfig = {
  [type in StorageType]: {
    /** Пред обработка значения */
    process?: (value: any) => any;
    /** Обернуть результат кавычками */
    quote?: boolean;
  };
};

// prettier-ignore
export type ToStorage = {
  /** Уникальный ключ модели */
  table: { name: string, pk: string }, 
  params: { [k: string]: [
    /** Передаваемые данные */  
    data: any,
    /** Тип */
    type: StorageType, 
    /** Не используется только в обновлении */
    updated?: boolean,
  ]},
  collector?: Collector,
};

export type StorageType = 'string' | 'number' | 'json' | 'raw' | 'array' | 'boolean' | 'date' | 'null';

// prettier-ignore
export type Upsert2Params = {
  /** Уникальный ключ модели */
  table: { name: string, pk: string }, 
  params: { [k: string]: any },
  columns: {
    [key in string]: [
      type: StorageType, 
      /** Не используется только в обновлении */
      updated?: boolean,
    ]
  },
  collector?: Collector
};

export type TDeleteSoftOptions = { withUpdate?: boolean; upsert?: boolean };
