import React from 'react';
import './CarDetail.css';
import { useParams} from 'react-router-dom';
import axios from 'axios';
import useAsync from '../customHook/useAsync';
//전달할 함수 http://localhost:8081/car/12
async function getCar(id){
    const response = await axios.get("http://localhost:8081/car/"+id);
    return response.data;
}

function CarDetail() {
    const { carId } = useParams() 
    const { loading, data, error }  = useAsync(getCar,carId);
    if(loading) return <div>로딩중....</div>;
    if(error) return <div>에러가 발생했습니다.</div>;
    if(!data) return null;
    console.log(carId);
    return ( 
        <div>
            {/* 이미지 차량정보 */}
            <div className='detail'>
                <div className='detailView'>
                    <div className='viewImg'>이미지</div>
                    <h4>사진</h4>
                    <ul>
                        <li>작은이미지</li>
                    </ul>
                </div>
                <div className='detailInfo'>
                    <div className='carInfo'>
                        <div className='carTitle'>{data.model}</div>
                        <div>
                            <ul>
                                <li><b>2004</b>년식</li>
                                <li><b>43,472</b>km</li>
                                <li><b>디젤</b></li>
                            </ul>
                        </div>
                        <div className='price'><span>2,330</span>만원</div>
                    </div>
                    <div className='dealer'>
                        <div className='profile'>
                            <div><img /></div>
                            <div>
                                <span>이름</span>
                                <div>
                                    판매중 <span>25</span>
                                    판매중 <span>30</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <table>
                                <tr>
                                    <td>휴대폰</td>
                                    <td>{data.dealer.phone}<br/>053-123-4567</td>
                                </tr>
                                <tr>
                                    <td>종사원증</td>
                                    <td>19-053-00397</td>
                                </tr>
                                <tr>
                                    <td>소속</td>
                                    <td>올카모터스(053-123-0000)</td>
                                </tr>
                                <tr>
                                    <td>주소</td>
                                    <td>대구 동구 안심로 59길 22</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {/* 설명부분 */}
            <h3>차량설명</h3>
            <div className='detaildesc'>
                설명설명
            </div>
        </div>
     );
}

export default CarDetail;