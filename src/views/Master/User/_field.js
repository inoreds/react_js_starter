export default {
    data : [
        {
            id:'data_user', type:'info', label:'Master User', hidden: 'no',
            child: [
                {id:'id', content_text: 'text', type:'text', label:'Id', hidden: 'yes'}, // this example textbox
                {id:'nama_lengkap', content_text: 'text', type:'text', label:'Nama Lengkap', hidden: 'no'}, // this example textbox
                {id:'username', content_text: 'text', type:'text', label:'Username', hidden: 'no'}, // this example textbox
                {id:'password', content_text: 'text', type:'password', label:'Password', hidden: 'no', on_change : false}, // this example pasword
                { // this example for combobox box static value
                    id:'status', content_text: 'text', 
                    type:'combobox_static', 
                    label:'Status', 
                    hidden: 'no', 
                    property:['Aktif', 'Non-Aktif'], 
                    value:['AKTIF', 'NON-AKTIF']
                },
                {// this example for radio button with static value
                    id:'role', 
                    content_text: 'text', 
                    type:'select_box_static', 
                    label:'Role', 
                    hidden: 'no', 
                    property:['Admin', 'User'], 
                    value:['admin', 'user']
                },
                // { // this example for combobox with data that you must pull first
                //     id:'role_id', 
                //     content_text: 'text', 
                //     type:'select_box', 
                //     label:'Role', 
                //     hidden: 'no', 
                //     url : '/roles?search=0', 
                //     value_id : 'id', 
                //     value_name : 'name'
                // },
               

 
            ]
        }
    ]
}