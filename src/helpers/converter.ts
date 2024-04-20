import { TConfig as TConverterConfig } from '../types';

const configs: TConverterConfig = {
  number: {},
  boolean: {},
  raw: {},
  null: {
    process: (_) => null,
  },
  array: {
    process: (value) => (value.length > 0 ? `{"${value.join(`", "`)}"}` : '{}'),
    quote: true,
  },
  string: {
    quote: true,
  },
  json: {
    process: (value) => value,
    quote: true,
  },
  date: {
    process: (value) => value?.toISOString(),
    quote: true,
  },
};

export const converter = (type: keyof TConverterConfig) => {
  const config = configs[type];
  if (!config) throw new Error(`Настройки для указанного типа '${type}' не найдены`);
  const { process, ...rest } = config;
  return {
    process: (value: any): any => {
      return process ? process(value) : value;
    },
    ...rest,
  };
};
