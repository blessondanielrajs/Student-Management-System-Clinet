//import part
import React, { Component } from "react";
import { Typography, Row, Col, Select, Button, message, Input } from "antd";
import axios from "axios";
import config from './config';
import moment from 'moment';
import momenttimezone from 'moment-timezone';
momenttimezone.tz.setDefault("Asia/Kolkata");
const dateFormatList = 'DD/MM/YYYY HH:mm:ss';
const { TextArea } = Input;

//class holds Data
class App extends Component {
    state = {
        status: 0,
        first_name: "",
        last_name: "",
        email: "",
        dob: "",
        education: "",
        location: "",
        details: ""
    }
    //Functions
    onChangeInputBox1 = (e) => {
        this.setState({ first_name: e.target.value });
    };

    onChangeInputBox2 = (e) => {
        this.setState({ last_name: e.target.value });
    };

    onChangeInputBox3 = (e) => {
        this.setState({ email: e.target.value });
    };

    onChangeInputBox4 = (e) => {
        this.setState({ education: e.target.value });
    };

    onChangeInputBox5 = (e) => {
        this.setState({ location: e.target.value });
    };

    onChangeInputBox6 = (e) => {
        this.setState({ details: e.target.value });
    };

    Update = () => {
        let flag = 0;
        if (this.state.first_name === "") {
            message.error("Invaild First Name");
            flag = 1;
            return false;
        }
        else if (this.state.last_name === "") {
            message.error("Invaild Last Name");
            flag = 1;
            return false;
        }
        else if (this.state.email === "") {
            message.error("Invaild Email");
            flag = 1;
            return false;
        }
        else if (this.state.education === "") {
            message.error("Invaild Education");
            flag = 1;
            return false;
        }
        else if (this.state.location === "") {
            message.error("Invaild Location");
            flag = 1;
            return false;
        }
        else if (this.state.details === "") {
            message.error("Invaild Details");
            flag = 1;
            return false;
        }
        else if (flag === 0) {
            let data = {
                _id:this.props.data._id,
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                email: this.state.email,
                dob: this.props.data.dob,
                education: this.state.education,
                location: this.state.location,
                details: this.state.details,
                department: this.state.Department,
            }
            //server connect
            axios.post(config.serverurl + "/student_db/update", data)
                .then(res => {
                    if (res.data.status === 1) {
                        message.success("Successfully updated");
                    }
                    else {
                        message.error("!Operation Failed");
                    }
                })
        }
        window.location.reload()
    }
//User Interface
    render() {
        return (
            <div >
                <Row gutter={[16, 24]}>
                    <Col span={6}>
                        <Input placeholder="Enter Your First Name" style={{ width: "100%" }} onChange={this.onChangeInputBox1} defaultValue={this.props.data.first_name} />
                    </Col>
                    <Col span={6}>
                        <Input placeholder="Enter Your Last Name" style={{ width: "100%" }} onChange={this.onChangeInputBox2} defaultValue={this.props.data.last_name} />
                    </Col>
                    <Col span={6}>
                        <Input placeholder="Enter Your Email" style={{ width: "100%" }} onChange={this.onChangeInputBox3} defaultValue={this.props.data.email} />
                    </Col>

                    <Col span={6}>
                        <Input placeholder="Enter Your Education" style={{ width: "100%" }} onChange={this.onChangeInputBox4} defaultValue={this.props.data.education} />
                    </Col>
                    <Col span={6}>
                        <Input placeholder="Enter Your Location" style={{ width: "100%" }} onChange={this.onChangeInputBox5} defaultValue={this.props.data.location} />
                    </Col>
                    <Col span={6}>
                        <TextArea placeholder="Enter Your Details" showCount maxLength={100} style={{ height: 120 }} onChange={this.onChangeInputBox6} defaultValue={this.props.data.details}/>
                    </Col>

                    <Col span={6}>
                        <Button block type="primary" onClick={this.Update} >Update</Button>
                    </Col>
                </Row>
            </div>
        );
    }
}
export default App;
