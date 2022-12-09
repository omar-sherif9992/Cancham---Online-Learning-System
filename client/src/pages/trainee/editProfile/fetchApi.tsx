import { useQuery } from '@tanstack/react-query';

import { TraineeRoutes } from '@/services/axios/dataServices/TraineeDataService';

import { getRequest } from '@/services/axios/http-verbs';

const traineeId = '637969352c3f71696ca34759';

async function searchRequest() {
  const trainee = TraineeRoutes.GET.getTrainee;
  trainee.URL = `/trainee/${traineeId}`;
  return getRequest(trainee);
}

export default function useSearchQuery() {
  return {
    ...useQuery(['search-trainee', traineeId], () => searchRequest())
  };
}