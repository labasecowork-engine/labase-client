import { axiosInstance } from '@/interceptors';
import type { Response } from '@/types/services';
import type { CreateCategoryApiPayload, CreateCategoryResponse } from '../types';

export const createCategoryRequest = async (
  payload: CreateCategoryApiPayload
): Promise<CreateCategoryResponse> => {
  const { data } = await axiosInstance.post<Response<CreateCategoryResponse>>(
    '/articles/categories',
    payload
  );

  if (!data.data) {
    throw new Error(
      'Error al crear la categoría, el servidor no contiene los datos de la categoría creada.'
    );
  }
  return data.data;
};
