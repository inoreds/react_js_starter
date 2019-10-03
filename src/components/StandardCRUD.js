import React, {Component} from 'react';
import serialize from 'form-serialize';
import { withRouter } from "react-router-dom";
import {connect} from 'remx'
import { ToastContainer, toast } from 'react-toastify';
import moment from 'moment'

import broker from "../utils/broker"
import authStore from "../stores/auth"
import dataStore from "../stores/data"
import SweetAlert from 'sweetalert-react';

class MasterViewer extends Component {
  constructor(props) {
    super(props);

    this.options = {
      sortIndicator: true,
      hideSizePerPage: true,
      paginationSize: 3,
      hidePageListOnlyOnePage: true,
      clearSearch: true,
      alwaysShowAllBtns: false,
      withFirstAndLast: false
    }
    this.state = {
        loading: false,
        save_update: 'save',
        show_view: { table: true, form: false },
        total_row_per_page: 0,
        page_index:1,
        page_size_option:15,
        page_size: 0,
        body_data_table : {search: '', start:0, length: 0},
        data_table: [],
        data_meta: {current_page: 0, from : 0, last_page: 0, per_page: 0, total: 0, to : 0},
        numbers:{},
        data_per:null,
        url: this.props.url,
        url_parrent : this.props.url_parrent,
        fields: this.props.fields,
        id_pk: this.props.id_pk,
        id_delete_edit:'',
        id_saved: '',
        phone:'',
        on_change:'',
        add_form: this.props.add_form,
        columns_number: [{ header: 'No', id: 'number_counter', accessor: 'number_counter'}],
        columns_hidden_id:
            {   header: 'Option', id : 'option_id', accessor: this.props.id_pk_column, show: false},
        columns_option:
            {   header: 'Option', id : 'option_column', accessor: 'option_column'},
        errors: {},
        select_box_data : {},
        loading_select: false,
        columns: this.props.columns,
    }
        this.getDataTable = this.getDataTable.bind(this);
        this.saveData = this.saveData.bind(this);
        this.getDataPer = this.getDataPer.bind(this);
        this.deleteData = this.deleteData.bind(this);
        this.showTableForm = this.showTableForm.bind(this)
        this.showTable = this.showTable.bind(this);
        this.cancelCourse = this.cancelCourse.bind(this);
        this.onChangeEvent = this.onChangeEvent.bind(this);
        this.onChangePhone = this.onChangePhone.bind(this);
        this.getDataList = this.getDataList.bind(this);
    }
    notify_berhasil = (text) => toast("Data " + this.props.title + " Berhasil " + text);
    getDataTable() {
        this.setState({ loading: true });
        var custom_query = (this.props.custom_query) ? this.props.custom_query + '&' : '';
        broker.fetch.get(`${this.state.url.url_get_data}?${custom_query}&page=${this.state.page_index}`).then(res => {
            const { data } = res.data;
            if (data) {
                this.setState({loading: false, 
                               data_table: data.data, 
                               data_meta: {
                                   current_page: data.current_page,
                                   from : data.from,
                                   to : data.to,
                                   last_page : data.last_page,
                                   per_page : data.per_page,
                                   total : data.total,
                               }})
            } else {
                
            }
        }).catch(err => {
            this.setState({
                loading: false,
                message: ''
            })
        }).then(()=> {
            dataStore.setters.setReloadTable(false);
        });
    }

    validateData(body){
        let return_value = true;
        let errors = {}
        this.state.fields.map((field, i) => {   
            field.child.map((child, i) => {   
                if (child.hidden === 'no'){
                    if ((body[child.id] === "" || body[child.id] === null)){
                        errors[child.id] = child.label + " Tolong Diisi";
                        return_value = false;
                    }
                }
            });
        });

        this.setState({errors : errors})

        return return_value;
    }

    saveData() {
        const form = document.querySelector('#master-viewer-form');
        
        var body = serialize(form, { hash: true, empty: true });
        
        // console.log(body)

        let validate = this.validateData(body)

        if (validate === true){
            this.setState({ loading: true });
            let url = this.props.url.url_save_data
            let notify_status = "Disimpan"
            let type = 'post';

            if (this.state.save_update === 'update') {
                url = this.props.url.url_update_data + `/${this.state.id_delete_edit}`
                notify_status = "Diupdate"
                type = 'patch';
            }
                
            
            broker.fetch[type](url, body)
            .then(res => {
                const { data } = res;
                if (data.status === true) {
                    this.notify_berhasil(notify_status);            
                    this.getDataTable();
                    this.showTable();
                } else {
                    this.setState({ loading: false });
                }
            }).catch(err => {
                this.setState({ loading: false });
            });
        }
    };

