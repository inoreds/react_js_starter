

export default {
    items: [
      {
        name: 'Dashboard',
        url: '/dashboard',
        icon: 'fa fa-chart-line',
        children_type: 'normal',
        children: [
            {
                name : 'dashboard 1',
                url : '/dashboard/dashboard_1',
                icon : 'bar-chart-2'
            },
            {
                name : 'dashboard 2',
                url : '/dashboard/dashboard_2',
                icon : 'bar-chart-2'
            }
        ]
      },
      {
        name: 'Master',
        url: '/master',
        icon: 'far fa-hdd',
        children_type: 'normal',
        children: [
          {
            name: 'User',
            url: '/master/user',
            icon: 'user',
          },
        ],
      },
      {
        name: 'Main Data',
        url: '/data',
        icon: 'fa fa-save',
        children_type: 'normal',
        children: [
          {
            name: 'Main Data 1',
            url: '/data/data_1',
            icon: 'calendar',
          },
        ],
      },
      {
        name: 'Transaction',
        url: '/transaction',
        icon: 'fa fa-random',
        children_type: 'normal',
        children: [
          {
            name: 'Transaction 1',
            url: '/transaction/transaction_1',
            icon: 'calendar',
          },
        ],
      },
      {
        name: 'Report',
        url: '/report',
        icon: 'fa fa-print',
        children_type : 'd-lg-flex',
        children: [
          {
            name: 'Label 1',
            flex: [
                {
                    name: 'Report 1',
                    url: '/report/report_1',
                    icon: 'calendar',
                },
                {
                    name: 'Report 2',
                    url: '/report/report_2',
                    icon: 'calendar',
                },
            ]
          },
          {
            name: 'Label 2',
            flex: [
                {
                    name: 'Report 1',
                    url: '/report/report_1',
                    icon: 'calendar',
                },
                {
                    name: 'Report 2',
                    url: '/report/report_2',
                    icon: 'calendar',
                },
            ]
          },
        ],
      },
      {
        name: 'Setting',
        url: '/setting',
        icon: 'fa fa-cogs',

      },


    ]
  };
  