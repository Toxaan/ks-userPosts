import React from 'react';
import { Modal, Table } from 'antd';
import 'antd/dist/antd.css';

class Users extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            data:[],
            visible:false,
            col:[
                {
                    title: 'Id Пользователя',
                    dataIndex: 'id',
                    key: 'id'
                },
                {
                    title: 'Имя',
                    dataIndex: 'name',
                    key: 'name'
                },
                {
                    title: 'email',
                    dataIndex: 'email',
                    key: 'email'
                }
            ],
            post:[ 
                {
                    title:"Пожалуйста подождите...",
                    body:"Пожалуйста подождите..."
                }
            ]
        };
    }

    async componentDidMount(){
        try {
            let response = await fetch('https://jsonplaceholder.typicode.com/users');
            let users = await response.json();
            this.setState({
                data: users
            })
        } catch(err) {
            alert(err);
        }    
    }

    async rowClick(id){
        try{
            this.setState({
                visible: true
            })
            let src = 'https://jsonplaceholder.typicode.com/posts?userId='+id;
            let response = await fetch(src);
            let posts = await response.json();
            this.setState({
                post:posts                
            })

        } catch(err){
            alert(err);
        }
    }

    handleOk = e => {
        this.setState({
            visible: false            
        });
        setTimeout(() => this.setState({
            post: [
                {
                    title: "Пожалуйста подождите...",
                    body: "Пожалуйста подождите..."
                }
            ]
        }), 100);
    }

    handleCancel = e => {
        this.setState({
            visible: false
        });
        setTimeout(()=>
        this.setState({
            post:[ 
                {
                    title:"Пожалуйста подождите...",
                    body:"Пожалуйста подождите..."
                }
            ]           
        }),100);
    }

    render() {
        const {
            data,
            col
        } = this.state;
        return(
            <div>
                <Table 
                    onRow={(record) => ({
                        onClick: () => {this.rowClick(record.id)}
                    })}
                    dataSource={data} columns={col} rowKey="name"
                >
                </Table>
                <Modal
                    title="User posts"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    {this.state.post.map((post,index) => {
                        return (
                            <div key={index}>
                                <span className="perenos">
                                    Title: {post.title}
                                    <br/>
                                    Body: {post.body}
                                    <hr/>
                                </span>
                            </div>
                        )
                    })}
                </Modal>
            </div>
        )
    }
}

export default Users;
