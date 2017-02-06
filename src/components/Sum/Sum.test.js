import React from 'react';
import {shallow, mount, render} from 'enzyme';
import {expect} from 'chai';
import chai from 'chai'
import sinon from 'sinon';

import Sum from './Sum';

describe('Sum' , () => {
    it('should render without error', () => {
        const wrapper = shallow(<Sum />);
        expect(wrapper).to.be.ok;
    })

    xit('should get text from component', () => {
        const wrapper = shallow(<Sum />);
        expect(wrapper.text()).to.equal('Sum');
    })

    it('should find component using its class name', () => {
        const wrapper = shallow(<Sum />);
        expect(wrapper.find(".sum").length).to.equal(1);
    })

    xit('should get html from component', () => {
        const wrapper = shallow(<Sum />);
        expect(wrapper.html()).to.equal('<div class="sum"><h1>Sum</h1></div>');
    })

     it('should call add function when + button is clicked', () => {
        const wrapper = shallow(<Sum />);
        const instance = wrapper.instance(); // create instance to be stubbed
        
        const add = sinon.stub(instance,'add') // stub the method being tested
        
        // update the instance and wrapper to take mocked instance. Bug in sinon
        instance.forceUpdate();

        wrapper.find("#add").simulate('click')
        expect(add.callCount).to.equal(1)
    })

     it('should sum up 2 numbers and display result', () => {
        const wrapper = mount(<Sum />);

        wrapper.find('.a').get(0).value=3;
        wrapper.find('.b').get(0).value=5;
        
        wrapper.find("#add").simulate('click')
        
        expect(wrapper.find('span').text()).to.equal("8")
    })
});