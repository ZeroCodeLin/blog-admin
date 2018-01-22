import React, { Component } from 'react';
import { connect } from 'dva';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import {
    Form, Input, DatePicker, Select, Button, Card, InputNumber, Radio, Icon, Tooltip,Upload,Modal,
} from 'antd';

import Editor from './Editor.jsx'

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

@connect(state => ({
    userData:state.user.userData,
  }))
class BasicInfo extends Component {
    
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log(values)
          }
        });
      }

    componentDidMount(){
      
        console.log(this.state)
    }

    render() {
        const { submitting, userData,fileList } = this.props;
        const { getFieldDecorator, getFieldValue } = this.props.form;
        
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 7 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 12 },
                md: { span: 10 },
            },
        };

        const submitFormLayout = {
            wrapperCol: {
                xs: { span: 24, offset: 0 },
                sm: { span: 10, offset: 7 },
            },
        };
       
        return (
            <PageHeaderLayout>
                <Card bordered={false}>
                    <Form
                        onSubmit={this.handleSubmit}
                        hideRequiredMark
                        style={{ marginTop: 8 }}
                    >
                        <FormItem
                            {...formItemLayout}
                            label="标题"
                        >
                            {getFieldDecorator('title', {
                                rules: [{
                                    required: true, message: '请输入昵称',
                                }],
                            })(
                                <Input />
                                )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="描述"
                        >
                            {getFieldDecorator('description', {
                                rules: [{
                                    required: true, message: '请输入描述',
                                }],
                            })(
                                <Input />
                                )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="内容"
                        >
                            {getFieldDecorator('content', {                             
                                rules: [{
                                    required: true, message: '请输入内容',
                                }],
                            })(
                                <Editor />
                                )}
                        </FormItem>
                        
                        
                        <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
                            <Button type="primary" htmlType="submit" >
                                保存
                            </Button>
                        </FormItem>
                    </Form>
                </Card>
            </PageHeaderLayout>
        )
    }
}

export default Form.create()(BasicInfo);