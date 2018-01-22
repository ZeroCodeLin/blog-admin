import React, { Component } from 'react';
import { connect } from 'dva';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import {
    Form, Input, DatePicker, Select, Button, Card, InputNumber, Radio, Icon, Tooltip,Upload,Modal,
} from 'antd';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

@connect(state => ({
    userData:state.user.userData,
  }))
class BasicInfo extends Component {
    state = {
        previewVisible: false,
        previewImage: '',
        fileList: [{
            uid: -1,
            name: 'xxx.png',
            status: 'done',
            url: ``,
          }]
    };

    handleCancel = () => this.setState({ previewVisible: false })

    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }
    handleChange = ({ fileList }) => this.setState({ fileList })

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            this.props.dispatch({
                type: 'user/fetch',
                payload: values,
              });
          }
        });
      }

    componentDidMount(){
        this.props.dispatch({
            type: 'user/fetchUserInfo',
          });
          console.log(this.props)
        this.setState({
            fileList: [{
                uid: -1,
                name: 'xxx.png',
                status: 'done',
                url: this.props.userData.avater_img_path?`api/${this.props.userData.avater_img_path}`:'',
            }]
        })
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
        const uploadButton = (
            <div>
            <Icon type="plus" />
            <div className="ant-upload-text">Upload</div>
            </div>
        );
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
                            label="头像"
                        >
                           
                                <div>
                                    <Upload action="/api/users/image" listType="picture-card" fileList={this.state.fileList} onPreview={this.handlePreview} onChange={this.handleChange} >
                                        {this.state.fileList.length >= 1 ? null : uploadButton}
                                    </Upload>
                                    <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel}>
                                        <img alt="example" style={{ width: '100%' }} src={this.state.previewImage}  />
                                    </Modal>
                                </div>
                                
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="昵称"
                        >
                            {getFieldDecorator('nickName', {
                                initialValue:userData['nick_name'],
                                rules: [{
                                    required: true, message: '请输入昵称',
                                }],
                            })(
                                <Input />
                                )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="邮箱"
                        >
                            {getFieldDecorator('email', {
                                initialValue:userData['email'],  
                                rules: [{
                                    required: true, message: '请输入邮箱',
                                },{
                                    type: 'email', message: '请输入正确的邮箱',
                                }],
                            })(
                                <Input />
                                )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="GitHub"
                        >
                            {getFieldDecorator('git', {
                                initialValue:userData['github'],                                
                                rules: [{
                                    required: true, message: '请输入GitHub',
                                }],
                            })(
                                <Input />
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