    getDataPer(id) {
        this.setState({id_delete_edit: id});
        broker.fetch.get(`${this.props.url.url_get_data_per}/${id}`)
        .then(res => {
            const { data } = res;
            if (data.status === true) {
                this.setState({data_per: data.data, save_update: 'update'})
                this.showTableForm('Form');
            } else {

            }
        }).catch(err => {
            
        });
    }
    page_index
    deleteData() {
        broker.fetch.delete(`${this.props.url.url_delete_data}/${this.state.id_delete_edit}`)
        .then(res => {
            const { data } = res;
            if (data.status === true) {
                this.notify_berhasil("Dihapus");
                this.getDataTable();
                this.showTableForm('Table');
                this.setState({modal_delete: false});
            } else {

            }
        }).catch(err => {
            this.notify_berhasil("notify_status");            
            this.getDataTable();
            this.showTable();
        });
    }

    showTableForm(view) {
        if (view === "Form") {
            this.setState({show_view: {form: true, table: false} })
        } else if (view === "Table") {
            this.setState({show_view: {form: false, table: true} })
            this.setState({data_per: null, save_update: 'save'})
        }
    }

    showTable() {
        this.showTableForm('Table');
        this.setState({data_per: null, save_update: 'save', loading: false})
        this.cancelCourse();
        this.setState({errors : {}})
    }

    componentDidMount() {
        this.setState({body_data_table : {search: '', start:0, length: this.state.page_size}}, function(){
            this.getDataTable();
            var fields = this.state.fields;
            for (var i=0; i<fields.length; i++){
                for (var j=0; j<fields[i].child.length; j++){
                    if (fields[i].child[j].type === 'select_box'){
                        this.getDataList(fields[i].child[j].url, fields[i].child[j].id);
                    }
                }
                // console.log(fields[i].child.length)
            }
        })
        if (this.props.column_option !== false) {
            // this.setState({columns: this.state.columns_number.concat(this.state.columns.concat(this.state.columns_hidden_id)).concat(this.state.columns_option) })
            this.setState({columns: this.state.columns_number.concat(this.state.columns.concat(this.state.columns_option)) })
        } else {
            this.setState({columns: this.state.columns_number.concat(this.state.columns) })
        }
       
    }

    getDataPaging(type){
        var page = 0;
        if (type === 'prev'){
            page = this.state.page_index - 1
        } else {
            page = this.state.page_index + 1
        }
        this.setState({page_index: page}, function(){
            this.getDataTable();
        })
        
    }

    getDataPageSize(index){
        this.setState({page_size_option: index}, function(){
            this.getDataTable();
        })
        
    }

