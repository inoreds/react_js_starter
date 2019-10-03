import React, {Component} from 'react';
import StandardCRUD from "../../../components/StandardCRUD" //component that used for standard crud from

import data_field from './_field'; // fields form


class User extends Component {
  constructor(props) {
    super(props);

    this.options = {
      sortIndicator: true,
      hideSizePerPage: true,
      paginationSize: 6,
      hidePageListOnlyOnePage: true,
      clearSearch: true,
      alwaysShowAllBtns: false,
      withFirstAndLast: false
    }
    this.state = {
      reload:false,
      loading: false,
      id_pk_column: 'id',
      url: { url_get_data : '/user', url_save_data: '/user', url_update_data: '/user',  // definition url endpoint of crud that will be used
             url_delete_data: '/user', url_get_data_per: '/user' },
      title: 'Master User', // title list
      title_add : 'Add Data Master User', //title form add
      fields: data_field.data, //this field used for data input (save & delete)
      columns: [ // this for data table, definition column you want to show
        { header: 'Nama', id: 'nama_lengkap', accessor: 'nama_lengkap', child_accessor: null, className: 'text-center'},
        { header: 'Username', id: 'username', accessor: 'username', child_accessor: null, className: 'text-center'},
        { header: 'Role', id: 'role', accessor: 'role', child_accessor: null, className: 'text-center'},
        { header: 'Status', id: 'status', accessor: 'status', child_accessor: null, className: 'text-center',
        Cell: row => { // you can definition custom colum like this, css and etc. row is accessor. accessor is name object of column
            // if (row == )
            return <span className={(row === 'AKTIF') ? 'badge badge-light' : 'badge badge-dark'}>{row}</span>
            }
        },
    ],
    }
  }

  render() {
    return (
      <StandardCRUD 
            columns={this.state.columns} 
            url={this.state.url} 
            title={this.state.title} 
            title_add={this.state.title_add} 
            fields={this.state.fields} 
            id_pk={null} 
            add_form={true}
            id_pk_column={this.state.id_pk_column}
      />
    );
  }
}

export default User;
