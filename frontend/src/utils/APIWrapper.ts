export type APIWrapperInit = {
  baseUrl: string;
  headers?: Record<string, string>;
};

export type FetchMethods = "GET" | "POST" | "PUT" | "DELETE";

export class APIWrapper {
  private baseUrl: string;
  private headers = {
    Accept: "application/json",
    "Content-Type": "application/json; charset=UTF-8",
  };

  constructor(init: APIWrapperInit) {
    this.baseUrl = init.baseUrl;
    this.headers = { ...this.headers, ...init.headers };
  }
  public async get<T>({
    url,
    method,
    payload,
  }: {
    url: string;
    method: FetchMethods;
    payload?: T;
  }) {
    return await fetch(`${this.baseUrl}${url}`, {
      method: method,
      headers: this.headers,
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .catch((err) => console.error(err));
  }

  public async getFile<T>({
    url,
    method,
    payload,
  }: {
    url: string;
    method: FetchMethods;
    payload?: T;
  }) {
    return await fetch(`${this.baseUrl}${url}`, {
      method: method,
      headers: { ...this.headers, responseType: "blob" },
      body: JSON.stringify(payload),
    })
      .then((res) => res.blob())
      .catch((err) => console.error(err));
  }
}
