import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

describe("Student Registration ",() => {
   it('#bindStudents', (done) => {
        //Mock server for the post request
        nock("http://fakehost.com").get("/students").reply(200, [{id:1, email:'anu@gmail.com'},{id:2, email:'diski@gmail.com'}])
        
      
     })

    it('#bindClasses', (done) => {
      //Mock server for the post request
      nock("http://fakehost.com").get("/klasses").reply(200, [{id:1, name:'Physics'},{id:2, name:'Biology'}])
    })
})
