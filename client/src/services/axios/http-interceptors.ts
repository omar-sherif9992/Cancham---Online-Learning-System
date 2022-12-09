import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse
} from 'axios';

import SessionStorage from '../sessionStorage/SessionStorage';

import LocalStorage from '@services/localStorage/LocalStorage';

const APP_BASE_API_URL = import.meta.env.VITE_SERVER_BASE_API_URL;

const loginRoute = '/auth/login';

let http: AxiosInstance;

function onRequest(config: AxiosRequestConfig): AxiosRequestConfig {
  const accessToken = SessionStorage.get<string | null>('accessToken');
  console.log('accessToken');
  console.log(accessToken);

  if (accessToken) {
    const authorization = `Bearer ${accessToken}`;

    config.headers.Authorization = authorization;
  }
  return config;
}

function onRequestError(error: AxiosError): Promise<AxiosError> {
  // const { status } = error.response as AxiosResponse;
  /*
	switch (status) {
		case 401:
			LocalStorage.remove('_TOKEN');
			SessionStorage.remove('accessToken');
			window.location.replace(loginRoute);
			toast.error('Unauthorized', toastOptions);
			break;
		case 403:
			toast.error('Forbidden access', toastOptions);
			break;
		case 404:
			toast.error('Page Not Found', toastOptions);
			break;
		case 500:
			window.location.replace(loginRoute);
			toast.error('Internal Server', toastOptions);
			break;
		default:
			toast.error(error.message, toastOptions);
	} */
  return Promise.reject(error);
}

function onResponse(response: AxiosResponse): AxiosResponse {
  return response;
}

async function onResponseError(error: AxiosError): Promise<AxiosError> {
  const refreshToken = LocalStorage.get('refreshToken');
  const oldAccessToken = SessionStorage.get('accessToken');
  if (!refreshToken) {
    if (oldAccessToken) {
      return Promise.resolve(error);
    } else {
      LocalStorage.remove('refreshToken');
      SessionStorage.remove('accessToken');
      window.location.replace(loginRoute);
    }
  }
  if (
    error.response &&
    refreshToken &&
    error.response.status === 401 &&
    error.response.data
    //error.response.data?.error !== null &&
    //error.response.data?.message === 'jwt expired'
  ) {
    try {
      const prevRequest = error.config;
      if (prevRequest && !prevRequest?.sent) {
        prevRequest.sent = true;
        const res = await axios.get(`${APP_BASE_API_URL}/refresh`, {
          withCredentials: true
        });
        console.log('res');
        console.log(res.data.data);

        const { accessToken }: { accessToken: string } = res.data.data as {
          accessToken: string;
        };
        window.location.reload();
        SessionStorage.set('accessToken', accessToken);
        prevRequest.headers.Authorization = `Bearer ${accessToken}`;
        await http(prevRequest);
      } else {
        return await Promise.reject(error);
      }
    } catch (_error) {
      console.log('_error');
      console.log(_error);
      LocalStorage.remove('_TOKEN');
      LocalStorage.remove('role');
      SessionStorage.remove('accessToken');
      window.location.replace(loginRoute);

      return Promise.reject(_error);
    }
  }

  return Promise.resolve(error);
}

function setupInterceptorsTo(axiosInstance: AxiosInstance): AxiosInstance {
  http = axiosInstance;
  axiosInstance.interceptors.request.use(onRequest, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, onResponseError);

  return axiosInstance;
}
export default setupInterceptorsTo;
