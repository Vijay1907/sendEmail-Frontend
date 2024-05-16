
export const loggedIn = false

export const loggedInUser = {
    name: "Rakesh Kumar",
    email: "rakesh@gmail.com",
    password: "rakesh@123"
}

export const companyDetails={
    name:"Company"
}


export const routes = {
    home: "/",
    clients: "/clients",
    profile: "/profile",
    signIn: "/signin",
}



export const profile = {
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    name: "Profile Image"
}

export const navLink = [
    {
        name: "Dashboard",
        to: "/",
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-layout-dashboard" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"> <path stroke="none" d="M0 0h24v24H0z" fill="none" /> <path d="M4 4h6v8h-6z" /> <path d="M4 16h6v4h-6z" /> <path d="M14 12h6v8h-6z" /> <path d="M14 4h6v4h-6z" /> </svg>
    },
    {
        name: "Clients",
        to: "/clients",
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-people-fill" viewBox="0 0 16 16">
        <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path>
        <path fillRule="evenodd" d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z"></path>
        <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"></path>
      </svg>
    },
    {
        name: "Profile",
        to: "/profile",
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-check-fill" viewBox="0 0 16 16">
        <path fillRule="evenodd" d="M15.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L12.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z"></path>
        <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path>
      </svg>
    },

];

export const theme = {
    main_color1: {
        backgroundColor: "rgb(159,27,50)",
        color: "white"
    },
    main_color2: {
        backgroundColor: "white",
        color: "rgb(159,27,50)"
    },
    black_cream: "rgb(238,238,238)",
    brown_cream: "rgb(253,241,241)"
}



export const dashboardCards = [
    {
        name: "Total Clients",
        count: 0,
        bcolor: "bg-red-500",
    },
    {
        name: "Total Users",
        count: 121,
        bcolor: "bg-green-500",
    },
    // {
    //     name: "Total Products",
    //     count: 5,
    //     bcolor: "bg-blue-500"
    // },

]


export const dashboardTable = [
    {
        name: "Vijay Raj",
        email: "vijay@gmail.com",
        phone: "9999999999",
        status: "Pending",
        address:"f-24, shiv durga vihar, lakkarpur, faridabad, haryana, 121009, india, f-24, shiv durga vihar, lakkarpur, faridabad, haryana, 121009, india",
        nickName: "vijjju bahi"
    },
    {
        name: "Priya Rawat",
        email: "priya@gmail.com",
        phone: "888888888",
        status: "Completed",
    },
    {
        name: "Muskaan Kumari",
        email: "muskaan@gmail.com",
        phone: "7777777777",
        status: "Pending",
    },
    {
        name: "Kamini Kumari",
        email: "kamini@gmail.com",
        phone: "09090909090",
        status: "Cancel",
    },
    {
        name: "Kamini Kumari",
        email: "kamini@gmail.com",
        phone: "8678678678678",
        status: "Cancel",
    },

]


export const users = [
    {
        name: "Vijay Raj",
        email: "vijay@gmail.com",
        phone: "9999999999",
        active: true,
    },
    {
        name: "Priya Rawat",
        email: "priya@gmail.com",
        phone: "888888888",
        active: true,
    },
    {
        name: "Muskaan Kumari",
        email: "muskaan@gmail.com",
        phone: "7777777777",
        active: true,
    },
    {
        name: "Kamini Kumari",
        email: "kamini@gmail.com",
        phone: "09090909090",
        active: true,
    },
    {
        name: "Kamini Kumari",
        email: "kamini@gmail.com",
        phone: "8678678678678",
        active: true,
    },

]




