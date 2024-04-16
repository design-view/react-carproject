import axios from 'axios';
import React from 'react';
import useAsync from '../customHook/useAsync';
import { Link } from 'react-router-dom';

//전달할 함수
async function getCars(id){
    const response = await axios.get("http://localhost:8081/cars/"+id);
    return response.data;
}
function CarList({id}) {
    //{loadgin:false, data: null, error: null}
    const [state] = useAsync(getCars,id);
    const { loading, data, error} = state;
    if(loading) return <div>로딩중...</div>;
    if(error) return <div>에러가 발생했습니다.</div>;
    if(!data) return null;
    return ( 
        <div>
            {data.map((car,index)=>
                <div key={index} className="card" style={{width: "18rem"}}>
                    <img src={"http://localhost:8081/image?image="+car.imgName} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{car.title}</h5>
                        <p className="card-text"></p>
                        <Link to={"/carDetail/"+car.id}>{car.price}만원</Link>
                    </div>
                </div>
            )}     
        </div>
     );
}

export default CarList;