    cancelCourse(){ 
        document.getElementById("master-viewer-form").reset();
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.props.reload_table !== prevProps.reload_table){
            if (this.props.reload_table === true) {
                this.getDataTable();
                this.notify_berhasil("Diupdate");
                
            }
        }
    }

    onChangeEvent(event){
        var value = event.target.value.replace(/-/g,"");
        this.setState({on_change: value})
    }

    onChangePhone(e) {
        const re = /^[0-9 ()+]+$/;
        var value = e.target.value;
        if (value === '' || re.test(value)) {
            if (value.substr(0, 1) === '0') {
                value = `+62${value.substr(1, value.length)}`;
            }
            this.setState({phone: value})
        }
    }

    onChangeNumber = (component) => (e) => {
        
        if (this.state.numbers[component] === undefined){
            this.setState({numbers:{
                [component]:''
            } })
        }
        const re = /^[0-9 ()+]+$/;
        var value = e.target.value;
        if (value === '' || re.test(value)) {
            this.setState({numbers:{
                [component]:value
            } })
        }
    }

    getDataList(url, id){
        var prev_state = this.state.select_box_data;
     
        broker.fetch.get(url).then(res => {
            const { data } = res;
            const { meta } = data;
            if (data) {
                this.setState({[id] : data.data})
            }
        }).catch(err => {
            
        });
    }

    showingData(){
        if (this.state.data_meta) {
            return (this.state.page_index === 1) ? 1 : (this.state.page_index -1) * this.state.page_size_option + 1;
        } else {
            return 0
        }
    }

    toData(){
        if (this.state.data_meta.current_page) {
            return (this.state.data_meta.current_page === this.state.data_meta.page_count)  ? 
                     this.state.data_meta.row_count : (this.state.page_index * this.state.total_row_per_page);
        } else {
            return 0
        }
    }

    ofData(){
        if (this.state.data_meta) {
            return this.state.data_meta.row_count;
        } else {
            return 0
        }  
    }


    render() {
        console.log(this.state.data_table)
        return (
        <div className="animated">
            {this.state.show_view.table === true &&
                <div className="content content-fixed">
                    <div className="container pd-x-0 pd-lg-x-10 pd-xl-x-0">
                        <div className="d-sm-flex align-items-center justify-content-between mg-b-20 mg-lg-b-25 mg-xl-b-30">
                            <div>
                                {/* <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb breadcrumb-style1 mg-b-10">
                                        <li className="breadcrumb-item"><a href="#">Master</a></li>
                                        <li className="breadcrumb-item active" aria-current="page">Data User</li>
                                    </ol>
                                </nav> */}
                                <h4 className="mg-b-0 tx-spacing--1">{this.props.title}</h4>
                            </div>
                            {(this.state.add_form === true) &&
                                <div className="d-none d-md-block">
                                    {(this.state.url_parrent) &&
                                         <button className="btn btn-sm pd-x-15 btn-warning btn-uppercase mg-l-5" 
                                            onClick={() => this.props.history.push(this.state.url_parrent)}>
                                            <i className="fa fa-undo"></i> Back To
                                        </button>
                                    }
                                    <button className="btn btn-sm pd-x-15 btn-primary btn-uppercase mg-l-5" onClick={() => this.showTableForm('Form')}>
                                        <i className="fa fa-plus"></i> Add New Data
                                    </button>
                                </div>
                            }

                        </div>
                        <div>
                            <div className="table-responsive">
                                <table className="table mg-b-0">
                                    <thead>
                                        <tr>
                                            {
                                                this.state.columns.map((column, i) => {   
                                                    return <th key={i}>{column.header}</th>
                                                })
                                            }
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.data_table.map((data, j) => {   
                                                return  <tr key={j}>
                                                            {
                                                                this.state.columns.map((column, i) => {   
                                                                    return <td key={i}>
                                                                                {(!column.Cell) && (column.id !== 'option_column') && (column.id !== 'number_counter') && (column.child_accessor) &&
                                                                                    data[column.accessor][column.child_accessor]
                                                                                }
                                                                                {(!column.Cell) && (column.id !== 'option_column') && (column.id !== 'number_counter') && (!column.child_accessor) &&
                                                                                    data[column.accessor]
                                                                                }
                                                                                {(!column.Cell) && (column.id === 'option_column') &&
                                                                                     <div className="d-none d-md-block">
                                                                                        <button className="btn btn-xs pd-x-15 btn-outline-dark btn-uppercase mg-l-5" onClick={() => this.getDataPer(data.id)}><i className="fa fa-pencil-alt"></i></button>
                                                                                        <button className="btn btn-xs pd-x-15 btn-outline-dark btn-uppercase mg-l-5" onClick={() => this.setState({modal_delete:true, id_delete_edit: data.id})}><i className="fa fa-trash"></i></button>
                                                                                    </div>
                                                                                }
                                                                                {(!column.Cell) && (column.id === 'number_counter') &&
                                                                                    j+(this.state.data_meta.from) +`.`      
                                                                                }
                                                                                {(column.Cell) &&
                                                                                    column.Cell(data[column.accessor])
                                                                                }
                                                                                
                                                                            </td>
                                                                })
                                                            }
                                                        </tr>
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="d-sm-flex align-items-center justify-content-between mg-t-20-f">
                            <div>
                                <p>Showing {this.state.data_meta.from} to {this.state.data_meta.to}  of {this.state.data_meta.total} entries
                                </p>
                            </div>
                            <div className="d-none d-md-block">
                                <button className="btn btn-sm pd-x-15 btn-primary btn-uppercase mg-l-5" 
                                        disabled={(this.state.data_meta.current_page === 1) ? true : false} 
                                        onClick={() => this.getDataPaging("prev")}><i className="fa fa-chevron-left"></i> Prev
                                </button>
                                <button className="btn btn-sm pd-x-15 btn-primary btn-uppercase mg-l-5" 
                                        disabled={this.state.data_meta.current_page === this.state.data_meta.last_page ? true : false}
                                        onClick={() => this.getDataPaging("next")}>Next <i className="fa fa-chevron-right"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            }
            
            {this.state.show_view.form === true &&
                <div className="content content-fixed">
                    <div className="container pd-x-0 pd-lg-x-10 pd-xl-x-0">
                        <div className="d-sm-flex align-items-center justify-content-between mg-b-20 mg-lg-b-25 mg-xl-b-30">
                            <div>
                                {/* <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb breadcrumb-style1 mg-b-10">
                                        <li className="breadcrumb-item"><a href="#">Master</a></li>
                                        <li className="breadcrumb-item active" aria-current="page">Data User</li>
                                    </ol>
                                </nav> */}
                                <h4 className="mg-b-0 tx-spacing--1">{this.props.title_add}</h4>
                            </div>
                            <button className="btn btn-sm pd-x-15 btn-primary btn-uppercase mg-l-5" onClick={() => this.showTable()}>
                                <i className="fa fa-undo"></i> Back To List
                            </button>
                        </div>
                        <div> 
                            {(this.state.add_form === true) &&
                                <form id="master-viewer-form">
                                    <div className="row row-xs">
                                        {this.state.fields.map((field, i) => {    
                                            return <div className="col-sm-6 col-md-12" key={i}>
                                                        <h5>{field.label}</h5>
                                                        <hr className="my-2" />  
                                                        {field.child.map((child, j) => {  
                                                            return  <div key={"div"+j}>
                                                                    {child.hidden === 'no' &&
                                                                        <div className="form-group row" key={j}>
                                                                            <div className="col-md-3">
                                                                                {child.hidden === 'no' &&
                                                                                    <label>{child.label}</label>
                                                                                }        
                                                                            </div>
                                                                            <div className="col-sm-12 col-md-6">
                                                                                {child.type === 'text' && child.content_text === 'text' && child.hidden === 'no' && 
                                                                                    <input type="text" className="form-control" 
                                                                                        id={child.id} name={child.id} 
                                                                                        defaultValue={(this.state.data_per !== null) ? this.state.data_per[child.id] : null}
                                                                                        onChange={(child.on_change) ? this.onChangeEvent : null}
                                                                                        readOnly={(child.disabled) ? 'readOnly' : null}
                                                                                    />

                                                                                }
                                                                                {child.type === 'text_props' && child.content_text === 'text' && child.hidden === 'no' && 
                                                                                    <input className="form-control" type="text" id={child.id} name={child.id} 
                                                                                        value={this.props[child.id]}
                                                                                        onChange={(child.on_change) ? this.onChangeEvent : null}
                                                                                        readOnly={(child.disabled) ? 'readOnly' : null}
                                                                                    /> 
                                                                                }
                                                                                {child.type === 'group_text_modal' && child.content_text === 'text' && child.hidden === 'no' && 
                                                                                    <div className="input-group">
                                                                                        <input type="email" id={child.id} name={child.id}  readOnly={(child.disabled) ? 'readOnly' : null} 
                                                                                            value={this.props[child.id]} />
                                                                                        <div className="input-group-append">
                                                                                            <button className="btn btn-outline-light" type="button" onClick={()=> dataStore.setters[child.modal_function](true)}>
                                                                                                <i className="fa fa-bars"></i>
                                                                                            </button>
                                                                                        </div>
                                                                                    </div>
                                                                                }
                                                                                {child.type === 'date' && child.content_text === 'text' && child.hidden === 'no' &&
                                                                                    <input className="form-control" type="date" id={child.id} name={child.id} 
                                                                                        defaultValue={(this.state.data_per !== null) ? this.state.data_per[child.id] : moment().format("dd-mm-YY")}
                                                                                        onChange={(child.on_change) ? this.onChangeEvent : null}
                                                                                        readOnly={(child.disabled) ? 'readOnly' : null}
                                                                                    />
                                                                                }
                                                                                {child.type === 'text' && child.content_text === 'phone' && child.hidden === 'no' &&
                                                                                    <input className="form-control"  type='text' id={child.id} name={child.id} 
                                                                                        onChange={this.onChangePhone  } 
                                                                                        value={this.state.phone}
                                                                                        readOnly={(child.disabled) ? 'readOnly' : null}
                                                                                    />
                                                                                }
                                                                                {child.type === 'text' && child.content_text === 'number' && child.hidden === 'no' &&
                                                                                    <input className="form-control"  type='text' id={child.id} name={child.id} 
                                                                                        onChange={this.onChangeNumber(child.id) } 
                                                                                        value={(this.state.numbers[child.id])}
                                                                                        readOnly={(child.disabled) ? 'readOnly' : null}
                                                                                    />
                                                                                }
                                                                                {child.type === 'password' && child.hidden === 'no'  && child.on_change === true &&
                                                                                    <input className="form-control" type="password" id={child.id} name={child.id} 
                                                                                            value={this.state.on_change}
                                                                                        readOnly={(child.disabled) ? 'readOnly' : null} />
                                                                                }
                                                                                {child.type === 'password' && child.hidden === 'no' && child.on_change === false &&
                                                                                    <input className="form-control" type="password" id={child.id} name={child.id} 
                                                                                        defaultValue={(this.state.data_per !== null) ? this.state.data_per[child.id] : null}
                                                                                        onChange={(child.on_change) ? this.onChangeEvent : null}
                                                                                        readOnly={(child.disabled) ? 'readOnly' : null}
                                                                                    /> 
                                                                                }
                                                                                {child.type === 'combobox_static' &&
                                                                                    <div>
                                                                                    {child.property.map((radio, k) => {  
                                                                                        return <div className="custom-control custom-radio" key={k}>
                                                                                                    <input type="radio" id={child.id+k} name={child.id} value={child.value[k]} className="custom-control-input" 
                                                                                                        defaultChecked={(this.state.data_per !== null &&  this.state.data_per[child.id] == child.value[k]) ? true : false}/>
                                                                                                    <label className="custom-control-label" htmlFor={child.id+k}>{child.property[k]}</label>
                                                                                                </div>
                                                                                    })}
                                                                                    </div>
                                                                                }
                                                                                {child.type === 'select_box' &&
                                                                                    <select className="custom-select" name={child.id} id={child.id}
                                                                                            defaultValue={(this.state.data_per !== null) ? this.state.data_per[child.id] : null}>
                                                                                        {(this.state[child.id]) && 
                                                                                            this.state[child.id].map((data, i) => {  
                                                                                                return <option value={data[child.value_id]}>{data[child.value_name]}</option>
                                                                                            })
                                                                                        }
                                                                                    </select>
                                                                                }
                                                                                {child.type === 'select_box_static' &&
                                                                                    <select className="custom-select" name={child.id} id={child.id} 
                                                                                            defaultValue={(this.state.data_per !== null) ? this.state.data_per[child.id] : null}>
                                                                                        {child.property.map((radio, k) => {  
                                                                                            return <option key={k}
                                                                                                        value={child.value[k]} >{child.property[k]}
                                                                                                   </option>
                                                                                        })}
                                                                                    </select>
                                                                                }
                                                                                <div className="text-danger">{this.state.errors[child.id]}</div>
                                                                            </div>
                                                                        </div>
                                                                    }
                                                                    {child.hidden === 'yes' &&
                                                                        <div>
                                                                        {child.type === 'text_props' && child.content_text === 'text' && 
                                                                                    <input className="form-control" type={child.hidden === 'yes' ? 'hidden' : 'text'} id={child.id} name={child.id} 
                                                                                        value={this.props[child.id]}
                                                                                        onChange={(child.on_change) ? this.onChangeEvent : null}
                                                                                        readOnly={(child.disabled) ? 'readOnly' : null}
                                                                                    /> 
                                                                        }
                                                                        {child.type === 'text_id' &&
                                                                            <input className="form-control" type="hidden" id={child.id} name={child.id}  defaultValue={(this.state.id_pk !== null) ? this.state.id_pk : null}/>
                                                                        }
                                                                        {child.type === 'text' &&
                                                                            <input className="form-control" type="hidden" id={child.id} name={child.id}  defaultValue={(this.state.data_per !== null) ? this.state.data_per[child.id] : null}/>
                                                                        }
                                                                        </div>
                                                                    }
                                                                    </div>

                                                                    
                                                        })}
                                                    </div>  
                                            })      
                                        }
                                    </div>
                                    <button type="button" className="btn btn-sm btn-primary btn-uppercase" onClick={() => this.saveData() }>{(this.state.loading) ? "Sedang Menyimpan..." : "Simpan Data"}</button>
                                </form>
                            }
                        </div>
                    </div>
                </div>
            }
            <SweetAlert
                show={this.state.modal_delete}
                title="Konfirmasi"
                text="Apakah anda ingin menghapus data ini?"
                showCancelButton= {true}
                confirmButtonColor= "#0e5ab3"  
                confirmButtonText= "Ya, proses saja!" 
                cancelButtonText= "Tidak, tolong batalkan!"
                onConfirm={() => { this.deleteData()}}
                onCancel={() => this.setState({ modal_delete: false })}
            />
            <ToastContainer 
                position='bottom-right'
            />
        </div>
        );
    }
}

function mapStateToProps(props) {
    return {
        user: authStore.getters.getUser(),
        reload_table: dataStore.getters.getReloadTable(),        
    }
}

export default withRouter(connect(mapStateToProps)(MasterViewer));
