import React from 'react'; 
import ReactDOM from 'react-dom'; 

const App = () => {
    console.log('Running app');
    return <div>Hello Meta</div>
};

ReactDOM.render(<App/>, document.querySelector("#app"));