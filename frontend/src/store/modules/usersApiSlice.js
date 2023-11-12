import { USERS_URL } from '../../constants'; // 環境変数の読み込み /api/users
import { apiSlice } from './apiSlice';

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: 'POST',
        body: data,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useLoginMutation } = usersApiSlice;