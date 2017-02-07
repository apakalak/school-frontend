import React from 'react';
import {shallow, mount, render} from 'enzyme';
import {expect} from 'chai';
import chai from 'chai'
import sinon from 'sinon';
import nock from 'nock';
import axios from 'axios';
import httpAdapter from 'axios/lib/adapters/http'

import CreateKlass from './CreateKlass';
axios.defaults.adapter = httpAdapter;
//axios.defaults.host = "http://fakehost.com";

describe('CreateKlass' , () => {
    beforeEach(() => {
        nock.disableNetConnect()
    })

    afterEach(() => {
        nock.cleanAll()
        nock.enableNetConnect()
    })

     it('should render without error', () => {
        const wrapper = shallow(<CreateKlass />);
        expect(wrapper).to.be.ok;
        })

    it('should find component using its classname', () => {
        const wrapper = shallow(<CreateKlass />);
        expect(wrapper.find(".create-klass").length).to.equal(1);
        })

     it('should call preventDefault when the buton is clicked', () => {
        const stub = sinon.stub();
        const wrapper = shallow(<CreateKlass />);
        wrapper.find('button').simulate('click', {preventDefault: stub});
        expect(stub.callCount).to.equal(1);
    })

     it('should show error message when data entered is null', () => {
        const wrapper = mount(<CreateKlass />);
        wrapper.find('button').simulate('click');
        expect(wrapper.state('error')).to.equal("Please enter valid data!!");
     })

     it('should show error message when fee entered is negetive', () => {
        const wrapper = mount(<CreateKlass />);
        wrapper.find('[name="name"]').get(0).value = "asdas"
        wrapper.find('[name="semester"]').get(0).value = "2018-01-23";
        wrapper.find('[name="credits"]').get(0).value = "2";
        wrapper.find('[name="fee"]').get(0).value = -200;
        wrapper.find('button').simulate('click');
        expect(wrapper.state('error')).to.equal("Please enter positive fee value!!");
     })

      it('should show error message if semester date is past', () => {
        const wrapper = mount(<CreateKlass />);
        wrapper.find('[name="name"]').get(0).value = "asdas"
        wrapper.find('[name="semester"]').get(0).value = "2017-01-23";
        wrapper.find('[name="credits"]').get(0).value = "2";
        wrapper.find('[name="fee"]').get(0).value = 200;
        wrapper.find('button').simulate('click');
        expect(wrapper.state('error')).to.equal("Please enter valid semester date!!");
     })

     it('should create a class when valid details is given', (done) => {
         const jsonObj = {
                "name":"physics",
                "semester" : "2018-01-23",
                "fee" : 2000,
                "credits": "3",
                "department" : "SCIENCE"
            }

             const returnJsonObj = {
                "id":1,
                "name":"physics",
                "semester" : "2018-01-23",
                "fee" : 2000,
                "credits": 3,
                "department" : "SCIENCE"
            }
        //Mock server for the post request
        nock("http://fakehost.com").post("/klasses", jsonObj).reply(200, returnJsonObj)
        //Mock the method to update the react components
        const stubForCreated = sinon.stub()
        const wrapper = mount(<CreateKlass host="http://fakehost.com" created={stubForCreated} />);
        //actions
        wrapper.find('[name="name"]').get(0).value = "physics"
        wrapper.find('[name="semester"]').get(0).value = "2018-01-23";
        wrapper.find('[name="credits"]').get(0).value = "3";
        wrapper.find('[name="fee"]').get(0).value = 2000;
        wrapper.find('[name="department"]').get(0).value = "SCIENCE";
        wrapper.find('button').simulate('click');
        //assertions
        setTimeout(()=>{
            try{
                expect(stubForCreated.callCount).to.equal(1); 
                expect(wrapper.find('[name="name"]').get(0).value).to.equal("");
                expect(wrapper.find('[name="semester"]').get(0).value).to.equal("");
                expect(wrapper.find('[name="credits"]').get(0).value).to.equal("1");
                expect(wrapper.find('[name="fee"]').get(0).value).to.equal("");
                expect(wrapper.find('[name="department"]').get(0).value).to.equal("SCIENCE");
                expect(stubForCreated.getCall(0).args[0]).to.deep.equal(returnJsonObj)
                done();
            }catch(e){
                done.fail(e);
            }
        },1000)
     })
})