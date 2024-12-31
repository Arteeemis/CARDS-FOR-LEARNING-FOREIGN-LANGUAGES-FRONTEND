/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface CardAdd {
  /**
   * Название
   * @minLength 1
   * @maxLength 100
   */
  name: string;
  /**
   * Перевод
   * @minLength 1
   * @maxLength 500
   */
  description: string;
  /**
   * Word language
   * @minLength 1
   */
  word_language: string;
  /**
   * Translate
   * @minLength 1
   */
  translate: string;
  /** Level */
  level: "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
  /**
   * Фото
   * @format uri
   */
  image?: string | null;
}

export interface Card {
  /** ID */
  id?: number;
  /** Image */
  image?: string;
  /**
   * Название
   * @minLength 1
   * @maxLength 100
   */
  name: string;
  /**
   * Перевод
   * @minLength 1
   * @maxLength 500
   */
  description: string;
  /** Статус */
  status?: 1 | 2;
  /**
   * Word language
   * @minLength 1
   */
  word_language: string;
  /**
   * Translate
   * @minLength 1
   */
  translate: string;
  /** Level */
  level: "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
}

export interface Collection {
  /** ID */
  id?: number;
  /** Owner */
  owner?: string;
  /** Moderator */
  moderator?: string;
  /** Cards */
  cards?: string;
  /** Статус */
  status?: 1 | 2 | 3 | 4 | 5;
  /**
   * Дата создания
   * @format date-time
   */
  date_created?: string | null;
  /**
   * Дата формирования
   * @format date-time
   */
  date_formation?: string | null;
  /**
   * Дата завершения
   * @format date-time
   */
  date_complete?: string | null;
  /**
   * Название
   * @minLength 1
   * @maxLength 100
   */
  name: string;
  /**
   * Study time
   * @min -2147483648
   * @max 2147483647
   */
  study_time?: number | null;
}

export interface UpdateCollectionStatusAdmin {
  /** Status */
  status: number;
}

export interface UserLogin {
  /**
   * Username
   * @minLength 1
   */
  username: string;
  /**
   * Password
   * @minLength 1
   */
  password: string;
}

export interface UserRegister {
  /** ID */
  id?: number;
  /**
   * Адрес электронной почты
   * @format email
   * @maxLength 254
   */
  email?: string;
  /**
   * Пароль
   * @minLength 1
   * @maxLength 128
   */
  password: string;
  /**
   * Имя пользователя
   * Обязательное поле. Не более 150 символов. Только буквы, цифры и символы @/./+/-/_.
   * @minLength 1
   * @maxLength 150
   * @pattern ^[\w.@+-]+$
   */
  username: string;
}

