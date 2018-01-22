import React,{Component} from 'react'
import {connect} from 'dva'
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { Table } from 'antd'

@connect(state => ({
    list:state.blog.blogList,
    pagination:state.blog.pagination,
    num:state.blog.num,
    loading:state.blog.loading
  }))
class Article extends Component{
    
    handleTableChange = (pagination, filters, sorter) => {
        const pager = { ...this.props.pagination };
        pager.current = pagination.current;
       
        const params = {
            num: pagination.pageSize,
            page: pagination.current,
            pagination:pager
        }
        this.props.dispatch({
            type: 'blog/fetchList',
            payload: params,
          });
      }
    componentDidMount(){
        const params = {
            page: this.props.pagination.page,
            num:this.props.pagination.pageSize,
        }
        this.props.dispatch({
            type: 'blog/fetchList',
            payload:params
          });

        console.log(this.props)
    }

    render(){
        const columns = [{
            title: '标题',
            dataIndex: 'title',
            key: 'title',
            render: text => <a href="#">{text}</a>,
          }, {
            title: '描述',
            dataIndex: 'description',
            key: 'description',
          }, {
            title: '创建时间',
            dataIndex: 'gmt_created',
            key: 'gmt_created',
          },
        ]
        return (
            <PageHeaderLayout>
                <div>
                    <Table 
                        columns={columns}
                        loading={this.props.loading} 
                        dataSource={this.props.list} 
                        pagination={this.props.pagination}
                        onChange={this.handleTableChange} />
                </div>
            </PageHeaderLayout>
        )
    }
}

export default Article;