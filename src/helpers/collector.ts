import { StorageType } from "../types";

export interface Collector {
  /** Добавляет значение в параметры и возвращает порядковый номер в формате $1 */
  param(value: any, wrapQuote?: boolean, type?: StorageType): string;
  /** Возвращает все зарегистрированные параметры */
  getParams(): any[];
}

/**
 * Собирает параметры и выдает их код в формате $1
 */
export class ParamsCollector implements Collector {
  private params: any[] = [];

  param(value: any, wrapQuote: false): string {
    const length = this.params.push(value);
    return `$${length}`;
  }

  getParams(): any[] {
    return this.params;
  }
}

/** Используется как заглушка, когда не передан коллектор, чтобы не менять интерфейс */
export class ParamsEmptyCollector implements Collector {
  param(value: any, wrapQuote: false, type: StorageType): string {
    if (value === null || value === undefined) return "null";
    let result = value;
    if (type === "json") {
      result = JSON.stringify(result);
    }
    return wrapQuote ? `'${result}'` : result;
  }

  getParams(): any[] {
    return [];
  }
}