export interface UserProfile {
  /**
   * Username
   * @minLength 1
   */
  username?: string;
  /**
   * Email
   * @minLength 1
   */
  email?: string;
  /**
   * Password
   * @minLength 1
   */
  password?: string;
}

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "http://localhost:8000/api" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== "string") {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title Snippets API
 * @version v1
 * @license BSD License
 * @termsOfService https://www.google.com/policies/terms/
 * @baseUrl http://localhost:8000/api
 * @contact <contact@snippets.local>
 *
 * Test description
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  cards = {
    /**
     * No description
     *
     * @tags cards
     * @name CardsList
     * @request GET:/cards/
     * @secure
     */
    cardsList: (
      query?: {
        card_name?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/cards/`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags cards
     * @name CardsCreateCreate
     * @request POST:/cards/create/
     * @secure
     */
    cardsCreateCreate: (
      data: {
        /**
         * @minLength 1
         * @maxLength 100
         */
        name: string;
        /**
         * @minLength 1
         * @maxLength 500
         */
        description: string;
        /** @minLength 1 */
        word_language: string;
        /** @minLength 1 */
        translate: string;
        level: "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
        /** @format binary */
        image?: File | null;
      },
      params: RequestParams = {},
    ) =>
      this.request<CardAdd, any>({
        path: `/cards/create/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags cards
     * @name CardsRead
     * @request GET:/cards/{card_id}/
     * @secure
     */
    cardsRead: (cardId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/cards/${cardId}/`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags cards
     * @name CardsAddToCollectionCreate
     * @request POST:/cards/{card_id}/add_to_collection/
     * @secure
     */
    cardsAddToCollectionCreate: (cardId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/cards/${cardId}/add_to_collection/`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags cards
     * @name CardsDeleteDelete
     * @request DELETE:/cards/{card_id}/delete/
     * @secure
     */
    cardsDeleteDelete: (cardId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/cards/${cardId}/delete/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags cards
     * @name CardsUpdateUpdate
     * @request PUT:/cards/{card_id}/update/
     * @secure
     */
    cardsUpdateUpdate: (cardId: string, data: Card, params: RequestParams = {}) =>
      this.request<Card, any>({
        path: `/cards/${cardId}/update/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags cards
     * @name CardsUpdateImageCreate
     * @request POST:/cards/{card_id}/update_image/
     * @secure
     */
    cardsUpdateImageCreate: (
      cardId: string,
      data: {
        /** @format binary */
        image?: File;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/cards/${cardId}/update_image/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        ...params,
      }),
  };
  collections = {
    /**
     * No description
     *
     * @tags collections
     * @name CollectionsList
     * @request GET:/collections/
     * @secure
     */
    collectionsList: (
      query?: {
        status?: number;
        date_formation_start?: string;
        date_formation_end?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/collections/`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags collections
     * @name CollectionsRead
     * @request GET:/collections/{collection_id}/
     * @secure
     */
    collectionsRead: (collectionId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/collections/${collectionId}/`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags collections
     * @name CollectionsDeleteDelete
     * @request DELETE:/collections/{collection_id}/delete/
     * @secure
     */
    collectionsDeleteDelete: (collectionId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/collections/${collectionId}/delete/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags collections
     * @name CollectionsDeleteCardDelete
     * @request DELETE:/collections/{collection_id}/delete_card/{card_id}/
     * @secure
     */
    collectionsDeleteCardDelete: (collectionId: string, cardId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/collections/${collectionId}/delete_card/${cardId}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags collections
     * @name CollectionsUpdateUpdate
     * @request PUT:/collections/{collection_id}/update/
     * @secure
     */
    collectionsUpdateUpdate: (collectionId: string, data: Collection, params: RequestParams = {}) =>
      this.request<Collection, any>({
        path: `/collections/${collectionId}/update/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags collections
     * @name CollectionsUpdateCardUpdate
     * @request PUT:/collections/{collection_id}/update_card/{card_id}/
     * @secure
     */
    collectionsUpdateCardUpdate: (collectionId: string, cardId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/collections/${collectionId}/update_card/${cardId}/`,
        method: "PUT",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags collections
     * @name CollectionsUpdateStatusAdminUpdate
     * @request PUT:/collections/{collection_id}/update_status_admin/
     * @secure
     */
    collectionsUpdateStatusAdminUpdate: (
      collectionId: string,
      data: UpdateCollectionStatusAdmin,
      params: RequestParams = {},
    ) =>
      this.request<UpdateCollectionStatusAdmin, any>({
        path: `/collections/${collectionId}/update_status_admin/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags collections
     * @name CollectionsUpdateStatusUserUpdate
     * @request PUT:/collections/{collection_id}/update_status_user/
     * @secure
     */
    collectionsUpdateStatusUserUpdate: (collectionId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/collections/${collectionId}/update_status_user/`,
        method: "PUT",
        secure: true,
        ...params,
      }),
  };
  users = {
    /**
     * No description
     *
     * @tags users
     * @name UsersLoginCreate
     * @request POST:/users/login/
     * @secure
     */
    usersLoginCreate: (data: UserLogin, params: RequestParams = {}) =>
      this.request<UserLogin, any>({
        path: `/users/login/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UsersLogoutCreate
     * @request POST:/users/logout/
     * @secure
     */
    usersLogoutCreate: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/users/logout/`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UsersRegisterCreate
     * @request POST:/users/register/
     * @secure
     */
    usersRegisterCreate: (data: UserRegister, params: RequestParams = {}) =>
      this.request<UserRegister, any>({
        path: `/users/register/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UsersUpdateUpdate
     * @request PUT:/users/{user_id}/update/
     * @secure
     */
    usersUpdateUpdate: (userId: string, data: UserProfile, params: RequestParams = {}) =>
      this.request<UserProfile, any>({
        path: `/users/${userId}/update/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
}
