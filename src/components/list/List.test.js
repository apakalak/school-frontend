import React from 'react';
import {shallow, mount, render} from 'enzyme';
import {expect} from 'chai';
import chai from 'chai'
import sinon from 'sinon';

import List from './List';
import Box from '../box/Box';

describe('List' , () => {
    let students;
    beforeEach(() => {
        students = [
            {id:3 , text:"dikshitha"},
            {id:4 , text:"anusha"}
        ]
    })
     it('should render without error', () => {
        const wrapper = shallow(<List />);
        expect(wrapper).to.be.ok;
    })

    it('should find component using its class name', () => {
        const wrapper = shallow(<List />);
        expect(wrapper.find(".list").length).to.equal(1);
    })

    it('should get the header from component', () => {
        const wrapper = shallow(<List header="Students"/>);
        expect(wrapper.find('h1').text()).to.equal('Students');
    })

    it('should render out 2 boxes', () => {
        const wrapper = mount(<List header="Students" items ={students} />);
        expect(wrapper.find(Box).length).to.equal(2);
    })

    it('should render out 2 boxes with given props', () => {
        const wrapper = mount(<List header="Students" items = {students} />);
        //const items = wrapper.find('.items').children()
        const items = wrapper.find(Box)

        const item1 = items.at(0).find('div').props();
        const item2 = items.at(1).find('div').props();

        expect(item1["data-id"]).to.equal(3);
        expect(item2["data-id"]).to.equal(4);
        expect(item1["children"]).to.equal("dikshitha");
        expect(item2["children"]).to.equal("anusha");
    })

     it('should call fn when 2nd box is clicked', () => {
         const stub = sinon.stub();
         const wrapper = mount(<List click={stub} header="Students" items = {students} />);
         wrapper.find(Box).at(1).find('div').simulate('click');
         expect(stub.callCount).to.equal(1);
    })
    
});