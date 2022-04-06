//import part
import React, { Component } from "react";
import {  Row, Col, Button, message, Input, DatePicker } from "antd";
import axios from "axios";
import config from './config';
import moment from 'moment';
import momenttimezone from 'moment-timezone';
momenttimezone.tz.setDefault("Asia/Kolkata");
const { TextArea } = Input;

//Class can holds data
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
    onChange = (dateString) => {
        var i = (moment(dateString).unix());
        //console.log(i);
        this.setState({ dob: i })
        // console.log(i)
        // console.log(moment.unix(i).format(dateFormatList))
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

    Submit = () => {
        let flag = 0;
        if (this.state.first_name === "") {
            message.error("Invaild First Name");
            flag = 1;
            return false;
        }
        else if (this.state.last_name === "") {
            message.error("Invaild Last Department");
            flag = 1;
            return false;
        }
        else if (this.state.email === "") {
            message.error("Invaild Email");
            flag = 1;
            return false;
        }
        else if (this.state.dob === "") {
            message.error("Invaild DoB");
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
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                email: this.state.email,
                dob: this.state.dob,
                education: this.state.education,
                location: this.state.location,
                details: this.state.details,
                department: this.state.Department,
            }
            //server connect api
            axios.post(config.serverurl + "/student_db/add", data)
                .then(res => {
                    if (res.data.status === 1) {

                        message.success("Successfully Created");

                    }
                    else {
                        message.error("!Operation Failed");
                    }

                })
        }
        window.location.reload();
    }
    //User Interface
    render() {
        return (
            <div >
                <Row gutter={[16, 24]}>
                    <Col span={6}>
                        <Input placeholder="Enter Your First Name" style={{ width: "100%" }} onChange={this.onChangeInputBox1} />
                    </Col>
                    <Col span={6}>
                        <Input placeholder="Enter Your Last Name" style={{ width: "100%" }} onChange={this.onChangeInputBox2} />
                    </Col>
                    <Col span={6}>
                        <Input placeholder="Enter Your Email" style={{ width: "100%" }} onChange={this.onChangeInputBox3} />
                    </Col>
                    <Col span={6}>
                        <DatePicker onChange={this.onChange} />
                    </Col>
                    <Col span={6}>
                        <Input placeholder="Enter Your Education" style={{ width: "100%" }} onChange={this.onChangeInputBox4} />
                    </Col>
                    <Col span={6}>
                        <Input placeholder="Enter Your Location" style={{ width: "100%" }} onChange={this.onChangeInputBox5} />
                    </Col>
                    <Col span={6}>
                        <TextArea placeholder="Enter Your Details" showCount maxLength={100} style={{ height: 120 }} onChange={this.onChangeInputBox6} />
                    </Col>
                    <Col span={6}>
                        <Button block type="primary" onClick={this.Submit} >Submit</Button>
                    </Col>
                </Row>
            </div>
        );
    }
}
export default App;
