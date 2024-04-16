import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({setAuth}) {
    const navigate = useNavigate();
    const [formData,setFormData]  = useState({
        username:"",
        password:""
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
        if(formData.username && formData.password){
            memberLogin();
        }
    }
    async function memberLogin(){
        try{
            const response = await axios.post(
                "http://localhost:8081/member/login",formData);
            //로그인 성공시 받은 토큰을 세션스토리지(브라우저 저장소)에 저장
            //response.data { grantType: "Bdddd", accessToken:"ddfddfdfdfdd",}
            const jwtToken = response.data.grantType+" "+response.data.accessToken;
            sessionStorage.setItem("jwt",jwtToken);
            setAuth(true);
            //메인페이지 이동
            navigate("/");
        }
        catch(e){
            console.log(e);
        }
       
    }
    return ( 
        <div>
            <h2>로그인하기</h2>
            <form onSubmit={onSubmit}>
            <div class="mb-3">
                <label for="email" class="form-label">이메일</label>
                <input type="text" class="form-control" 
                id="email" placeholder="메일주소를 입력하세요" 
                name="username"
                value={formData.username} 
                onChange={onChange}/>
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">패스워드</label>
                <input type="password" class="form-control" 
                id="password" placeholder="패스워드를 입력하세요" 
                name="password"
                value={formData.password} 
                onChange={onChange}/>
            </div>
            <div>
                <button type="submit" className="btn btn-primary">로그인</button>
                <button type="reset" onClick={onReset} className="btn btn-primary">취소</button>
            </div>               
            </form>
        </div>
    );
}

export default Login;