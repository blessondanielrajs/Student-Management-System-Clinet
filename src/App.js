//import part 
import React, { Component } from "react";
import {
   Col, Row, Input, Button, PageHeader, Modal, Layout, Menu, Table, Space, Popconfirm
} from "antd";
import { HomeOutlined, EditOutlined } from '@ant-design/icons';
import "./App.less";
import Update from "./update";
import Add from "./add";
import axios from "axios";
import config from './config';
import moment from "moment";
import momenttimezone from "moment-timezone";
momenttimezone.tz.setDefault("Asia/Kolkata");
const dateFormatList = "DD/MM/YYYY";
const {  Sider, Content } = Layout;
//Class can holds data

class App extends Component {
  state = {
    status: 0,
    isModalVisible: false,
    setIsModalVisible: "",
    setIsModalVisible1: "",
    search_name: "",
    data: "",
    record: ""

  };
      //Functions

  componentDidMount() {            //server connect api

    axios.post(config.serverurl + "/student_db/student_data")
      .then(res => {
        this.setState({ data: res.data.data });
      })
  }

  onChangeInputBox1 = (e) => {
    this.setState({ Search_name: e.target.value });
    let data = {
      name: e.target.value
    }
    axios.post(config.serverurl + "/student_db/search_name", data)
      .then(res => {

        this.setState({ data: res.data.data });
      })
    

  };

  delete = (record) => {
    console.log(record._id);
    let data = {
      "_id": record
    }
    axios.post(config.serverurl + "/student_db/delete", data)
      .then(res => {
        if (res.data.status === 1) {
          this.setState({ data: res.data.data });
        }
      })
    window.location.reload();
  }

  AddModel = () => {
    this.setState({ setIsModalVisible: true }); 
  }

  showModal = (record) => {
    this.setState({ setIsModalVisible1: true, record: record });
  }
  handleOk = () => {
    this.setState({ setIsModalVisible: false });
  };

  handleCancel = () => {
    this.setState({ setIsModalVisible: false });
  };

  handleOk1 = () => {
    this.setState({ setIsModalVisible1: false });
  };

  handleCancel1 = () => {
    this.setState({ setIsModalVisible1: false });
  };
    //User Interface

  render() {
    const columns = [
      {
        title: 'ID',
        dataIndex: '_id',
        key: 'key',

      },
      {
        title: 'First Name',
        dataIndex: 'first_name',
        key: 'key',

      },
      {
        title: 'Last Name',
        dataIndex: 'last_name',
        key: 'key',

      },
      {
        title: 'Location',
        dataIndex: 'location',
        key: 'key',

      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'key',

      },
      {
        title: 'DOB',
        render: (text, record) => (
          <div>{moment.unix(record.dob).format(dateFormatList)}</div>
        ),

      },
      {
        title: 'Education',
        dataIndex: 'education',
        key: 'key',
      },
      {
        title: 'Action',
        render: (text, record) => (
          <Space>
            <Button type="link" block icon={<EditOutlined />} onClick={this.showModal.bind(this, record)}>
              Edit
            </Button>

          </Space>

        ),
      },
      {
        title: 'Delete',
        render: (text, record) => (
          <Space>
            <Popconfirm
              title="Are you sure to delete this task?"
              onConfirm={this.delete.bind(this, record) }
              onCancel={this.cancel}
              okText="Yes"
              cancelText="No"
            >
              <Button type="link" block icon={<EditOutlined />} >Delete</Button>
           
             
            </Popconfirm>


          </Space>

        ),
      },

    ];
    return (
      <div>
        <PageHeader
          className="site-page-header"
          title="Student Mangement System"

        />
        <Layout>
          <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
              <Menu.Item key="1" icon={<HomeOutlined />} onClick={this.Home}>
                Home
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout className="site-layout">
            <Content
              className="site-layout-background"
              style={{
                margin: "16px 16px",
                padding: 24,
              }}
            >
              <div className='fix'>
                <Row gutter={[16, 24]}>
                  <Col span={6}>
                    <Input placeholder="Search" style={{ width: "100%" }} onChange={this.onChangeInputBox1} />
                  </Col>
                  <Col span={6} offset={12}>
                    <Button type="primary" shape="round" size={'large'} style={{ width: "100%" }} onClick={this.AddModel}>
                      Add
                    </Button>
                  </Col>
                  <Col span={24}>
                    <Table dataSource={this.state.data} columns={columns} scroll={{ x: 1300 }} />
                  </Col>
                </Row>
              </div>
            </Content>
          </Layout>
        </Layout>
        <Modal title="Add Student Details" width={"100%"} visible={this.state.setIsModalVisible} onOk={this.handleOk} onCancel={this.handleCancel}>
          <div> <Add /></div>
        </Modal>
        <Modal title="Edit Student Details" width={"100%"} visible={this.state.setIsModalVisible1} onOk={this.handleOk1} onCancel={this.handleCancel1}
        >
          <div> <Update data={this.state.record} /></div>
        </Modal>
      </div>
    );
  }
}
export default App;

