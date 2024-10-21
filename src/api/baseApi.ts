import axios, { AxiosRequestConfig } from 'axios';
import { BadRequestError } from '../utils/ApiError';
import { StatusCodes } from 'http-status-codes';

class BaseApi {
  baseUrl: string;

  constructor(url: string) {
    this.baseUrl = url;
  }

  fetch = async (
    url: string,
    body?: any,
    args?: Record<string, any>,
    requestInit?: AxiosRequestConfig
  ) => {
    try {
      const urlObj = new URL(url, this.baseUrl);
      if (args) {
        urlObj.search = new URLSearchParams(args).toString();
      }

      const requestOptions: AxiosRequestConfig = {
        ...requestInit,
        data: body,
        url: urlObj.toString(),
      };

      const response = await axios(requestOptions);

      if (response.status === StatusCodes.NO_CONTENT) {
        return;
      }

      return response.data;
    } catch (e: any) {
      throw new BadRequestError(e.message);
    }
  };

  get = <T>(
    url: string,
    args?: Record<string, any>,
    requestInit?: AxiosRequestConfig
  ): Promise<T> => {
    return this.fetch(url, undefined, args, {
      ...requestInit,
      method: 'GET',
    }) as Promise<T>;
  };

  POST = <T>(
    url: string,
    body?: Record<string, any>,
    args?: Record<string, any>,
    requestInit?: AxiosRequestConfig
  ): Promise<T> => {
    return this.fetch(url, body, args, {
      ...requestInit,
      method: 'POST',
    }) as Promise<T>;
  };

  PUT = <T>(
    url: string,
    body?: Record<string, any>,
    args?: Record<string, any>,
    requestInit?: AxiosRequestConfig
  ): Promise<T> => {
    return this.fetch(url, body, args, {
      ...requestInit,
      method: 'PUT',
    }) as Promise<T>;
  };

  DELETE = <T>(
    url: string,
    args?: Record<string, any>,
    requestInit?: AxiosRequestConfig
  ): Promise<T> => {
    return this.fetch(url, undefined, args, {
      ...requestInit,
      method: 'DELETE',
    }) as Promise<T>;
  };

  PATCH = <T>(
    url: string,
    body?: Record<string, any>,
    args?: Record<string, any>,
    requestInit?: AxiosRequestConfig
  ): Promise<T> => {
    return this.fetch(url, body, args, {
      ...requestInit,
      method: 'PATCH',
    }) as Promise<T>;
  };
}

export default BaseApi;
