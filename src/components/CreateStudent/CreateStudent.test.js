import React from 'react';
import {shallow, mount, render} from 'enzyme';
import {expect} from 'chai';
import chai from 'chai'
import sinon from 'sinon';
import nock from 'nock';
import axios from 'axios';
import httpAdapter from 'axios/lib/adapters/http'

import CreateStudent from './CreateStudent';
axios.defaults.adapter = httpAdapter;
//axios.defaults.host = "http://fakehost.com";

describe('CreateStudent' , () => {
    beforeEach(() => {
        nock.disableNetConnect()
    })

    afterEach(() => {
        nock.cleanAll()
        nock.enableNetConnect()
    })

     it('should render without error', () => {
        const wrapper = shallow(<CreateStudent />);
        expect(wrapper).to.be.ok;
        })

    it('should find component using its classname', () => {
        const wrapper = shallow(<CreateStudent />);
        expect(wrapper.find(".create-student").length).to.equal(1);
        })

     it('should call preventDefault when the buton is clicked', () => {
        const stub = sinon.stub();
        const wrapper = shallow(<CreateStudent />);
        wrapper.find('button').simulate('click', {preventDefault: stub});
        expect(stub.callCount).to.equal(1);
    })

    it('should not show error message when email is good', () => {
        const wrapper = mount(<CreateStudent />);
        wrapper.find('input').get(0).value = 'anu@gmail.com';
        wrapper.find('button').simulate('click');
        expect(wrapper.state('error')).to.be.undefined;
     })

     it('should show error message when email is too short', () => {
        const wrapper = mount(<CreateStudent />);
        wrapper.find('input').get(0).value = 'bo';
        wrapper.find('button').simulate('click');
        expect(wrapper.state('error')).to.equal("Email length should be greater than 3!");
     })

     it('should create a student when valid email is given', (done) => {
        //Mock server for the post request
        nock("http://fakehost.com").post("/students",{email : 'anu@gmail.com'}).reply(200, {id:1, email:'anu@gmail.com'})
        //Mock the method to update the react components
        const stubForCreated = sinon.stub()
        const wrapper = mount(<CreateStudent host="http://fakehost.com" created={stubForCreated} />);
        //actions
        wrapper.find('input').get(0).value = 'anu@gmail.com';
        wrapper.find('button').simulate('click');
        //assertions
        setTimeout(()=>{
            try{
                expect(stubForCreated.callCount).to.equal(1);
                expect(wrapper.find('input').get(0).value).to.equal('')
                expect(stubForCreated.getCall(0).args[0]).to.deep.equal({id:1, email:'anu@gmail.com'})
                done();
            }catch(e){
                done.fail(e);
            }
        },1000)
     })
})