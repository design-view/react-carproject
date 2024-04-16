import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Join() {
    const navigate = useNavigate();
    const [formData,setFormData]  = useState({
        name:"",
        email:"",
        password:"",
        address:""
    })
    //input에 변경이일어났을때 상태 업데이트 
    const onChange = (e) => {
        const { name,value} = e.target;
        setFormData({
            ...formData,
            [name]:value
        })
    } 
    //초기화
    const onReset = () => {
        setFormData({
            username:"",
            password:""
        })
    }
    //로그인버튼 클릭시
    const onSubmit = (e) => {
        //전송요청이벤트 제거 
        e.preventDefault();
        //입력이 다 되었는지 체크후 함수호출
        if(formData.name && formData.password 
            && formData.email && formData.address){
            memberJoin();
        }
    }
    async function memberJoin(){
        try{
            const response = await axios.post(
                "http://localhost:8081/member/join",formData);
            //ok, fail
            if(response.data=="ok"){
                navigate("/login")
            }
        }
        catch(e){
            console.log(e);
        }
       
    }
    return ( 
        <div>
             <h2>회원가입하기</h2>
             <form onSubmit={onSubmit}>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">이름</label>
                    <input type="text" 
                                name="name"
                                value={formData.name} 
                                onChange={onChange} className="form-control"/>
                </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">이메일</label>
                    <input type="text" 
                        name="email"
                        value={formData.email} 
                        onChange={onChange} 
                        className="form-control"/>
                </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">패스워드</label>
                    <input type="password" 
                            name="password"
                            value={formData.password} 
                            onChange={onChange} 
                        className="form-control"/>
                </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">주소</label>
                    <input type="text" 
                            name="address"
                            value={formData.address} 
                            onChange={onChange} 
                        className="form-control"/>
                </div>
                <div>
                    <button type="submit" className="btn btn-primary">회원가입</button>
                    <button type="reset" className="btn btn-primary" onClick={onReset}>취소</button>
                </div>              
            </form>
        </div>
     );
}

export default Join;