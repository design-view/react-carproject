import axios from 'axios';
import React from 'react';
import useAsync from '../customHook/useAsync';
import { Link } from 'react-router-dom';

//전달할 함수
async function getCars(){
    const response = await axios.get("http://localhost:8081/cars");
    return response.data;
}
function CarList() {
    //{loadgin:false, data: null, error: null}
    const state = useAsync(getCars);
    const { loading, data, error} = state;
    if(loading) return <div>로딩중...</div>;
    if(error) return <div>에러가 발생했습니다.</div>;
    if(!data) return null;
    return ( 
        <div>
            <table className='table'>
                <thead>
                    <tr>
                        <th>이미지</th>
                        <th>브랜드</th>
                        <th>모델</th>
                        <th>색상</th>
                        <th>가격</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((car,index)=>
                        <tr key={index}>
                            <td><img src={"http://localhost:8081/image?image="+car.imgName} width="200" /></td>
                            <td>{car.brand}</td>
                            <td><Link to={"/carDetail/"+car.id}>{car.model}</Link></td>
                            <td>{car.color}</td>
                            <td>{car.price}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
     );
}

export default CarList;