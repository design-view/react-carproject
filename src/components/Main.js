import CarList from "./CarList";
import "./Main.css";

function Main() {
    return (  
        <div>
            <h2>국산차 베스트 매물</h2>
            <CarList id={1}/>
            <h2>수입차 베스트 매물</h2>
            <CarList id={2}/>
        </div>
    );
}

export default Main;