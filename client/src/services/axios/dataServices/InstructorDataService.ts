export const InstructorRoutes = {
  GET: {
    getCourses: {
      URL: '/courses/instructor',
      params: '',
      query: '',
      payload: {},
      response:{}
    },
    getInstructor: {
      URL: '/instructor',
      params: '',
      query: '',
      payload: {}
    },
    getReviews: {
      URL: '/instructor/rating',
      params: '',
      query: '',
      payload: {}
    },
    getUserReview:
    {
      URL : '',
      params : '',
      query : '',
      payload : {}

    },
    getTopInstructors: {
      URL: '/instructor/top-rated' as const,
      params: '',
      query: 'limit=3',
      payload: {}
    },
    getMonthlyEarnings: {
      URL: '',
      params: '',
      query: '',
      payload: {}
    }
  },
  POST: {
    addDiscount: {
      URL: '',
      params: '',
      query: '',
      payload: {
        startDate: '',
        endDate: '',
        percentage: 0
      }
    },
    changePassword: {
      URL: '/change-password' as const,
      params: '',
      query: '',
      payload: {}
    },
    savePayment: {
      URL: '',
      params: '',
      query: '',
      payload: {}
    },
    userAddReview : {
      URL : '/instructor/rating/',
      params:'',
      query : '',
      payload:{}
    }

  },
  PATCH : {
    userUpdateReview:{
      URL : '/instructor/rating/',
      params:'',
      query:'',
      payload:{}
    }
  },
  DELETE : {
    userDeleteReview : {
      URL : '',
      params:'',
      query:'',
      payload:{}
    }
  }
};
