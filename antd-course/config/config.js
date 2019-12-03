export default {
    singular: true,//在 umi 中，约定的存放页面代码的文件夹是 pages，是复数，如果使用单数的话你配置项中你可以添加 singular 为 true 来让 page 变为约定的文件夹
    plugins: [
        ['umi-plugin-react', {
            antd: true,
            dva: true,//Model 是前端分层中的腰部力量，承上启下，负责管理数据（状态）。业界主流的状态管理类库有 redux、mobx，等
        }],
    ],
    routes: [{//routes是一个数组，数组中每一个对象是一个路由信息
        path: '/',//path表示页面访问路径（相对）
        component: '../layout',//component表示page下的文件名
        routes: [
            {
                path: 'puzzlecards',
                component: './puzzlecards'
            },
            {
                path: '/',
                component: 'Helloworld',
            },
            {
                path: '/helloworld',
                component: 'Helloworld'
            },
            {
                path: '/dashboard',
                routes: [
                    { path: '/dashboard/analysis', component: 'Dashboard/Analysis' },
                    { path: '/dashboard/monitor', component: 'Dashboard/Monitor' },
                    { path: '/dashboard/workplace', component: 'Dashboard/Workplace' }
                ]
            },
        ]
    }],
    proxy: {//去往本地服务器 localhost:8000 的 ajax 调用中，如果是以 /dev 开头的，那么就转发到远端的目标服务器当中，/dev 也会保留在转发地址中。
        '/dev': {
            target: 'https://08ad1pao69.execute-api.us-east-1.amazonaws.com',
            changeOrigin: true,
            },
        },
    /*一种常见的规避跨域的方法就是：
    把 ajax 请求发送到你的本地开发服务器，然后本地开发服务器再把 ajax 请求转发到远端去
    从网络拓扑上看本地开发服务器起着「反向代理」的作用,本地服务器和远端服务器是「服务器和服务器间的通信」，就不存在跨域问题了。*/
}