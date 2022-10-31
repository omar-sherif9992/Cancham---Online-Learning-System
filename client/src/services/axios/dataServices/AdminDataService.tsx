
export const AdminRoutes = {

  POST:{
    createAdmin: {
        URL : '/admin' as const,
        params: '',
        payload : {
            email:{
                address:''
            },
            password:'',
            username:'',
            name:'',
            address:{
                city:'',
                country:''
            },
            role:'Admin' as const
        },
        response: {
            data : {},
            message:'',
            success:''
        }
    },
    createCorporateTrainee: {
        URL : '/admin/corporateTrainee' as const,
        params : '',
        payload : {
            email:{
                address:''
            },
            password:'',
            username:'',
            name:'',
            address:{
                city:'',
                country:''
            },
            role:'Trainee' as const
        },
        response:{
            data:{},
            message:'',
            success:''
        }
    },
    createInstructor: {
        URL : '/admin/instructor' as const,
        params : '',
        payload : {
            email:{
                address:''
            },
            password:'',
            username:'',
            name:'',
            address:{
                city:'',
                country:''
            },
            role:'Instructor' as const
        },
        response:{
            data:{},
            message:'',
            success:''
        }
    }

  }
};

